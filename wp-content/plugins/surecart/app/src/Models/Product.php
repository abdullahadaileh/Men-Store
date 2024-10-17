<?php

namespace SureCart\Models;

use SureCart\Models\Traits\HasCommissionStructure;
use SureCart\Models\Traits\HasImageSizes;
use SureCart\Support\Contracts\PageModel;
use SureCart\Support\Currency;

/**
 * Price model
 */
class Product extends Model implements PageModel {
	use HasImageSizes, HasCommissionStructure;

	/**
	 * Rest API endpoint
	 *
	 * @var string
	 */
	protected $endpoint = 'products';

	/**
	 * Object name
	 *
	 * @var string
	 */
	protected $object_name = 'product';

	/**
	 * Is this cachable?
	 *
	 * @var boolean
	 */
	protected $cachable = true;

	/**
	 * Clear cache when products are updated.
	 *
	 * @var string
	 */
	protected $cache_key = 'products_updated_at';

	/**
	 * Create a new model
	 *
	 * @param array $attributes Attributes to create.
	 *
	 * @return $this|false
	 */
	protected function create( $attributes = [] ) {
		if ( ! wp_is_block_theme() ) {
			$attributes['metadata'] = [
				...$attributes['metadata'] ?? [],
				'wp_template_id' => apply_filters( 'surecart/templates/products/default', 'pages/template-surecart-product.php' ),
			];
		}

		return parent::create( $attributes );
	}

	/**
	 * Image srcset.
	 *
	 * @return string
	 */
	public function getImageSrcsetAttribute() {
		if ( empty( $this->attributes['image_url'] ) ) {
			return '';
		}
		return $this->imageSrcSet( $this->attributes['image_url'] );
	}

	/**
	 * Get the image url for a specific size.
	 *
	 * @param integer $size The size.
	 *
	 * @return string
	 */
	public function getImageUrl( $size = 0 ) {
		if ( empty( $this->attributes['image_url'] ) ) {
			return '';
		}
		return $size ? $this->imageUrl( $this->attributes['image_url'], $size ) : $this->attributes['image_url'];
	}

	/**
	 * Set the prices attribute.
	 *
	 * @param  object $value Array of price objects.
	 * @return void
	 */
	public function setPricesAttribute( $value ) {
		$this->setCollection( 'prices', $value, Price::class );
	}

	/**
	 * Set the product collections attribute
	 *
	 * @param object $value Product collections.
	 * @return void
	 */
	public function setProductCollectionsAttribute( $value ) {
		$this->setCollection( 'product_collections', $value, ProductCollection::class );
	}

	/**
	 * Set the variants attribute.
	 *
	 * @param  object $value Array of price objects.
	 * @return void
	 */
	public function setVariantsAttribute( $value ) {
		$this->setCollection( 'variants', $value, Variant::class );
	}

	/**
	 * Set the product attribute
	 *
	 * @param  string $value Product properties.
	 * @return void
	 */
	public function setPurchaseAttribute( $value ) {
		$this->setRelation( 'purchase', $value, Purchase::class );
	}

	/**
	 * Set the product media attribute
	 *
	 * @param  string $value ProductMedia properties.
	 * @return void
	 */
	public function setProductMediasAttribute( $value ) {
		$this->setCollection( 'product_medias', $value, ProductMedia::class );
	}

	/**
	 * Buy link model
	 *
	 * @return \SureCart\Models\BuyLink
	 */
	public function buyLink() {
		return new BuyLink( $this );
	}

	/**
	 * Checkout Permalink.
	 *
	 * @return string
	 */
	public function getCheckoutPermalinkAttribute() {
		return $this->buyLink()->url();
	}

	/**
	 * Get the product permalink.
	 *
	 * @return string
	 */
	public function getPermalinkAttribute(): string {
		if ( empty( $this->attributes['id'] ) ) {
			return '';
		}
		// permalinks off.
		if ( ! get_option( 'permalink_structure' ) ) {
			return add_query_arg( 'sc_product_page_id', $this->slug, get_home_url() );
		}
		
		// permalinks on.
		return trailingslashit( get_home_url() ) . trailingslashit( \SureCart::settings()->permalinks()->getBase( 'product_page' ) ) . trailingslashit( $this->slug ?? '' );
	}

	/**
	 * Get the page title.
	 *
	 * @return string
	 */
	public function getPageTitleAttribute(): string {
		return $this->metadata->page_title ?? $this->name ?? '';
	}

	/**
	 * Get the meta description.
	 *
	 * @return string
	 */
	public function getMetaDescriptionAttribute(): string {
		return $this->metadata->meta_description ?? $this->description ?? '';
	}

	/**
	 * Return attached active prices.
	 *
	 * @return array
	 */
	public function activePrices() {
		$active_prices = array_values(
			array_filter(
				$this->prices->data ?? [],
				function( $price ) {
					return ! $price->archived;
				}
			)
		);

		usort(
			$active_prices,
			function( $a, $b ) {
				if ( $a->position == $b->position ) {
					return 0;
				}
				return ( $a->position < $b->position ) ? -1 : 1;
			}
		);

		return $active_prices;
	}

	/**
	 * Return attached active prices.
	 */
	public function activeAdHocPrices() {
		return array_filter(
			$this->activePrices() ?? [],
			function( $price ) {
				return $price->ad_hoc;
			}
		);
	}

