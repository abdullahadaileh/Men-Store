<?php

namespace SureCart\Models;

use SureCart\Models\Traits\HasCheckout;
use SureCart\Models\Traits\HasPrice;

/**
 * Price model
 */
class LineItem extends Model {
	use HasPrice, HasCheckout;

	/**
	 * Rest API endpoint
	 *
	 * @var string
	 */
	protected $endpoint = 'line_items';

	/**
	 * Object name
	 *
	 * @var string
	 */
	protected $object_name = 'line_item';

	/**
	 * Set the variant attribute.
	 *
	 * @param  string $value Variant properties.
	 * @return void
	 */
	public function setVariantAttribute( $value ) {
		$this->setRelation( 'variant', $value, Variant::class );
	}

	/**
	 * Upsell a line item.
	 *
	 * @param array $attributes The attributes to update.
	 * @return \WP_Error|mixed
	 */
	protected function upsell( $attributes = [] ) {
		if ( $this->fireModelEvent( 'upselling' ) === false ) {
			return false;
		}

		$updated = $this->makeRequest(
			[
				'method' => 'POST',
				'query'  => $this->query,
				'body'   => [
					$this->object_name => $attributes,
				],
			],
			'line_items/upsell'
		);

		if ( $this->isError( $updated ) ) {
			return $updated;
		}

		$this->resetAttributes();

		$this->fill( $updated );

		$this->fireModelEvent( 'upsold' );

		// clear account cache.
		if ( $this->cachable || $this->clears_account_cache ) {
			\SureCart::account()->clearCache();
		}

		return $this;
	}

	/**
	 * Purchasable status display
	 *
	 * @return string
	 */
	public function getPurchasableStatusDisplayAttribute() {
		if ( 'purchasable' === $this->purchasable_status ) {
			return;
		}

		// translations for purchaseable status.
		$translations = array(
			'price_gone'             => __( 'No longer available', 'surecart' ),
			'price_old_version'      => __( 'Price has changed', 'surecart' ),
			'variant_missing'        => __( 'Options no longer available', 'surecart' ),
			'variant_old_version'    => __( 'Price has changed', 'surecart' ),
			'variant_gone'           => __( 'Item no longer available', 'surecart' ),
			'out_of_stock'           => __( 'Out of stock', 'surecart' ),
			'exceeds_purchase_limit' => __( 'Exceeds purchase limit', 'surecart' ),
		);

		return $translations[ $this->purchasable_status ] ?? '';
	}
}
