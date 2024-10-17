<?php

namespace SureCart\Cart;

use SureCart\Models\Form;

/**
 * The cart service.
 */
class CartService {
	/**
	 * Bootstrap the cart.
	 *
	 * @return void
	 */
	public function bootstrap() {
		add_filter( 'wp_nav_menu_items', array( $this, 'addCartMenu' ), 10, 2 );

		// only load scripts if cart is enabled.
		if ( $this->isCartEnabled() ) {
			add_action(
				'wp_enqueue_scripts',
				function () {
					\SureCart::assets()->enqueueComponents();
				}
			);

			$form = $this->getForm();
			if ( empty( $form->ID ) ) {
				return;
			}
			$state = sc_initial_state();

			if ( empty( $state['checkout']['formId'] ) ) {
				sc_initial_state(
					array_filter(
						array(
							'checkout' => array(
								'formId'  => $form->ID,
								'mode'    => Form::getMode( $form->ID ),
								'persist' => 'browser',
							),
						)
					)
				);
			}
			add_action( 'wp_footer', array( $this, 'renderCartComponent' ) );
		}
	}

	/**
	 * Get the icon name saved in the settings
	 *
	 * @return string
	 */
	public function getIconNameFromSettings() {
		return get_option( 'surecart_cart_icon', 'shopping-bag' );
	}

	/**
	 * Get the icon.
	 *
	 * @param 'menu'|'floating' $type Menu type.
	 *
	 * @return string
	 */
	public function getIcon( $type ) {
		$icon = '<sc-icon name="' . $this->getIconNameFromSettings() . '"></sc-icon>';

		/**
		 * Allow filtering of the cart menu icon.
		 *
		 * @param string $icon The icon.
		 * @param string $mode The icon position.
		 */
		return apply_filters( 'sc_cart_menu_icon', $icon, $type );
	}


	/**
	 * Get selected ids.
	 *
	 * @return array|false
	 */
	public function getSelectedIds() {
		return get_option( 'surecart_cart_menu_selected_ids', false );
	}

	/**
	 * Get icon type.
	 *
	 * @return array|false
	 */
	public function getIconType() {
		return get_option( 'surecart_cart_icon_type', 'floating_icon' );
	}

	/**
	 * Check if cart menu is always shown.
	 *
	 * @return boolean
	 */
	public function isAlwaysShown() {
		return (bool) get_option( 'surecart_cart_menu_always_shown', true );
	}

	/**
	 * Is the cart enabled?
	 */
	public function isCartEnabled() {
		return ! (bool) get_option( 'sc_slide_out_cart_disabled', false );
	}

	/**
	 * Get cart menu alignment.
	 *
	 * @return 'left'|'right
	 */
	public function getAlignment() {
		return (string) get_option( 'surecart_cart_menu_alignment', 'right' );
	}

	/**
	 * Get mode.
	 *
	 * @return string
	 */
	public function getMode() {
		$form = $this->getForm();
		return Form::getMode( $form->ID );
	}

	/**
	 * Add cart to menu.
	 *
	 * @param array  $items Menu items.
	 * @param object $args Menu args.
	 *
	 * @return array
	 */
	public function addCartMenu( $items, $args ) {
		$menu = wp_get_nav_menu_object( $args->menu );
		$id   = $menu ? $menu->term_id : false;

		// if there is no id, or the menu icon is not enabled, or the cart is disabled, return.
		if ( ! $id || ! $this->isMenuIconEnabled( $id ) || ! $this->isCartEnabled() ) {
			return $items;
		}

		$cart_menu_alignment = $this->getAlignment();

		$menu = $this->menuItemTemplate();

		// left or right.
		$items = 'right' === $cart_menu_alignment ? $items . $menu : $menu . $items;

		return $items;
	}

	public function menuItemTemplate() {
		$form = $this->getForm();
		$mode = $this->getMode();

		ob_start(); ?>
			<li class='menu-item'>
				<a href="<?php echo esc_attr( \SureCart::pages()->url( 'checkout' ) ); ?>" class="menu-link" tabindex="-1">
					<sc-cart-button
						cart-menu-always-shown='<?php echo esc_attr( $this->isAlwaysShown() ? 'true' : 'false' ); ?>'
						form-id='<?php echo esc_attr( $form->ID ); ?>'
						mode='<?php echo esc_attr( $mode ); ?>'>
						<?php echo wp_kses_post( $this->getIcon( 'menu' ) ); ?>
					</sc-cart-button>
				</a>
			</li>
		<?php
		return ob_get_clean();
	}

