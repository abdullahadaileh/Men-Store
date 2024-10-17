<?php

namespace SureCartBlocks\Blocks\Product\CollectionBadges;

use SureCartBlocks\Blocks\Product\ProductBlock;
use SureCartBlocks\Util\BlockStyleAttributes;

/**
 * Product Collection Block
 */
class Block extends ProductBlock {
	/**
	 * Render the block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content Post content.
	 *
	 * @return string
	 */
	public function render( $attributes, $content ) {
		$product = $this->getProductAndSetInitialState( $attributes['id'] ?? '' );
		if ( empty( $product ) ) {
			return '';
		}

		// get the collections expanded on the product.
		$collections = $product->product_collections->data ?? [];

		// Limit the number of items displayed based on the $attributes['count'] value.
		if ( ! empty( $attributes['count'] ) ) {
			$collections = array_slice( $collections, 0, (int) $attributes['count'] );
		}

		// we don't have the collections.
		if ( empty( $collections ) ) {
			return '';
		}

		['styles' => $styles, 'classes' => $classes] = BlockStyleAttributes::getClassesAndStylesFromAttributes( $attributes );

		$wrapper_attributes = get_block_wrapper_attributes(
			[
				'class' => 'is-layout-flex',
				'style' => 'gap: ' . $this->getSpacingPresetCssVar( $attr['style']['spacing']['blockGap'] ?? '3px' ),
			]
		);

		ob_start(); ?>
		<div>
			<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
				<?php foreach ( $collections as $collection ) : ?>
					<a href="<?php echo esc_url( $collection->permalink ); ?>"
					class="sc-product-collection-badge <?php echo esc_attr( $classes ); ?>"
					style="<?php echo esc_attr( $styles ); ?>"
					>
					<span aria-hidden="true"><?php echo wp_kses_post( $collection->name ); ?></span>
					<?php // translators: %s: collection name. ?>
					<sc-visually-hidden><?php echo esc_html( sprintf( __( 'Link to %s product collection.', 'surecart' ), $collection->name ) ); ?> </sc-visually-hidden>
				</a>
				<?php endforeach; ?>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}
}
