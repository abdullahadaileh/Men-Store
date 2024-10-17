<?php

namespace SureCart\Models\Traits;

trait HasDiscount {
	/**
	 * Always set discount as object.
	 *
	 * @param array|object $value Value to set.
	 * @return $this
	 */
	protected function setDiscountAttribute( $value ) {
		$this->attributes['discount'] = is_string( $value ) ? $value : (object) $value;
		return $this;
	}
}
