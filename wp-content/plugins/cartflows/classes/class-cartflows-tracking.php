<?php
/**
 * Cartflows_Tracking
 *
 * @package CartFlows
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
/**
 * Flow Markup
 *
 * @since 1.0.0
 */
class Cartflows_Tracking {


	/**
	 * Member Variable
	 *
	 * @var object instance
	 */
	private static $instance;

	/**
	 * Member Variable
	 *
	 * @var object fb_pixel_settings
	 */
	private static $fb_pixel_settings;

	/**
	 * Member Variable
	 *
	 * @var object tik_pixel_settings
	 */
	private static $tik_pixel_settings;


	/**
	 * Member Variable
	 *
	 * @var object ga_settings
	 */
	private static $ga_settings;

	/**
	 * Member Variable
	 *
	 * @since x.x.x
	 * @var array gads_settings
	 */
	private static $gads_settings;

	/**
	 *  Initiator
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 *  Constructor
	 */
	public function __construct() {

		self::$fb_pixel_settings  = Cartflows_Helper::get_facebook_settings();
		self::$tik_pixel_settings = Cartflows_Helper::get_tiktok_settings();
		self::$ga_settings        = Cartflows_Helper::get_google_analytics_settings();
		self::$gads_settings      = Cartflows_Helper::get_google_ads_settings();

		add_action( 'wp_head', array( $this, 'add_tracking_code' ) );

		add_filter( 'global_cartflows_js_localize', array( $this, 'add_localize_vars' ) );

	}

	/**
	 * Add the required nonce for tracking.
	 *
	 * @param array $vars localised vars.
	 */
	public function add_localize_vars( $vars ) {

		if ( 'enable' === self::$fb_pixel_settings['facebook_pixel_add_payment_info'] ) {
			$vars['fb_add_payment_info_data'] = wp_json_encode( $this->prepare_cart_data_fb_response( 'add_payment_info' ) );
		}

		if ( 'enable' === self::$ga_settings['enable_add_payment_info'] ) {
			$vars['add_payment_info_data'] = wp_json_encode( $this->prepare_cart_data_ga_response() );
		}

		if ( 'enable' === self::$tik_pixel_settings['enable_tiktok_add_payment_info'] ) {
			$vars['tiktok_add_payment_info_data'] = wp_json_encode( $this->prepare_cart_data_tiktok_response() );
		}

		if ( 'enable' === self::$gads_settings['enable_google_ads_add_payment_info'] ) {
			$vars['gads_add_payment_info_data'] = wp_json_encode( $this->prepare_cart_data_gads_response() );
		}

		return $vars;
	}

	/**
	 * Add the facebook pixel and google analytics code.
	 */
	public function add_tracking_code() {

		$compatibility = Cartflows_Compatibility::get_instance();

		if ( $compatibility->is_page_builder_preview() ) {
			return;
		}

		$this->add_facebook_pixel_tracking_code();
		$this->add_google_analytics_tracking_code();
		$this->add_tiktok_pixel_tracking_code();
		$this->add_google_ads_tracking_code();
	}