	/**
	 * Get the cart template.
	 *
	 * @return string
	 */
	public function cartTemplate() {
		$form = $this->getForm();
		if ( empty( $form->ID ) ) {
			return '';
		}

		// get cart block.
		$template = get_block_template( 'surecart/surecart//cart', 'wp_template_part' );
		if ( empty( $template->content ) ) {
			return;
		}

		// get first block attributes.
		$template_blocks    = parse_blocks( $template->content );
		$post_content_block = wp_get_first_block( $template_blocks, 'surecart/cart' );
		$attributes         = isset( $post_content_block['attrs'] ) ? $post_content_block['attrs'] : array();

		ob_start();
		?>

		<sc-cart
			id="sc-cart"
			header="<?php esc_attr_e( 'Cart', 'surecart' ); ?>"
			checkout-link="<?php echo esc_attr( \SureCart::pages()->url( 'checkout' ) ); ?>"
			style="font-size: 16px; --sc-z-index-drawer: 999999; --sc-drawer-size: <?php echo esc_attr( $attributes['width'] ?? '500px' ); ?>"
		>
			<?php
			echo wp_kses_post( do_blocks( $template->content ) );
			?>
		</sc-cart>

		<?php if ( $this->isFloatingIconEnabled() ) : ?>
			<sc-cart-icon style="font-size: 16px">
				<?php echo wp_kses_post( $this->getIcon( 'floating' ) ); ?>
			</sc-cart-icon>
		<?php endif; ?>

		<?php
		return trim( preg_replace( '/\s+/', ' ', ob_get_clean() ) );
	}

	/**
	 * Render the cart components.
	 *
	 * @return void
	 */
	public function renderCartComponent() {
		$form = $this->getForm();
		if ( empty( $form->ID ) ) {
			return;
		}
		$template = $this->cartTemplate();
		$state    = sc_initial_state();

		if ( empty( $state['checkout']['formId'] ) ) {
			sc_initial_state(
				array_filter(
					array(
						'checkout' => array(
							'formId' => $form->ID,
						),
					)
				)
			);
		}
		?>

		<sc-cart-loader
			template='<?php echo esc_attr( $template ); ?>'>
		</sc-cart-loader>
		<?php
	}

	/**
	 * Get the form post.
	 *
	 * @return \WP_Post The default form post.
	 */
	public function getForm() {
		return \SureCart::forms()->getDefault();
	}

	/**
	 * Check if floating cart icon is enabled
	 *
	 * @return string
	 */
	public function isFloatingIconEnabled() {
		$cart_icon_type = (string) get_option( 'surecart_cart_icon_type', 'floating_icon' );
		return in_array( $cart_icon_type, array( 'floating_icon', 'both' ) );
	}

	/**
	 * Check if menu cart icon is enabled
	 *
	 * @param integer $term_id Term ID.
	 * @return bool
	 */
	public function isMenuIconEnabled( $term_id ) {
		$cart_menu_ids  = (array) $this->getSelectedIds();
		$cart_icon_type = (string) $this->getIconType();
		if ( ! in_array( $cart_icon_type, array( 'menu_icon', 'both' ) ) ) {
			return;
		}
		return in_array( $term_id, $cart_menu_ids );
	}

	/**
	 * Remove deprecated cart content.
	 *
	 * @param string $content Cart content.
	 *
	 * @return string
	 */
	public static function removeDeprecatedCartContent( $content ) {
		$review_cart_present = strpos( $content, 'wp:surecart/cart-header {"text":"Review Your Cart"' );
		$my_cart_present     = strpos( $content, '<sc-cart-header><span>My Cart</span></sc-cart-header>' );

		if ( false !== $review_cart_present && false !== $my_cart_present ) {
			$content = str_replace( '<sc-cart-header><span>My Cart</span></sc-cart-header>', '<sc-cart-header><span>Review Your Cart</span></sc-cart-header>', $content );
		}

		return $content;
	}
}
