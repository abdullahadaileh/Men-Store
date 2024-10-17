<?php

namespace SureCart\Controllers\Rest;

use SureCart\Models\Checkout;
use SureCart\Models\Form;
use SureCart\Models\Product;
use SureCart\Models\User;
use SureCart\WordPress\Users\CustomerLinkService;
use SureCart\WordPress\RecaptchaValidationService;

/**
 * Handle price requests through the REST API
 */
class CheckoutsController extends RestController {
	/**
	 * Class to make the requests.
	 *
	 * @var string
	 */
	protected $class = Checkout::class;

	/**
	 * Middleware before we make the request.
	 *
	 * @param \SureCart\Models\Model $class Model class instance.
	 * @param \WP_REST_Request       $request Request object.
	 *
	 * @return \SureCart\Models\Model|\WP_Error
	 */
	protected function middleware( $class, \WP_REST_Request $request ) {
		// if abandoned checkout is enabled, set the return url.
		$request->set_param( 'abandoned_checkout_return_url', ! empty( $request->get_param( 'abandoned_checkout_enabled' ) ) ? esc_url_raw( get_home_url( null, 'surecart/redirect' ) ) : null );

		return $this->maybeSetUser( $class, $request );
	}

	/**
	 * Edit model.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function edit( \WP_REST_Request $request ) {
		// if we have a password, hash it and set it in a transient.
		// we need to do this because some processors will redirect and we will lose this form data.
		if ( ! empty( $request->get_param( 'password' ) ) ) {
			set_transient( 'sc_checkout_password_hash_' . $request['id'], wp_hash_password( $request->get_param( 'password' ) ), DAY_IN_SECONDS );
		}

		// edit the checkout.
		$response = parent::edit( $request );

		// check if the email exists and set on record.
		if ( apply_filters( 'surecart/checkout/finduser', true ) ) {
			if ( ! empty( $response->email ) ) {
				$response->email_exists = (bool) email_exists( $response->email );
			}
		}

		return $response;
	}

	/**
	 * Let's set the customer's email and name if they are already logged in.
	 *
	 * @param \SureCart\Models\Model $class Model class instance.
	 * @param \WP_REST_Request       $request Request object.
	 *
	 * @return \SureCart\Models\Model|\WP_Error
	 */
	protected function maybeSetUser( \SureCart\Models\Model $class, \WP_REST_Request $request ) {
		// get current user.
		$user = User::current();

		// must be logged in.
		if ( ! $user ) {
			return $class;
		}

		// set the email.
		$class['email'] = $user->user_email;

		// force the customer id, if it exists.
		$customer_id = $user->customerId( ! empty( $request['live_mode'] ) ? 'live' : 'test' );
		if ( ! empty( $customer_id ) ) {
			$class['customer'] = $customer_id;
		}

		// if this is a new session, populate the name and phone from the user data.
		if ( $request->get_method() === 'POST' ) {
			$class['name']       = $user->display_name;
			$class['first_name'] = $user->first_name;
			$class['last_name']  = $user->last_name;
			$class['phone']      = $user->phone;
		}

		return $class;
	}

	/**
	 * Get the form mode
	 *
	 * @param integer $id ID of the form.
	 * @return string Mode of the form.
	 */
	protected function getFormMode( $id ) {
		return Form::getMode( (int) $id );
	}

	/**
	 * Manually pay an order.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \SureCart\Models\Checkout|\WP_Error
	 */
	public function manuallyPay( \WP_REST_Request $request ) {
		$checkout = $this->middleware( new $this->class( $request['id'] ), $request );
		if ( is_wp_error( $checkout ) ) {
			return $checkout;
		}

		if ( ! empty( $this->with ) ) {
			$checkout = $checkout->with( $this->with );
		}

		$paid = $checkout->where( $request->get_query_params() )->with(
			[
				'purchases', // Important: we need to make sure we expand the purchase to provide access.
			]
		)->manuallyPay();

		// purchase created.
		if ( ! empty( $paid->purchases->data ) ) {
			foreach ( $paid->purchases->data as $purchase ) {
				if ( empty( $purchase->revoked ) ) {
					// broadcast the webhook.
					do_action( 'surecart/purchase_created', $purchase );
				}
			}
		}
		return $paid;
	}

	/**
	 * Finalize an order.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \SureCart\Models\Checkout|\WP_Error
	 */
	public function finalize( \WP_REST_Request $request ) {
		$args = $request->get_params();

		// validate form fields and password input.
		$errors = $this->validate( $args, $request );

		// return early if errors.
		if ( $errors->has_errors() ) {
			return $errors;
		}

		// finalize the order.
		$checkout  = new $this->class( [ 'id' => $request['id'] ] );
		$finalized = $checkout->where( $request->get_query_params() )
		->finalize( $request->get_body_params() );

		// bail if error.
		if ( is_wp_error( $finalized ) ) {
			return $finalized;
		}

		// validate the finalized request.
		$finalized = $this->validateFinalizeRequest( $finalized, $request );

		// bail if error.
		if ( is_wp_error( $finalized ) ) {
			return $finalized;
		}

		// return the order.
		return $finalized;
	}

