<?php

namespace SureCart\Models;

use SureCart\Models\Product;

/**
 * Price model
 */
class Price extends Model {
	/**
	 * Rest API endpoint
	 *
	 * @var string
	 */
	protected $endpoint = 'prices';

	/**
	 * Object name
	 *
	 * @var string
	 */
	protected $object_name = 'price';

	/**
	 * Is this cachable?
	 *
	 * @var boolean
	 */
	protected $cachable = true;

	/**
	 * Clear cache when products are updated.
	 *
	 * @var string
	 */
	protected $cache_key = 'products_updated_at';

	/**
	 * Set the WP Attachment based on the saved id
	 *
	 * @param object $meta Meta value.
	 *
	 * @return void
	 */
	public function filterMetaData( $meta_data ) {
		// get attachment source if we have an id.
		if ( ! empty( $meta_data->wp_attachment_id ) ) {
			$attachment = wp_get_attachment_image_src( $meta_data->wp_attachment_id );

			if ( ! empty( $attachment[0] ) ) {
				$meta_data->wp_attachment_src = $attachment[0];
			}
		}

		return $meta_data;
	}

	/**
	 * Set the product attribute
	 *
	 * @param  string $value Product properties.
	 * @return void
	 */
	public function setProductAttribute( $value ) {
		$this->setRelation( 'product', $value, Product::class );
	}
}
