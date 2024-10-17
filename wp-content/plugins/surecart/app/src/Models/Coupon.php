<?php

namespace SureCart\Models;

use SureCart\Support\Currency;

/**
 * Price model
 */
class Coupon extends Model {
	/**
	 * Rest API endpoint
	 *
	 * @var string
	 */
	protected $endpoint = 'coupons';

	/**
	 * Object name
	 *
	 * @var string
	 */
	protected $object_name = 'coupon';

	/**
	 * Is this cachable?
	 *
	 * @var boolean
	 */
	protected $cachable = true;

	/**
	 * Clear cache when coupons are updated.
	 *
	 * @var string
	 */
	protected $cache_key = 'coupons_updated_at';

	/**
	 * Get discount amount attribute.
	 *
	 * @return string
	 */
	public function getDiscountAmountAttribute() {
		return $this->amount_off ? Currency::format( $this->amount_off, $this->currency ) : $this->percent_off . '%';
	}

	/**
	 * Set the subscriptions attribute
	 *
	 * @param  object $value Subscription data array.
	 * @return void
	 */
	public function setPromotionsAttribute( $value ) {
		if ( ! empty( $value->data ) ) {
			// coming back from server.
			$this->setCollection( 'promotions', $value, Promotion::class );
		} else {
			// sending to server.
			if ( is_array( $value ) ) {
				foreach ( $value as $attributes ) {
					$models[] = is_a( $attributes, Promotion::class ) ? $attributes : new Promotion( $attributes );
				}
				$this->attributes['promotions'] = $models;
			}
		}
	}
}