	/**
	 * Returns the product media image attributes.
	 *
	 * @return object
	 */
	public function getFeaturedMediaAttribute() {
		$featured_product_media = $this->featured_product_media;

		return (object) array(
			'alt'   => $featured_product_media->media->alt ?? $this->title ?? $this->name ?? '',
			'title' => $featured_product_media->media->title ?? '',
			'url'   => $featured_product_media->media->url ?? $this->image_url,
		);
	}

	/**
	 * Get the JSON Schema Array
	 *
	 * @return array
	 */
	public function getJsonSchemaArray(): array {
		$active_prices = (array) $this->activePrices();

		$offers = array_map(
			function( $price ) {
				return [
					'@type'         => 'Offer',
					'price'         => Currency::maybeConvertAmount( $price->amount, $price->currency ),
					'priceCurrency' => $price->currency,
					'availability'  => 'https://schema.org/InStock',
				];
			},
			$active_prices ?? []
		);

		return apply_filters(
			'surecart/product/json_schema',
			[
				'@context'    => 'http://schema.org',
				'@type'       => 'Product',
				'productId'   => $this->sku ?? $this->slug,
				'name'        => $this->name,
				'description' => sanitize_text_field( $this->description ),
				'image'       => $this->image_url ?? '',
				'offers'      => $offers,
				'url'         => $this->permalink,
			],
			$this
		);
	}

	/**
	 * Get the product template id.
	 *
	 * @return string
	 */
	public function getTemplateIdAttribute(): string {
		if ( ! empty( $this->attributes['metadata']->wp_template_id ) ) {
			// we have a php file, switch to default.
			if ( wp_is_block_theme() && false !== strpos( $this->attributes['metadata']->wp_template_id, '.php' ) ) {
				return 'surecart/surecart//single-product';
			}

			// this is acceptable.
			return $this->attributes['metadata']->wp_template_id;
		}
		return 'surecart/surecart//single-product';
	}

	/**
	 * Get with sorted prices.
	 *
	 * @return this
	 */
	public function withSortedPrices() {
		if ( empty( $this->prices->data ) ) {
			return $this;
		}

		$filtered = clone $this;

		// Sort prices by position.
		usort(
			$filtered->prices->data,
			function( $a, $b ) {
				return $a->position - $b->position;
			}
		);

		return $filtered;
	}

	/**
	 * Get product with acgive and sorted prices.
	 *
	 * @return this
	 */
	public function withActivePrices() {
		if ( empty( $this->prices->data ) ) {
			return $this;
		}

		$filtered = clone $this;

		// Filter out archived prices.
		$filtered->prices->data = array_values(
			array_filter(
				$filtered->prices->data ?? [],
				function( $price ) {
					return ! $price->archived;
				}
			)
		);

		return $filtered;
	}

	/**
	 * Get the first variant with stock.
	 *
	 * @return \SureCart\Models\Variant;
	 */
	public function getFirstVariantWithStock() {
		$first_variant_with_stock = $this->variants->data[0] ?? null;

		// stock is enabled.
		if ( $this->stock_enabled ) {
			foreach ( $this->variants->data as $variant ) {
				if ( $variant->available_stock > 0 ) {
					$first_variant_with_stock = $variant;
					break;
				}
			}
		}
		return $first_variant_with_stock;
	}

	/**
	 * Get the product template
	 *
	 * @return \WP_Template
	 */
	public function getTemplateAttribute() {
		return get_block_template( $this->getTemplateIdAttribute() );
	}

	/**
	 * Get the product template id.
	 *
	 * @return string
	 */
	public function getTemplatePartIdAttribute(): string {
		if ( ! empty( $this->attributes['metadata']->wp_template_part_id ) ) {
			return $this->attributes['metadata']->wp_template_part_id;
		}
		return 'surecart/surecart//product-info';
	}

	/**
	 * Get the product template part template.
	 *
	 * @return \WP_Template
	 */
	public function getTemplatePartAttribute() {
		return get_block_template( $this->getTemplatePartIdAttribute(), 'wp_template_part' );
	}

	/**
	 * Get Template Content.
	 *
	 * @return string
	 */
	public function getTemplateContent() : string {
		return wp_is_block_theme() ?
			$this->template->content ?? '' :
			$this->template_part->content ?? '';
	}

	/**
	 * Get the product page initial state
	 *
	 * @param array $args Array of arguments.
	 *
	 * @return array
	 */
	public function getInitialPageState( $args = [] ) {
		$form = \SureCart::forms()->getDefault();

		return wp_parse_args(
			$args,
			[
				'formId'          => $form->ID,
				'mode'            => \SureCart\Models\Form::getMode( $form->ID ),
				'product'         => $this,
				'prices'          => $this->activePrices(),
				'selectedPrice'   => ( $this->activePrices() ?? [] )[0] ?? null,
				'checkoutUrl'     => \SureCart::pages()->url( 'checkout' ),
				'variant_options' => $this->variant_options->data ?? [],
				'variants'        => $this->variants->data ?? [],
				'selectedVariant' => $this->getFirstVariantWithStock() ?? null,
				'isProductPage'   => ! empty( get_query_var( 'surecart_current_product' )->id ),
			]
		);
	}
}
