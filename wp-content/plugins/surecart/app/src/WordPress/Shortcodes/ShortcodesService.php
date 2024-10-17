<?php

namespace SureCart\WordPress\Shortcodes;

/**
 * The shortcodes service.
 */
class ShortcodesService {
	/**
	 * Convert the block
	 *
	 * @param string $name Block name.
	 * @param string $block Block class.
	 * @param array  $defaults Default attributes.
	 *
	 * @return string
	 */
	public function registerBlockShortcode( $name, $class, $defaults = [] ) {
		add_shortcode(
			$name,
			function( $attributes, $content ) use ( $name, $class, $defaults ) {
				return ( new ShortcodesBlockConversionService( $attributes, $content ) )->convert(
					$name,
					$class,
					$defaults
				);
			},
			10,
			2
		);
	}

	/**
	 * Register shortcode by name
	 *
	 * @param string $name Name of the shortcode.
	 * @param string $block_name The registered block name.
	 * @param array  $defaults Default attributes.
	 *
	 * @return void
	 */
	public function registerBlockShortcodeByName( $name, $block_name, $defaults = [] ) {
		add_shortcode(
			$name,
			function( $attributes, $content ) use ( $name, $block_name, $defaults ) {
				// convert comma separated attributes to array.
				if ( is_array( $attributes ) ) {
					foreach ( $attributes as $key => $value ) {
						if ( strpos( $value, ',' ) !== 0 && isset( $defaults[ $key ] ) && is_array( $defaults[ $key ] ) ) {
							$attributes[ $key ] = explode( ',', $value );
						}
					}
				}

				$shortcode_attrs = shortcode_atts(
					$defaults,
					$attributes,
					$name
				);

				$block = new \WP_Block(
					[
						'blockName'    => $block_name,
						'attrs'        => $shortcode_attrs,
						'innerContent' => do_shortcode( $content ),
					]
				);
				return $block->render();
			}
		);
	}
}
