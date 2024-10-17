<!-- wp:surecart/columns {"isFullHeight":true,"style":{"spacing":{"blockGap":{"top":"0px","left":"0px"}}}} -->
<sc-columns is-stacked-on-mobile="1" is-full-height class="is-layout-constrained is-horizontally-aligned-right is-full-height" style="gap:0px 0px;"><!-- wp:surecart/column {"layout":{"type":"constrained","contentSize":"550px","justifyContent":"right"},"width":"","style":{"spacing":{"padding":{"top":"100px","right":"100px","bottom":"100px","left":"100px"},"blockGap":"30px"},"border":{"width":"0px","style":"none"},"color":{"background":"#fafafa"}}} -->
	<sc-column class="wp-block-surecart-column is-layout-constrained is-horizontally-aligned-right" style="border-style:none;border-width:0px;padding:30px 5rem 5rem 5rem;--sc-column-content-width:450px;--sc-form-row-spacing:30px">

		<?php if ( $show_image && ! empty( $product->product_medias->data ) ) : ?>
			<?php if ( count( $product->product_medias->data ) > 1 ) : ?>
				<sc-image-slider id="sc-product-media-<?php echo esc_attr( esc_attr( $product->id ) ); ?>" style="--sc-product-slider-height: 310px;"></sc-image-slider>
				<?php
				\SureCart::assets()->addComponentData(
					'sc-image-slider',
					'#sc-product-media-' . $product->id,
					array(
						'hasThumbnails' => true,
						'images'        => array_map(
							function ( $product_media ) use ( $product ) {
								return array(
									'src'   => $product_media->getUrl( 450 ),
									'alt'   => esc_attr( $product_media->media->alt ?? $product_media->media->filename ?? $product->name ?? '' ),
									'width' => 450,
								);
							},
							$product->product_medias->data
						),
						'thumbnails'    => array_map(
							function ( $product_media ) use ( $product ) {
								return array(
									'src'    => $product_media->getUrl( 90 ),
									'srcset' => $product_media->getSrcset( array( 90, 120, 240 ) ),
									'sizes'  => '(min-width: 780px) 90px, 13vw', // 13vw = 13% of the viewport width because of 5 thumbnails per page, plus spacing for arrows.
									'alt'    => esc_attr( $product_media->media->alt ?? $product_media->media->filename ?? $product->name ?? '' ),
									'width'  => 90,
								);
							},
							$product->product_medias->data
						),
					)
				);
				?>
			<?php else : ?>
				<!-- wp:image {"sizeSlug":"full","linkDestination":"none","style":{"border":{"radius":"5px"}}} -->
					<figure class="wp-block-image size-full is-resized has-custom-border">
						<img src="<?php echo esc_url( $product->product_medias->data[0]->getUrl( 450 ) ); ?>" alt="<?php echo esc_attr( $product->featured_media->alt ); ?>" title="<?php echo esc_attr( $product->featured_media->title ); ?>"  style="border-radius:5px" />
					</figure>
				<!-- /wp:image -->
			<?php endif; ?>
		<?php endif; ?>

		<sc-text style="--font-size: var(--sc-font-size-x-large); font-weight: var(--sc-font-weight-bold); --line-height: 1" aria-label="<?php echo esc_attr_e( 'Product name', 'surecart' ); ?>">
			<?php echo wp_kses_post( $product->name ); ?>
		</sc-text>

		<sc-product-selected-price product-id="<?php echo esc_attr( $product->id ); ?>"></sc-product-selected-price>

		<?php if ( $show_description ) : ?>
			<sc-prose>
				<span class="screen-reader-text"><?php echo esc_attr_e( 'Product description', 'surecart' ); ?></span>
				<?php echo wp_kses_post( $product->description ?? '' ); ?>
			</sc-prose>
		<?php endif; ?>

		<div>
		<sc-checkout-product-price-variant-selector label="<?php esc_attr_e( 'Pricing', 'surecart' ); ?>" id="sc-product-price-variant-selector-<?php echo esc_attr( esc_attr( $product->id ) ); ?>"></sc-checkout-product-price-variant-selector>
		<?php
		\SureCart::assets()->addComponentData(
			'sc-checkout-product-price-variant-selector',
			'#sc-product-price-variant-selector-' . $product->id,
			array(
				'product' => $product->toArray(),
			)
		);
		?>
		</div>

	</sc-column>
	<!-- /wp:surecart/column -->

	<!-- wp:surecart/column {"layout":{"type":"constrained","contentSize":"550px","justifyContent":"left"},"backgroundColor":"ast-global-color-5","style":{"spacing":{"padding":{"top":"100px","right":"100px","bottom":"100px","left":"100px"},"blockGap":"30px"}}} -->
	<sc-column class="wp-block-surecart-column is-layout-constrained is-horizontally-aligned-left" style="padding:30px 5rem 5rem 5rem;--sc-column-content-width:450px;--sc-form-row-spacing:30px">
		<!-- wp:surecart/checkout-errors -->
			<sc-checkout-form-errors></sc-checkout-form-errors>
		<!-- /wp:surecart/checkout-errors -->

		<!-- wp:surecart/email {"placeholder":"<?php esc_attr_e( 'Your email address', 'surecart' ); ?>","label":"<?php esc_attr_e( 'Email', 'surecart' ); ?>"} /-->

		<!-- wp:surecart/name {"required":true,"placeholder":"<?php esc_attr_e( 'Your name', 'surecart' ); ?>"} -->
		<sc-customer-name label="<?php esc_attr_e( 'Name', 'surecart' ); ?>" placeholder="<?php esc_attr_e( 'Your name', 'surecart' ); ?>" required></sc-customer-name>
		<!-- /wp:surecart/name -->

		<!-- wp:surecart/payment {"label":"<?php esc_attr_e( 'Payment', 'surecart' ); ?>"} --><!-- /wp:surecart/payment -->

		<sc-order-bumps label="<?php esc_attr_e( 'Recommended', 'surecart' ); ?>"></sc-order-bumps>

		<?php if ( $show_coupon ) : ?>
			<!-- wp:surecart/coupon {"text":"<?php esc_attr_e( 'Coupon Code', 'surecart' ); ?>","collapsed":false,"placeholder":"<?php esc_attr_e( 'Enter coupon code', 'surecart' ); ?>","button_text":"<?php esc_attr_e( 'Apply', 'surecart' ); ?>"} /-->
		<?php endif; ?>

		<sc-order-summary collapsible="true" collapsed="true" closed-text="<?php esc_attr_e( 'Total', 'surecart' ); ?>" open-text="<?php esc_attr_e( 'Total', 'surecart' ); ?>">

			<sc-divider></sc-divider>

			<sc-line-items removable="false" editable="true" class="wp-block-surecart-line-items"></sc-line-items>

			<sc-divider></sc-divider>

			<!-- wp:surecart/subtotal -->
			<sc-line-item-total total="subtotal" class="wp-block-surecart-subtotal">
				<span slot="description"><?php esc_html_e( 'Subtotal', 'surecart' ); ?></span>
			</sc-line-item-total>
			<!-- /wp:surecart/subtotal -->

			<!-- wp:surecart/tax-line-item -->
			<sc-line-item-tax class="wp-block-surecart-tax-line-item"></sc-line-item-tax>
			<!-- /wp:surecart/tax-line-item -->

			<!-- wp:surecart/total -->
			<sc-line-item-total total="total" size="large" show-currency="1" class="wp-block-surecart-total">
				<span slot="title"><?php esc_html_e( 'Total', 'surecart' ); ?></span>
				<span slot="subscription-title"><?php esc_html_e( 'Total Due Today', 'surecart' ); ?></span>
				<span slot="due-amount-description"><?php esc_html_e( 'Total Due', 'surecart' ); ?></span>
			</sc-line-item-total>
			<!-- /wp:surecart/total -->
		</sc-order-summary>

		<?php if ( $show_terms && $terms_text ) : ?>
			<sc-checkbox name="terms_and_privacy" value="accepted" required><?php echo wp_kses_post( $terms_text ); ?></sc-checkbox>
		<?php endif; ?>

		<!-- wp:surecart/submit {"text":"<?php esc_attr_e( 'Purchase', 'surecart' ); ?>","show_total":true,"full":true} -->
		<sc-order-submit type="primary" full="true" size="large" icon="lock" show-total="true" class="wp-block-surecart-submit">
			<?php esc_html_e( 'Purchase', 'surecart' ); ?>
		</sc-order-submit>
		<!-- /wp:surecart/submit --></sc-column>
	<!-- /wp:surecart/column --></sc-columns>
<!-- /wp:surecart/columns -->