	/**
	 * Confirm an order.
	 *
	 * This force-fetches the order from the API, runs any automations
	 * and creates the user account tied to the customer.
	 *
	 * @param \WP_REST_Request $request  Rest Request.
	 *
	 * @return \SureCart\Models\Checkout|\WP_Error
	 */
	public function confirm( \WP_REST_Request $request ) {
		$checkout = $this->middleware( new $this->class(), $request );
		if ( is_wp_error( $checkout ) ) {
			return $checkout;
		}

		$checkout = $checkout->where(
			array_merge(
				$request->get_query_params(),
				[ 'refresh_status' => true ] // Important: Do not remove. This will force syncing with the processor.
			)
		)->with(
			[
				'purchases', // Important: we need to make sure we expand the purchase to provide access.
				'customer', // Important: we need to use this to create the WP User with the same info.
				'manual_payment_method', // Important: we need to use this to display manual payment instructions.
			]
		)->find( $request['id'] );

		// bail if error.
		if ( is_wp_error( $checkout ) ) {
			return $checkout;
		}

		// Create a user account for the customer.
		$linked = $this->linkCustomerId( $checkout );
		if ( is_wp_error( $linked ) ) {
			return $linked;
		}

		// purchase created.
		if ( ! empty( $checkout->purchases->data ) ) {
			foreach ( $checkout->purchases->data as $purchase ) {
				if ( empty( $purchase->revoked ) ) {
					// broadcast the webhook.
					do_action( 'surecart/purchase_created', $purchase );
				}
			}
		}

		// the order is confirmed.
		do_action( 'surecart/checkout_confirmed', $checkout, $request );

		// return the order.
		return $checkout;
	}

	/**
	 * Link the customer id to the order.
	 *
	 * @param \SureCart\Models\Checkout $checkout Checkout model.
	 * @return \WP_User|\WP_Error
	 */
	public function linkCustomerId( $checkout ) {
		// get transient.
		$password_hash = get_transient( 'sc_checkout_password_hash_' . $checkout->id );
		// delete transient.
		delete_transient( 'sc_checkout_password_hash_' . $checkout->id );
		// link customer.
		$service = new CustomerLinkService( $checkout, $password_hash );
		return $service->link();
	}

	/**
	 * Validate the form.
	 *
	 * @param array  $args Arguments.
	 * @param object $request Request.
	 * @return \WP_Error Errors.
	 */
	public function validate( $args, $request ) {
		$errors = new \WP_Error();

		// Check if honeypot checkbox checked or not.
		$metadata = $request->get_param( 'metadata' );
		if ( $metadata && ! empty( $metadata['get_feedback'] ) ) {
			$errors->add( 'invalid', __( 'Spam check failed. Please try again.', 'surecart' ) );
		}

		// check recaptcha.
		$service = new RecaptchaValidationService();
		if ( $service->isEnabled() ) {
			$recaptcha = $service->validate( $request->get_param( 'grecaptcha' ) );
			if ( is_wp_error( $recaptcha ) ) {
				$errors->add( $recaptcha->get_error_code(), $recaptcha->get_error_message() );
			}
		}

		return apply_filters( 'surecart/checkout/validate', $errors, $args, $request );
	}

	/**
	 * Cancel an checkout
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \SureCart\Models\Checkout|\WP_Error
	 */
	public function cancel( \WP_REST_Request $request ) {
		$order = $this->middleware( new $this->class( $request['id'] ), $request );
		if ( is_wp_error( $order ) ) {
			return $order;
		}
		return $order->where( $request->get_query_params() )->cancel();
	}

	/**
	 * Offer the bump (used for analytics).
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \SureCart\Models\Checkout|\WP_Error
	 */
	public function offerBump( \WP_REST_Request $request ) {
		$order = $this->middleware( new $this->class( $request['id'] ), $request );
		if ( is_wp_error( $order ) ) {
			return $order;
		}
		return $order->where( $request->get_query_params() )->offerBump( $request['bump_id'] );
	}

	/**
	 * Offer the bump (used for analytics).
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \SureCart\Models\Checkout|\WP_Error
	 */
	public function offerUpsell( \WP_REST_Request $request ) {
		$order = $this->middleware( new $this->class( $request['id'] ), $request );
		if ( is_wp_error( $order ) ) {
			return $order;
		}
		return $order->where( $request->get_query_params() )->offerUpsell( $request['upsell_id'] );
	}

