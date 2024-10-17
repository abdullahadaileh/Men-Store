<?php

declare(strict_types=1);

/**
 * Sitemaps: ProductCollectionSiteMap class
 *
 * Builds the sitemaps for our product collection object type.
 */

namespace SureCart\WordPress\Sitemap;

use SureCart\Models\ProductCollection;
use SureCartVendors\PluginEver\QueryBuilder\Collection;

/**
 * Product Collection XML sitemap provider.
 */
class ProductCollectionSiteMap extends \WP_Sitemaps_Provider {
	/**
	 * ProductCollectionSiteMap constructor.
	 */
	public function __construct() {
		$this->name = 'collections';
	}

	/**
	 * Gets a URL list for a product collection sitemap.
	 *
	 * @param int    $page_num       Page of results.
	 * @param string $object_subtype Optional. Not applicable for Users but
	 *                               required for compatibility with the parent
	 *                               provider class. Default empty.
	 * @return array[] Array of URL information for a sitemap.
	 */
	public function get_url_list( $page_num, $object_subtype = '' ): array {
		/**
		 * Filters the product collections URL list before it is generated.
		 *
		 * Returning a non-null value will effectively short-circuit the generation,
		 * returning that value instead.
		 *
		 * @param array[]|null $url_list The URL list. Default null.
		 * @param int        $page_num Page of results.
		 */
		$url_list = apply_filters(
			'wp_sitemaps_sc_product_collections_pre_url_list',
			null,
			$page_num
		);

		if ( null !== $url_list ) {
			return $url_list;
		}

		$product_collections = $this->get_product_collections( $page_num );

		if ( is_wp_error( $product_collections ) ) {
			return [];
		}

		foreach ( $product_collections->data as $product_collection ) {
			$sitemap_entry = array(
				'loc' => $product_collection->permalink,
			);

			/**
			 * Filters the sitemap entry for an individual product collection.
			 *
			 * @param array             $sitemap_entry Sitemap entry for the product collection.
			 * @param ProductCollection $product_collection Product collection object.
			 */
			$sitemap_entry = apply_filters( 'wp_sitemaps_sc_product_collections_entry', $sitemap_entry, $product_collection );
			$url_list[]    = $sitemap_entry;
		}

		return $url_list;
	}

	/**
	 * Gets the max number of pages available for the object type.
	 *
	 * @see WP_Sitemaps_Provider::max_num_pages
	 *
	 * @param string $object_subtype Optional. Not applicable for Users but
	 *                               required for compatibility with the parent
	 *                               provider class. Default empty.
	 * @return int Total page count.
	 */
	public function get_max_num_pages( $object_subtype = '' ): int {
		/**
		 * Filters the max number of pages for a product collection sitemap before it is generated.
		 *
		 * Returning a non-null value will effectively short-circuit the generation,
		 * returning that value instead.
		 *
		 * @param int|null $max_num_pages The maximum number of pages. Default null.
		 */
		$max_num_pages = apply_filters( 'wp_sitemaps_sc_product_collections_pre_max_num_pages', null );

		if ( null !== $max_num_pages ) {
			return $max_num_pages;
		}

		$product_collections = $this->get_product_collections( 1 );

		if ( is_wp_error( $product_collections ) ) {
			return 1;
		}

		$total_product_collections = $product_collections->pagination->count;

		return (int) ceil( $total_product_collections / $this->get_max_urls() );
	}

	/**
	 * Get product collections.
	 *
	 * @param int $page_num The page number.
	 *
	 * @return Collection | mixed
	 */
	protected function get_product_collections( int $page_num ) {
		$args = $this->get_product_collections_query_args();

		return ProductCollection::where( $args )->paginate(
			[
				'page'     => $page_num,
				'per_page' => $this->get_max_urls(),
			]
		);
	}

	/**
	 * Returns the query args for retrieving product collections to list in the sitemap.
	 *
	 * @return array Array of query arguments.
	 */
	protected function get_product_collections_query_args(): array {
		/**
		 * Filters the query arguments for product collection model.
		 *
		 * Allows modification of the product collections query arguments before querying.
		 *
		 * @param array $args Array of query arguments.
		 */
		$args = apply_filters(
			'wp_sitemaps_sc_product_collections_query_args',
			[]
		);

		return $args;
	}

	/**
	 * We need to change this since 100 is the max.
	 *
	 * @return integer
	 */
	protected function get_max_urls(): int {
		return apply_filters( 'wp_sitemaps_max_urls', 100, $this->object_type );
	}
}
