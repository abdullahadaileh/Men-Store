<?php

namespace SureCart\Models;

/**
 * Price model
 */
class Media extends Model {
	use Traits\HasImageSizes;

	/**
	 * Rest API endpoint
	 *
	 * @var string
	 */
	protected $endpoint = 'medias';

	/**
	 * Object name
	 *
	 * @var string
	 */
	protected $object_name = 'media';

	/**
	 * Image srcset.
	 *
	 * @return string
	 */
	public function getSrcsetAttribute() {
		if ( empty( $this->attributes['url'] ) ) {
			return '';
		}
		return $this->imageSrcSet( $this->attributes['url'] );
	}

	/**
	 * Get the image url for a specific size.
	 *
	 * @param integer $size The size.
	 *
	 * @return string
	 */
	public function getUrl( $size = 0 ) {
		if ( empty( $this->attributes['url'] ) ) {
			return '';
		}
		return $size ? $this->imageUrl( $this->attributes['url'], $size ) : $this->attributes['url'];
	}
}