	/**
	 * Offer the bump (used for analytics).
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \SureCart\Models\Checkout|\WP_Error
	 */
	public function declineUpsell( \WP_REST_Request $request ) {
		$order = $this->middleware( new $this->class( $request['id'] ), $request );
		if ( is_wp_error( $order ) ) {
			return $order;
		}
		return $order->where( $request->get_query_params() )->declineUpsell( $request['upsell_id'] );
	}

	/**
	 * Check if the user is trying to sign in.
	 * If so, validate credentials before finalizing.
	 *
	 * @param string $email Email.
	 * @param string $password Password.
	 *
	 * @return true|\WP_Error
	 */
	public function maybeValidateLoginCreds( $email = '', $password = '' ) {
		// check if the person is signing in using a password and sign them in.
		if ( $password && $email ) {
			// user exists, try signing in with password.
			$user = get_user_by( 'email', $email );
			// if there's a user, check the username and password before we submit the order.
			if ( false !== $user ) {
				return wp_authenticate_username_password( null, $user->user_login, $password );
			}
		}
		return true;
	}

	/**
	 * Validate the finalized request.
	 * We do this to make sure the form is in "Test" mode
	 * if a test payment is requested. This prevents the spamming of any
	 * forms on your site that are not in test mode or creating access to something
	 * with a fake test payment.
	 *
	 * @param \SureCart\Models\Checkout $finalized Finalized checkout.
	 * @param \WP_REST_Request          $request The request.
	 *
	 * @return \WP_Error|\SureCart\Models\Checkout
	 */
	public function validateFinalizeRequest( $finalized, $request ) {
		// allow this if the user can edit orders.
		if ( current_user_can( 'edit_sc_orders' ) ) {
			return $finalized;
		}

		// make sure the form id is valid.
		if ( ! empty( $request['form_id'] ) ) {
			return $this->validateFormId( $finalized, $request );
		}

		return $this->validateProductId( $finalized, $request );
	}

	/**
	 * Validate the product id.
	 *
	 * @param \WP_REST_Request       $request The rest request.
	 * @param \SureCart\Models\Order $finalized The finalized order.
	 *
	 * @return \WP_Error|\SureCart\Models\Order
	 */
	public function validateProductId( $finalized, $request ) {
		// make sure the product is valid.
		if ( empty( $request['product_id'] ) ) {
			return new \WP_Error( 'missing_parameters', 'You must pass a form id or product id in order to make this payment.', [ 'status' => 400 ] );
		}
		// make sure the product is valid.
		$product = Product::find( $request['product_id'] );
		if ( empty( $product->id ) ) {
			return new \WP_Error( 'product_id_invalid', esc_html__( 'This product is invalid.', 'surecart' ), [ 'status' => 400 ] );
		}

		// check to make sure the product buy page is enabled.
		if ( ! $product->buyLink()->isEnabled() ) {
			return new \WP_Error( 'product_buy_page_disabled', esc_html__( 'This product is not available for purchase.', 'surecart' ), [ 'status' => 400 ] );
		}

		// the mode must match.
		$mode = $product->buyLink()->getMode();
		// if the request is for test mode, but the form is not test, return an error.
		if ( false === $finalized->live_mode && 'test' !== $mode ) {
			return new \WP_Error( 'invalid_mode', 'This page is set to live mode, but the request is for test mode. Please clear any site caching and try again.', [ 'status' => 400 ] );
		}

		// At least one line item must be for this product.
		foreach ( $finalized->line_items->data as $line_item ) {
			if ( $line_item->price->product->id === $product->id ) {
				return $finalized;
			}
		}

		return new \WP_Error( 'product_buy_page_disabled', esc_html__( 'This product is not available for purchase.', 'surecart' ), [ 'status' => 400 ] );
	}

	/**
	 * Validate the form id.
	 *
	 * @param \WP_REST_Request       $request The rest request.
	 * @param \SureCart\Models\Order $finalized The finalized order.
	 *
	 * @return \WP_Error|\SureCart\Models\Order
	 */
	public function validateFormId( $finalized, $request ) {
		// the form's mode must be test.
		$mode = $this->getFormMode( (int) $request['form_id'] );

		// if the request is for test mode, but the form is not test, return an error.
		if ( false === $finalized->live_mode && 'test' !== $mode ) {
			return new \WP_Error( 'invalid_mode', 'The form is set to live mode, but the request is for test mode.', [ 'status' => 400 ] );
		}

		return $finalized;
	}

	/**
	 * Create or login the user.
	 *
	 * @param string $user_email Username.
	 * @param string $password User password.
	 * @return \WP_Error|true
	 */
	protected function maybeLoginUser( $user_email, $password = '' ) {
		if ( empty( $password ) ) {
			return;
		}
		return wp_signon(
			[
				'user_login'    => $user_email,
				'user_password' => $password,
			]
		);
	}
}
