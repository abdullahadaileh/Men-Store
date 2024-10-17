<?php

namespace SureCart\Controllers\Rest;

use SureCart\Models\Product;

/**
 * Handle Product requests through the REST API
 */
class ProductsController extends RestController {
	/**
	 * Class to make the requests.
	 *
	 * @var string
	 */
	protected $class = Product::class;

	/**
	 * Run some middleware to run before request.
	 *
	 * @param \SureCart\Models\Model $class Model class instance.
	 * @param \WP_REST_Request       $request Request object.
	 *
	 * @return \SureCart\Models\Model
	 */
	protected function middleware( $class, \WP_REST_Request $request ) {
		// if we are in edit context, we want to fetch the variants, variant options and prices.
		if ( 'edit' === $request->get_param( 'context' ) || in_array( $request->get_method(), [ 'POST', 'PUT', 'PATCH', 'DELETE' ] ) ) {
			$class->with( [ 'variants', 'variant_options', 'variants.image', 'prices', 'product_collections', 'commission_structure' ] );
		}
		return parent::middleware( $class, $request );
	}

	/**
	 * Edit model.
	 *
	 * Filter out variations which statuses are draft.
	 *
	 * @param \WP_REST_Request $request Rest Request.
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function edit( \WP_REST_Request $request ) {
		// Stop if we are not editing a variable product.
		if ( empty( $request['variants'] ) ) {
			return parent::edit( $request );
		}

		// Filter draft variations.
		$request['variants'] = array_values(
			array_filter(
				$request['variants'],
				function( $variation ) {
					return ! in_array( $variation['status'] ?? 'publish', [ 'draft', 'deleted' ] );
				}
			)
		);

		return parent::edit( $request );
	}
}
