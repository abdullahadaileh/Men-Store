<?php

namespace SureCart\Models\Traits;

trait HasShippingAddress {
	/**
	 * Always set discount as object.
	 *
	 * @param array|object $value Value to set.
	 * @return $this
	 */
	protected function setShippingAddressAttribute( $value ) {
		$this->attributes['shipping_address'] = (object) $value;
		return $this;
	}
}
