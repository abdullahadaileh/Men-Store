<?php

namespace SureCartBlocks\Blocks\CartMenuButton;

use SureCartBlocks\Blocks\BaseBlock;

/**
 * Cart Menu Button CTA Block.
 */
class Block extends BaseBlock {
	/**
	 * Render the block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content Post content.
	 *
	 * @return string
	 */
	public function render( $attributes, $content = '' ) {
		$form = \SureCart::cart()->getForm();
		$mode = \SureCart::cart()->getMode();

		// Stop if no form or mode found as for deletion.
		if ( empty( $form->ID ) || empty( $mode ) ) {
			return '';
		}

		// Don't render if the cart is disabled.
		if ( ! \SureCart::cart()->isCartEnabled() ) {
			return '';
		}

		$icon = '<sc-icon name="' . esc_attr( $attributes['cart_icon'] ?? 'shopping-bag' ) . '"></sc-icon>';

		ob_start(); ?>

		<a href="<?php echo esc_attr( \SureCart::pages()->url( 'checkout' ) ); ?>" class="menu-link <?php echo esc_attr( $this->getClasses( $attributes ) ); ?>" style="<?php echo esc_attr( $this->getStyles( $attributes ) ); ?> line-height: 0;">
			<sc-cart-button
				cart-menu-always-shown='<?php echo esc_attr( wp_validate_boolean( $attributes['cart_menu_always_shown'] ) ? 'true' : 'false' ); ?>'
				form-id='<?php echo esc_attr( $form->ID ); ?>'
				mode='<?php echo esc_attr( $mode ); ?>'>
				<?php
				/**
				 * Allow filtering of the cart menu icon.
				 *
				 * @param string $icon The icon.
				 * @param string $mode The icon position.
				 */
				echo wp_kses_post( apply_filters( 'sc_cart_menu_icon', $icon, 'block' ) ); ?>
			</sc-cart-button>
		</a>

		<?php
		return ob_get_clean();
	}
}