	/**
	 * Function for facebook pixel.
	 */
	public function add_facebook_pixel_tracking_code() {

		if ( 'enable' === self::$fb_pixel_settings['facebook_pixel_tracking'] ) {

			$facebook_id = esc_attr( self::$fb_pixel_settings['facebook_pixel_id'] );
			$fb_script   = "
			<!-- Facebook Pixel Script By CartFlows -->

			<script type='text/javascript'>
				!function(f,b,e,v,n,t,s)
				{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
				n.callMethod.apply(n,arguments):n.queue.push(arguments)};
				if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
				n.queue=[];t=b.createElement(e);t.async=!0;
				t.src=v;s=b.getElementsByTagName(e)[0];
				s.parentNode.insertBefore(t,s)}(window, document,'script',
				'https://connect.facebook.net/en_US/fbevents.js');
			</script>

			<noscript>
				<img height='1' width='1' style='display:none' src='https://www.facebook.com/tr?id=" . esc_js( $facebook_id ) . "&ev=PageView&noscript=1'/>
			</noscript>

			<script type='text/javascript'>
				fbq('init', " . esc_js( $facebook_id ) . ");
				fbq('track', 'PageView', {'plugin': 'CartFlows'});
			</script>

			<!-- End Facebook Pixel Script By CartFlows -->";

			if ( 'enable' === self::$fb_pixel_settings['facebook_pixel_tracking_for_site'] ) {
				echo $fb_script; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				$this->trigger_viewcontent_events();
			} elseif ( wcf()->utils->is_step_post_type() ) {
				echo $fb_script; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				$this->trigger_viewcontent_events();
			}

			// Trigger other events on CartFlows pages only.
			if ( wcf()->is_woo_active && wcf()->utils->is_step_post_type() ) {
				$this->trigger_other_fb_events();
			}
		}
	}

	/**
	 * Trigger the View Content events for facebook pixel.
	 */
	public function trigger_viewcontent_events() {

		$event_script = '';

		// Check if ViewContent is enable or disable.
		if ( 'enable' === self::$fb_pixel_settings['facebook_pixel_view_content'] ) {
			$view_content  = wp_json_encode( $this->prepare_viewcontent_data_fb_response() );
			$event_script .= "
			<script type='text/javascript'>
				fbq( 'track', 'ViewContent', $view_content );
			</script>";
		}

		echo $event_script; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}

	/**
	 * Trigger the other events for facebook pixel.
	 */
	public function trigger_other_fb_events() {

		$event_script = '';

		if ( _is_wcf_checkout_type() && 'enable' === self::$fb_pixel_settings['facebook_pixel_initiate_checkout'] ) {

			$cart_data              = wp_json_encode( $this->prepare_cart_data_fb_response( 'add_to_cart' ) );
			$initiate_checkout_data = wp_json_encode( $this->prepare_cart_data_fb_response( 'initiate_checkout' ) );

			$event_script .= "
			<script type='text/javascript'>
				fbq( 'track', 'AddToCart', $cart_data );
				fbq( 'track', 'InitiateCheckout', $initiate_checkout_data );
			</script>";
		}

		if ( isset( $_GET['wcf-order'] ) && 'enable' === self::$fb_pixel_settings['facebook_pixel_purchase_complete'] ) { //phpcs:ignore WordPress.Security.NonceVerification.Recommended

			$order_id         = intval( $_GET['wcf-order'] ); //phpcs:ignore WordPress.Security.NonceVerification.Recommended
			$purchase_details = $this->prepare_purchase_data_fb_response( $order_id );
			if ( ! empty( $purchase_details ) ) {
				$purchase_details = wp_json_encode( $purchase_details );
				$event_script    .= "
				<script type='text/javascript'>
					fbq( 'track', 'Purchase', $purchase_details );
				</script>";
			}
		}

		do_action( 'cartflows_facebook_pixel_events' );

		echo $event_script; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}

	/**
	 * Prepare checkout purchase response for facebook purchase event.
	 *
	 * @param integer $order_id order id.
	 */
	public function prepare_purchase_data_fb_response( $order_id ) {

		$purchase_data = array();
		$order         = wc_get_order( $order_id );

		if ( ! $order ) {
			return $purchase_data;
		}

		$is_checkout_tracked = $order->get_meta( '_wcf_fbp_checkout_tracked' );
		if ( $is_checkout_tracked ) {
			return $purchase_data;
		}

		// Do not trigger purchase event if it is optin.
		$is_optin = $order->get_meta( '_wcf_optin_id' );

		if ( $is_optin ) {
			return $purchase_data;
		}

		$purchase_data['transaction_id'] = $order_id;
		$purchase_data['content_type']   = 'product';
		$purchase_data['currency']       = wcf()->options->get_checkout_meta_value( $order_id, '_order_currency' );
		$purchase_data['userAgent']      = wcf()->options->get_checkout_meta_value( $order_id, '_customer_user_agent' );
		$purchase_data['plugin']         = 'CartFlows';

		// Iterating through each WC_Order_Item_Product objects.
		foreach ( $order->get_items() as $item_key => $item ) {
			$product                             = $item->get_product(); // Get the WC_Product object.
			$purchase_data['content_ids'][]      = (string) $product->get_id();
			$purchase_data['content_names'][]    = $product->get_name();
			$purchase_data['content_category'][] = wp_strip_all_tags( wc_get_product_category_list( $product->get_id() ) );
		}
		$purchase_data['value'] = wcf()->options->get_checkout_meta_value( $order_id, '_order_total' );
		$order->update_meta_data( '_wcf_fbp_checkout_tracked', true );
		$order->save();

		return $purchase_data;
	}

	/**
	 * Prepare cart data for fb response.
	 *
	 * @param string $event event type.
	 *
	 * @return array
	 */
	public function prepare_cart_data_fb_response( $event = '' ) {

		$params = array();

		if ( ! wcf()->is_woo_active ) {
			return $params;
		}

		$cart_total       = self::format_number( WC()->cart->cart_contents_total + WC()->cart->tax_total );
		$cart_items_count = WC()->cart->get_cart_contents_count();
		$items            = WC()->cart->get_cart();

		$product_data = $this->get_required_product_data_for_fb( $items );

		$params['content_ids']      = $product_data['content_ids'];
		$params['content_type']     = 'product';
		$params['plugin']           = 'CartFlows-Checkout';
		$params['value']            = $cart_total;
		$params['content_name']     = substr( $product_data['product_names'], 2 );
		$params['content_category'] = substr( $product_data['category_names'], 2 );
		$params['contents']         = wp_json_encode( $product_data['cart_contents'] );
		$params['currency']         = get_woocommerce_currency();
		$params['user_roles']       = implode( ', ', wp_get_current_user()->roles );

		if ( 'add_to_cart' !== $event ) {
			$params['num_items'] = $cart_items_count;
			$params['domain']    = get_site_url();
			$params['language']  = get_bloginfo( 'language' );
			$params['userAgent'] = isset( $_SERVER['HTTP_USER_AGENT'] ) ? wc_clean( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ) : ''; //phpcs:ignore WordPressVIPMinimum.Variables.RestrictedVariables.cache_constraints___SERVER__HTTP_USER_AGENT__
		}

		return $params;
	}

	/**
	 * Prepare view content data for fb response.
	 *
	 * @return array
	 */
	public function prepare_viewcontent_data_fb_response() {
		global $post, $wcf_step;

		$params = array();

		// Page Title.
		$step_id                = ( $wcf_step ) ? ( $wcf_step->get_current_step() ) : ( get_the_ID() );
		$params['content_name'] = get_post_field( 'post_title', $step_id );

		// Checkout Page View Content Data.
		if ( wcf()->is_woo_active ) {

			if ( _is_wcf_checkout_type() ) {
				$cart_total   = self::format_number( WC()->cart->cart_contents_total + WC()->cart->tax_total );
				$items        = WC()->cart->get_cart();
				$product_data = $this->get_required_product_data_for_fb( $items );

				$params['content_ids']  = $product_data['content_ids'];
				$params['currency']     = get_woocommerce_currency();
				$params['value']        = $cart_total;
				$params['content_type'] = 'product';
				$params['contents']     = wp_json_encode( $product_data['cart_contents'] );
			}

			// Added filter for offer pages  view content event compatibility.
			$params = apply_filters( 'cartflows_view_content_offer', $params, $step_id );
		}

		return $params;
	}

	/**
	 * Get product data for FB.
	 *
	 * @param object $items products data.
	 */
	public function get_required_product_data_for_fb( $items ) {

		$product_data   = array();
		$content_ids    = array();
		$category_names = '';
		$product_names  = '';

		foreach ( $items as $item => $value ) {

			$_product = wc_get_product( $value['product_id'] );

			if ( $_product ) {

				$product_obj = $_product;

				if ( $_product->is_type( 'variable' ) && isset( $value['variation_id'] ) ) {
					$product_obj = wc_get_product( $value['variation_id'] );
				}

				if ( $product_obj ) {
					$content_ids[]  = (string) $product_obj->get_id();
					$product_names  = $product_names . ', ' . $product_obj->get_name();
					$category_names = $category_names . ', ' . wp_strip_all_tags( wc_get_product_category_list( $product_obj->get_id() ) );

					$data = array(
						'id'       => $product_obj->get_id(),
						'name'     => $product_obj->get_name(),
						'price'    => self::format_number( $value['line_subtotal'] + $value['line_subtotal_tax'] ),
						'quantity' => $value['quantity'],
					);

					array_push( $product_data, $data );
				}
			}
		}

		return array(
			'cart_contents'  => $product_data,
			'content_ids'    => $content_ids,
			'product_names'  => $product_names,
			'category_names' => $category_names,
		);
	}
	/**
	 * Render google tag framework.
	 */
	public function add_google_analytics_tracking_code() {

		$ga_tracking_id = esc_attr( self::$ga_settings['google_analytics_id'] );

		if ( 'enable' === self::$ga_settings['enable_google_analytics'] ) {
			// phpcs:disable WordPress.WP.EnqueuedResources.NonEnqueuedScript
			$ga_script =
			'<!-- Google Analytics Script By CartFlows start-->
				<script async src="https://www.googletagmanager.com/gtag/js?id=' . esc_js( $ga_tracking_id ) . '"></script>

				<script>
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag( "js", new Date() );
					gtag("config","' . esc_js( $ga_tracking_id ) . '");
				</script>

			<!-- Google Analytics Script By CartFlows -->
			';

			//phpcs:enable WordPress.WP.EnqueuedResources.NonEnqueuedScript

			if ( 'enable' === self::$ga_settings['enable_google_analytics_for_site'] ) {
				echo $ga_script; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			} elseif ( wcf()->utils->is_step_post_type() ) {
				echo $ga_script; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}

			// Trigger other events on CartFlows pages only.
			if ( wcf()->is_woo_active && wcf()->utils->is_step_post_type() ) {
				$this->trigger_other_ga_events();
			}
		}
	}

	/**
	 * Trigger the other events for facebook pixel.
	 */
	public function trigger_other_ga_events() {

		$event_script = '';

		if ( _is_wcf_checkout_type() ) {

			$cart_data = $this->prepare_cart_data_ga_response();

			$event_data = wp_json_encode( $cart_data );

			if ( 'enable' === self::$ga_settings['enable_add_to_cart'] ) {
				$event_script .= "
				<script type='text/javascript'>
					gtag( 'event', 'add_to_cart', $event_data );
				</script>";
			}
			if ( 'enable' === self::$ga_settings['enable_begin_checkout'] ) {
				$event_script .= "
				<script type='text/javascript'>
					gtag( 'event', 'begin_checkout', $event_data );
				</script>";
			}
		}

		if ( isset( $_GET['wcf-order'] ) && 'enable' === self::$ga_settings['enable_purchase_event'] ) { //phpcs:ignore WordPress.Security.NonceVerification.Recommended

			$order_id = intval( $_GET['wcf-order'] ); //phpcs:ignore WordPress.Security.NonceVerification.Recommended

			$purchase_details = $this->get_ga_purchase_transactions_data( $order_id );

			if ( ! empty( $purchase_details ) ) {

				$purchase_data = wp_json_encode( $purchase_details );

				$event_script .= "
					<script type='text/javascript'>
					gtag( 'event', 'purchase', $purchase_data );
			 		</script>";
			}
		}

		do_action( 'cartflows_google_analytics_events' );

		echo $event_script; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}

	/**
	 * Prepare cart data for GA response.
	 *
	 * @param int $order_id order id.
	 * @return array
	 */
	public function get_ga_purchase_transactions_data( $order_id ) {

		$purchase_data = array();
		$order         = wc_get_order( $order_id );

		if ( ! $order ) {
			return $purchase_data;
		}

		$is_checkout_tracked = $order->get_meta( '_wcf_ga_checkout_tracked' );
		if ( $is_checkout_tracked ) {
			return $purchase_data;
		}

		$purchase_data['items'] = array();
		$cart_contents          = array();

		$purchase_data = array(
			'send_to'         => self::$ga_settings['google_analytics_id'],
			'event_category'  => 'Enhanced-Ecommerce',
			'transaction_id'  => $order_id,
			'affiliation'     => get_bloginfo( 'name' ),
			'value'           => self::format_number( $order->get_total() ),
			'currency'        => $order->get_currency(),
			'tax'             => self::format_number( $order->get_total_tax() ),
			'shipping'        => self::format_number( $order->get_shipping_total() + $order->get_shipping_tax() ),
			'coupon'          => $order->get_coupon_codes(),
			'non_interaction' => true,
		);

		$items                  = $order->get_items();
		$items_data             = $this->get_required_product_data_for_ga( $items );
		$purchase_data['items'] = $items_data;

		$order->update_meta_data( '_wcf_ga_checkout_tracked', true );
		$order->save();

		return $purchase_data;
	}

	/**
	 * Prepare cart data for GA response.
	 *
	 * @since x.x.x
	 * @param int $order_id order id.
	 * @return array $purchase_data The Purchase data of the Google Ads Event
	 */
	public function get_gads_purchase_transactions_data( $order_id ) {

		$purchase_data = array();
		$order         = wc_get_order( $order_id );

		if ( ! $order ) {
			return $purchase_data;
		}

		$is_checkout_tracked = $order->get_meta( '_wcf_gads_checkout_tracked' );
		if ( $is_checkout_tracked ) {
			return $purchase_data;
		}

		$purchase_data['items'] = array();
		$gads_tracking_id       = sanitize_text_field( self::$gads_settings['google_ads_id'] );
		$gads_conversion_label  = sanitize_text_field( self::$gads_settings['google_ads_label'] );
		$purchase_data          = array(
			'send_to'         => $gads_tracking_id . '/' . $gads_conversion_label,
			'event_category'  => 'Enhanced-Ecommerce',
			'transaction_id'  => $order_id,
			'affiliation'     => get_bloginfo( 'name' ),
			'value'           => self::format_number( $order->get_total() ),
			'currency'        => $order->get_currency(),
			'tax'             => self::format_number( $order->get_total_tax() ),
			'shipping'        => self::format_number( $order->get_shipping_total() + $order->get_shipping_tax() ),
			'coupon'          => $order->get_coupon_codes(),
			'non_interaction' => true,
		);

		$items                  = $order->get_items();
		$items_data             = $this->get_required_product_data_for_ga( $items );
		$purchase_data['items'] = $items_data;

		$order->update_meta_data( '_wcf_gads_checkout_tracked', true );
		$order->save();

		return $purchase_data;
	}

	/**
	 * Prepare Ecommerce data for GA response.
	 *
	 * @return array
	 */
	public function prepare_cart_data_ga_response() {

		$items_data = array();
		$cart_data  = array();

		if ( ! wcf()->is_woo_active ) {
			return $cart_data;
		}

		$items = WC()->cart->get_cart();

		$items_data = $this->get_required_product_data_for_ga( $items );

		$cart_data = array(
			'send_to'         => self::$ga_settings['google_analytics_id'],
			'event_category'  => 'Enhanced-Ecommerce',
			'currency'        => get_woocommerce_currency(),
			'coupon'          => WC()->cart->get_applied_coupons(),
			'value'           => self::format_number( WC()->cart->cart_contents_total + WC()->cart->tax_total ),
			'items'           => $items_data,
			'non_interaction' => true,
		);

		return $cart_data;
	}


	/**
	 * Prepare Ecommerce data for GA response.
	 *
	 * @since x.x.x
	 * @return array
	 */
	public function prepare_cart_data_gads_response() {

		$items_data = array();
		$cart_data  = array();

		if ( ! wcf()->is_woo_active ) {
			return $cart_data;
		}

		$items = WC()->cart->get_cart();

		$items_data            = $this->get_required_product_data_for_ga( $items );
		$gads_tracking_id      = sanitize_text_field( self::$gads_settings['google_ads_id'] );
		$gads_conversion_label = sanitize_text_field( self::$gads_settings['google_ads_label'] );
		$cart_data             = array(
			'send_to'         => $gads_tracking_id . '/' . $gads_conversion_label,
			'event_category'  => 'Enhanced-Ecommerce',
			'currency'        => get_woocommerce_currency(),
			'coupon'          => WC()->cart->get_applied_coupons(),
			'value'           => self::format_number( WC()->cart->cart_contents_total + WC()->cart->tax_total ),
			'items'           => $items_data,
			'non_interaction' => true,
		);

		return $cart_data;
	}


	/**
	 * Get product data.
	 *
	 * @param object $items products data.
	 */
	public function get_required_product_data_for_ga( $items ) {

		$product_data = array();

		foreach ( $items as $item => $value ) {

			$_product = wc_get_product( $value['product_id'] );

			if ( $_product ) {

				$product_obj = $_product;

				if ( $_product->is_type( 'variable' ) && isset( $value['variation_id'] ) ) {
					$product_obj = wc_get_product( $value['variation_id'] );
				}

				if ( $product_obj ) {

					$data = array(
						'id'       => $product_obj->get_id(),
						'name'     => $product_obj->get_name(),
						'sku'      => $product_obj->get_sku(),
						'category' => wp_strip_all_tags( wc_get_product_category_list( $product_obj->get_id() ) ),
						'price'    => self::format_number( $value['line_subtotal'] + $value['line_subtotal_tax'] ),
						'quantity' => $value['quantity'],
					);

					array_push( $product_data, $data );
				}
			}
		}

		return $product_data;
	}

	/**
	 * Function for tiktok pixel.
	 */
	public function add_tiktok_pixel_tracking_code() {

		if ( 'enable' === self::$tik_pixel_settings['tiktok_pixel_tracking'] ) {

			$sanitized_tiktok_id = isset( self::$tik_pixel_settings['tiktok_pixel_id'] ) ? esc_attr( self::$tik_pixel_settings['tiktok_pixel_id'] ) : '';
			$tiktok_id           = trim( $sanitized_tiktok_id );
			$identify_data       = wp_json_encode( $this->prepare_identify_data_for_tiktok() );

			$tik_script = "
			<!-- TikTok Pixel Script By CartFlows -->

			<script type='text/javascript'>
				!function (w, d, t) {
				w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie','holdConsent','revokeConsent','grantConsent'],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
				var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r='https://analytics.tiktok.com/i18n/pixel/events.js',o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement('script')
				;n.type='text/javascript',n.async=!0,n.src=r+'?sdkid='+e+'&lib='+t;e=document.getElementsByTagName('script')[0];e.parentNode.insertBefore(n,e)};


				ttq.load('" . esc_js( $tiktok_id ) . "');
				ttq.instance('" . esc_js( $tiktok_id ) . "').identify($identify_data);
				ttq.page();
				}(window, document, 'ttq');
			</script>

			<!-- End TikTok Pixel Script By CartFlows -->";

			if ( 'enable' === self::$tik_pixel_settings['tiktok_pixel_tracking_for_site'] ) {
				echo $tik_script; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				$this->trigger_tiktok_viewcontent_events();
			} elseif ( wcf()->utils->is_step_post_type() ) {
				echo $tik_script; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				$this->trigger_tiktok_viewcontent_events();
			}

			// Trigger other events on CartFlows pages only.
			if ( wcf()->is_woo_active && wcf()->utils->is_step_post_type() && $tiktok_id ) {
				$this->trigger_other_tiktok_events( $tiktok_id );
			}
		}
	}

	/**
	 * Trigger the View Content events for tiktok pixel.
	 */
	public function trigger_tiktok_viewcontent_events() {

		$event_script = '';

		// Check if ViewContent is enable or disable.
		if ( 'enable' === self::$tik_pixel_settings['enable_tiktok_view_content'] ) {
			$view_content = $this->prepare_viewcontent_data_tiktok_response();

			if ( ! empty( $view_content ) ) {
				$view_content_data = wp_json_encode( $this->prepare_viewcontent_data_tiktok_response() );
				$event_script     .= "
				<script type='text/javascript'>
					setTimeout(function () {
						ttq.track('ViewContent', " . $view_content_data . ');
					}, 1200);
				</script>';
			}
		}

		echo $event_script; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}

	/**
	 * Prepare view content data for tiktok response.
	 *
	 * @return array
	 */
	public function prepare_viewcontent_data_tiktok_response() {
		global $post, $wcf_step;

		$params = array();

		$step_id      = ( $wcf_step ) ? ( $wcf_step->get_current_step() ) : ( get_the_ID() );
		$content_name = get_post_field( 'post_title', $step_id );
		$contents     = array();
		$total_value  = 0;

		// Checkout Page View Content Data.
		if ( wcf()->is_woo_active ) {
			if ( _is_wcf_thankyou_type() ) {
				if ( isset( $_GET['wcf-order'] ) && ! empty( $_GET['wcf-order'] ) ) {//phpcs:ignore WordPress.Security.NonceVerification.Recommended
					$order_id = intval( $_GET['wcf-order'] );//phpcs:ignore WordPress.Security.NonceVerification.Recommended
					$order    = wc_get_order( $order_id );

					// Check if the order exists.
					if ( $order ) {
						$total_value = $order->get_total();

						foreach ( $order->get_items() as $item_id => $item ) {
							$product = $item->get_product();

							$contents[] = array(
								'content_id'   => $product->get_id(),
								'content_name' => $product->get_name(),
								'content_type' => 'product',
							);
						}
					}
				}
			} elseif ( _is_wcf_checkout_type() || _is_wcf_landing_type() ) {
				$total_value = self::format_number( WC()->cart->cart_contents_total + WC()->cart->tax_total );
				$items       = WC()->cart->get_cart();

				if ( $items ) {
					foreach ( $items as $item ) {
						$product_id   = $item['product_id'];
						$product_name = get_the_title( $product_id );

						$contents[] = array(
							'content_id'   => (string) $product_id,
							'content_name' => $product_name,
							'content_type' => 'product',
						);
					}
				}
			}

			// Set TikTok parameters.
			$params['contents'] = $contents;
			$params['value']    = $total_value;
			$params['currency'] = get_woocommerce_currency();

			// Added filter for offer pages view content event compatibility.
			$params = apply_filters( 'cartflows_tiktok_view_content_offer', $params, $step_id );

			if ( empty( $params['contents'] ) ) {
				return array();
			}
		}

		return $params;
	}

	/**
	 * Prepare identify data for tiktok response.
	 *
	 * @return array
	 */
	public function prepare_identify_data_for_tiktok() {
		$user          = wp_get_current_user();
		$identify_data = array();

		if ( ! empty( $user ) && 0 !== $user->ID ) {
			// Check if user has an email, and hash it using SHA-256.
			if ( ! empty( $user->user_email ) ) {
				$identify_data['email'] = hash( 'sha256', $user->user_email );
			} else {
				$identify_data['email'] = hash( 'sha256', $user->get( 'billing_email' ) );
			}

			// Check if user has an phone number, and hash it using SHA-256.
			$phone_number = get_user_meta( $user->ID, 'user_phone', true );
			if ( ! empty( $phone_number ) ) {
				$identify_data['phone_number'] = hash( 'sha256', $phone_number );
			} else {
				$identify_data['phone_number'] = hash( 'sha256', $user->get( 'billing_phone' ) );
			}
		}

		return $identify_data;
	}

	/**
	 * Prepare cart data for tiktok response.
	 *
	 * @param string $event event type.
	 *
	 * @return array
	 */
	public function prepare_cart_data_tiktok_response( $event = '' ) {

		$params = array();

		if ( ! wcf()->is_woo_active ) {
			return $params;
		}

		// Calculate cart total and get cart items.
		$cart_total = self::format_number( WC()->cart->cart_contents_total + WC()->cart->tax_total );
		$cart_items = WC()->cart->get_cart();
		$contents   = array();

		// Loop through each cart item to get the required data.
		foreach ( $cart_items as $cart_item ) {
			$product    = $cart_item['data'];
			$contents[] = array(
				'content_id'   => $cart_item['product_id'],
				'content_name' => $product->get_name(),
				'quantity'     => $cart_item['quantity'],
				'price'        => wc_get_price_to_display( $product ),
				'content_type' => 'product',
			);
		}

		// Prepare params.
		$params['contents'] = $contents;
		$params['value']    = $cart_total;
		$params['currency'] = get_woocommerce_currency();

		if ( 'add_to_cart' !== $event ) {
			$params['num_items'] = WC()->cart->get_cart_contents_count();
		}

		return $params;
	}

	/**
	 * Prepare purchase data for tiktok response.
	 *
	 * @param integer $order_id order id.
	 *
	 * @return array
	 */
	public function prepare_purchase_data_tiktok_response( $order_id ) {

		$purchase_data = array();
		$order         = wc_get_order( $order_id );

		if ( ! $order ) {
			return $purchase_data;
		}

		// Check if the checkout has already been tracked.
		$is_checkout_tracked = $order->get_meta( '_wcf_tiktok_checkout_tracked' );
		if ( $is_checkout_tracked ) {
			return $purchase_data;
		}

		// Do not trigger purchase event if it is an opt-in.
		$is_optin = $order->get_meta( '_wcf_optin_id' );
		if ( $is_optin ) {
			return $purchase_data;
		}

		// Prepare data for TikTok CompletePayment event.
		$purchase_data['transaction_id'] = $order_id;
		$purchase_data['currency']       = $order->get_currency();
		$purchase_data['value']          = $order->get_total();
		$purchase_data['content_type']   = 'product';  // Set content type to 'product'.
		$purchase_data['plugin']         = 'CartFlows';

		// Initialize contents array.
		$contents = array();

		// Iterating through each WC_Order_Item_Product objects.
		foreach ( $order->get_items() as $item_key => $item ) {
			$product = $item->get_product(); // Get the WC_Product object.

			// Append each product details to contents array.
			$contents[] = array(
				'content_id'   => (string) $product->get_id(),
				'content_name' => $product->get_name(),
				'quantity'     => $item->get_quantity(),
				'price'        => wc_get_price_to_display( $product ),
				'content_type' => 'product',
			);
		}

		// Add contents to the purchase data.
		$purchase_data['contents'] = $contents;

		// Mark the order as tracked for this event.
		$order->update_meta_data( '_wcf_tiktok_checkout_tracked', true );
		$order->save();

		return $purchase_data;
	}

	/**
	 * Trigger the other events for tiktok pixel.
	 *
	 * @param string $tiktok_id TikTok pixel ID.
	 */
	public function trigger_other_tiktok_events( $tiktok_id ) {

		$event_script = '';

		if ( _is_wcf_checkout_type() && 'enable' === self::$tik_pixel_settings['enable_tiktok_add_to_cart'] ) {
			$cart_data = $this->prepare_cart_data_tiktok_response( 'add_to_cart' );
			if ( ! empty( $cart_data ) ) {
				$cart_data = wp_json_encode( $cart_data );

				$event_script .= "
				<script type='text/javascript'>
					setTimeout(function () {
						ttq.instance('" . esc_js( $tiktok_id ) . "').track( 'AddToCart', $cart_data );
					}, 1300);
				</script>";
			}
		}

		if ( _is_wcf_checkout_type() && 'enable' === self::$tik_pixel_settings['enable_tiktok_begin_checkout'] ) {
			$checkout_data = $this->prepare_cart_data_tiktok_response();
			if ( ! empty( $checkout_data ) ) {
				$checkout_data = wp_json_encode( $checkout_data );

				$event_script .= "
				<script type='text/javascript'>
					ttq.instance('" . esc_js( $tiktok_id ) . "').track( 'InitiateCheckout', $checkout_data );
				</script>";
			}
		}

		if ( isset( $_GET['wcf-order'] ) && 'enable' === self::$tik_pixel_settings['enable_tiktok_purchase_event'] ) { //phpcs:ignore WordPress.Security.NonceVerification.Recommended
			$order_id         = intval( $_GET['wcf-order'] ); //phpcs:ignore WordPress.Security.NonceVerification.Recommended
			$purchase_details = $this->prepare_purchase_data_tiktok_response( $order_id );
			if ( ! empty( $purchase_details ) ) {
				$purchase_details = wp_json_encode( $purchase_details );
				$event_script    .= "
				<script type='text/javascript'>
					ttq.instance('" . esc_js( $tiktok_id ) . "').track( 'CompletePayment', $purchase_details );
				</script>";
			}
		}

		do_action( 'cartflows_tiktok_pixel_events' );

		echo $event_script; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}

	/**
	 * Render google tag framework.
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function add_google_ads_tracking_code() {

		$gads_tracking_id = esc_attr( self::$gads_settings['google_ads_id'] );

		if ( 'enable' === self::$gads_settings['google_ads_tracking'] ) {
			// phpcs:disable WordPress.WP.EnqueuedResources.NonEnqueuedScript
			$gads_script =
			'<!-- Google Ads Script By CartFlows start-->
				<script async src="https://www.googletagmanager.com/gtag/js?id=' . esc_js( $gads_tracking_id ) . '"></script>

				<script>
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag( "js", new Date() );
					gtag("config","' . esc_js( $gads_tracking_id ) . '");
				</script>

			<!-- Google Ads Script By CartFlows -->
			';

			//phpcs:enable WordPress.WP.EnqueuedResources.NonEnqueuedScript

			if ( 'enable' === self::$gads_settings['google_ads_for_site'] ) {
				echo $gads_script; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				$this->trigger_gads_viewcontent_events();
			} elseif ( wcf()->utils->is_step_post_type() ) {
				echo $gads_script; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				$this->trigger_gads_viewcontent_events();
			}

			// Trigger other events on CartFlows pages only.
			if ( wcf()->is_woo_active && wcf()->utils->is_step_post_type() ) {
				$this->trigger_other_gads_events();
			}
		}
	}

	/**
	 * Trigger the other events for facebook pixel.
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function trigger_other_gads_events() {
		$event_script = '';

		if ( _is_wcf_checkout_type() ) {

			$cart_data = $this->prepare_cart_data_gads_response();

			$event_data = wp_json_encode( $cart_data );

			if ( 'enable' === self::$gads_settings['enable_google_ads_add_to_cart'] ) {
				$event_script .= "
				<script type='text/javascript'>
					gtag( 'event', 'add_to_cart', $event_data );
				</script>
				";
			}
			if ( 'enable' === self::$gads_settings['enable_google_ads_begin_checkout'] ) {
				$event_script .= "
				<script type='text/javascript'>
					gtag( 'event', 'begin_checkout', $event_data );
				</script>";
			}
		}

		if ( isset( $_GET['wcf-order'] ) && 'enable' === self::$gads_settings['enable_google_ads_purchase_event'] ) { //phpcs:ignore WordPress.Security.NonceVerification.Recommended

			$order_id = intval( $_GET['wcf-order'] ); //phpcs:ignore WordPress.Security.NonceVerification.Recommended

			$purchase_details = $this->get_gads_purchase_transactions_data( $order_id );

			if ( ! empty( $purchase_details ) ) {

				$purchase_data = wp_json_encode( $purchase_details );

				$event_script .= "
					<script type='text/javascript'>
					gtag( 'event', 'purchase', $purchase_data );
			 		</script>";
			}
		}

		do_action( 'cartflows_google_ads_events' );

		echo $event_script; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}


	/**
	 * Get decimal of price.
	 *
	 * @param integer $price price.
	 */
	public static function format_number( $price ) {

		return number_format( floatval( $price ), wc_get_price_decimals(), '.', '' );

	}

	/**
	 * Trigger the View Content events for gads tracking.
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function trigger_gads_viewcontent_events() {
		$gads_tracking_id      = sanitize_text_field( self::$gads_settings['google_ads_id'] );
		$gads_conversion_label = sanitize_text_field( self::$gads_settings['google_ads_label'] );
		$script                = "<script type='text/javascript'>
					gtag( 'event', 'page_view',{ 'send_to': '.$gads_tracking_id.'/'.$gads_conversion_label.'} );
			 		</script>";

		echo $script; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

	}
}

/**
 *  Kicking this off by calling 'get_instance()' method
 */
Cartflows_Tracking::get_instance();
