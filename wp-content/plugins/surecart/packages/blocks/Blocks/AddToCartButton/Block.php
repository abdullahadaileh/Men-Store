<?php

namespace SureCartBlocks\Blocks\AddToCartButton;

use SureCart\Models\Form;
use SureCart\Models\Price;
/**
 * Logout Button Block.
 */
class Block extends \SureCartBlocks\Blocks\BuyButton\Block {
	/**
	 * Render the block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content Post content.
	 *
	 * @return string
	 */
	public function render( $attributes, $content = '' ) {
		// need a price id.
		if ( empty( $attributes['price_id'] ) ) {
			return '';
		}

		$price = Price::find( $attributes['price_id'] );
		if ( empty( $price->id ) ) {
			return '';
		}

		// need a form for checkout.
		$form = \SureCart::forms()->getDefault();
		if ( empty( $form->ID ) ) {
			return '';
		}

		// Use backgroundColor and textColor if exist.
		$styles = '';
		if ( ! empty( $attributes['backgroundColor'] ) ) {
			$styles .= '--sc-color-primary-500: ' . $attributes['backgroundColor'] . '; ';
			$styles .= '--sc-focus-ring-color-primary: ' . $attributes['backgroundColor'] . '; ';
			$styles .= '--sc-input-border-color-focus: ' . $attributes['backgroundColor'] . '; ';
		}
		if ( ! empty( $attributes['textColor'] ) ) {
			$styles .= '--sc-color-primary-text: ' . $attributes['textColor'] . '; ';
		}

		// Slide-out is disabled, go directly to checkout.
		if ( (bool) get_option( 'sc_slide_out_cart_disabled', false ) ) {
			return \SureCart::blocks()->render(
				'blocks/buy-button',
				[
					'type'  => $attributes['type'] ?? 'primary',
					'size'  => $attributes['size'] ?? 'medium',
					'style' => $styles,
					'href'  => $this->href(
						[
							[
								'id'         => $price->id,
								'variant_id' => $attributes['variant_id'] ?? null,
								'quantity'   => 1,
							],
						]
					),
					'label' => $attributes['button_text'] ?? __( 'Buy Now', 'surecart' ),
				]
			);
		}

		ob_start(); ?>

		<sc-cart-form
			price-id="<?php echo esc_attr( $attributes['price_id'] ); ?>"
			variant-id="<?php echo esc_attr( $attributes['variant_id'] ?? '' ); ?>"
			form-id="<?php echo esc_attr( $form->ID ); ?>"
			mode="<?php echo esc_attr( Form::getMode( $form->ID ) ); ?>"
			<?php if ( ! empty( $styles ) ) { ?>
				 style="<?php echo esc_attr( $styles ); ?>"
			<?php } ?>>

			<?php if ( $price->ad_hoc ) : ?>
				<sc-price-input
					currency-code="<?php echo esc_attr( $price->currency ); ?>"
					label="<?php echo esc_attr( ! empty( $attributes['ad_hoc_label'] ) ? $attributes['ad_hoc_label'] : __( 'Amount', 'surecart' ) ); ?>"
					min="<?php echo (int) $price->ad_hoc_min_amount; ?>"
					max="<?php echo (int) $price->ad_hoc_max_amount; ?>"
					placeholder="<?php echo esc_attr( $attributes['placeholder'] ?? '' ); ?>"
					required
					help="<?php echo esc_attr( $attributes['help'] ?? '' ); ?>"
					name="price"
				></sc-price-input>
			<?php endif; ?>

			<sc-cart-form-submit
				type="<?php echo esc_attr( ! empty( $attributes['type'] ) ? $attributes['type'] : 'primary' ); ?>"
				size="<?php echo esc_attr( ! empty( $attributes['size'] ) ? $attributes['size'] : 'medium' ); ?>"
			>
				<?php echo ! empty( $attributes['button_text'] ) ? wp_kses_post( $attributes['button_text'] ) : esc_html__( 'Add To Cart', 'surecart' ); ?>
			</sc-cart-form-submit>
		</sc-cart-form>

			<?php
			return wp_kses_post( ob_get_clean() );
	}
}
