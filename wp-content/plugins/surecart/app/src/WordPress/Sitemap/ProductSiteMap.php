<?php
/**
 * Sitemaps: ProductSiteMap class
 *
 * Builds the sitemaps for our product object type.
 */

namespace SureCart\WordPress\Sitemap;

use SureCart\Models\Product;

/**
 * XML sitemap provider.
 */
class ProductSiteMap extends \WP_Sitemaps_Provider {
	/**
	 * WP_Sitemaps_Users constructor.
	 */
	public function __construct() {
		$this->name        = 'products';
		$this->object_type = 'product';
	}

	/**
	 * Gets a URL list for a user sitemap.
	 *
	 * @param int    $page_num       Page of results.
	 * @param string $object_subtype Optional. Not applicable for Users but
	 *                               required for compatibility with the parent
	 *                               provider class. Default empty.
	 * @return array[] Array of URL information for a sitemap.
	 */
	public function get_url_list( $page_num, $object_subtype = '' ) {
		/**
		 * Filters the users URL list before it is generated.
		 *
		 * Returning a non-null value will effectively short-circuit the generation,
		 * returning that value instead.
		 *
		 * @param array[]|null $url_list The URL list. Default null.
		 * @param int        $page_num Page of results.
		 */
		$url_list = apply_filters(
			'wp_sitemaps_sc_products_pre_url_list',
			null,
			$page_num
		);

		if ( null !== $url_list ) {
			return $url_list;
		}

		$products = $this->get_products( $page_num );

		if ( is_wp_error( $products ) ) {
			return [];
		}

		foreach ( $products->data as $product ) {
			$sitemap_entry = array(
				'loc' => $product->permalink,
			);

			/**
			 * Filters the sitemap entry for an individual product.
			 *
			 * @param array   $sitemap_entry Sitemap entry for the user.
			 * @param \SureCart\Models\Product $product          Product object.
			 */
			$sitemap_entry = apply_filters( 'wp_sitemaps_sc_products_entry', $sitemap_entry, $product );
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
	public function get_max_num_pages( $object_subtype = '' ) {
		/**
		 * Filters the max number of pages for a user sitemap before it is generated.
		 *
		 * Returning a non-null value will effectively short-circuit the generation,
		 * returning that value instead.
		 *
		 * @param int|null $max_num_pages The maximum number of pages. Default null.
		 */
		$max_num_pages = apply_filters( 'wp_sitemaps_sc_products_pre_max_num_pages', null );

		if ( null !== $max_num_pages ) {
			return $max_num_pages;
		}

		$products = $this->get_products( 1 );

		if ( is_wp_error( $products ) ) {
			return 1;
		}

		$total_products = $products->pagination->count;

		return (int) ceil( $total_products / $this->get_max_urls() );
	}

	/**
	 * Get products
	 *
	 * @param integer $page_num The page number.
	 *
	 * @return Collection
	 */
	protected function get_products( $page_num ) {
		$args = $this->get_products_query_args();

		return Product::where( $args )->paginate(
			[
				'page'     => $page_num,
				'per_page' => $this->get_max_urls(),
			]
		);
	}

	/**
	 * Returns the query args for retrieving users to list in the sitemap.
	 *
	 * @return array Array of WP_User_Query arguments.
	 */
	protected function get_products_query_args() {
		/**
		 * Filters the query arguments for authors with public posts.
		 *
		 * Allows modification of the authors query arguments before querying.
		 *
		 * @see WP_User_Query for a full list of arguments
		 *
		 * @param array $args Array of WP_User_Query arguments.
		 */
		$args = apply_filters(
			'wp_sitemaps_sc_products_query_args',
			array(
				'status' => [ 'published' ],
				'archived' => false,
			)
		);

		return $args;
	}

	/**
	 * We need to change this since 100 is the max.
	 *
	 * @return integer
	 */
	protected function get_max_urls() {
		return apply_filters( 'wp_sitemaps_max_urls', 100, 'sc_product' );
	}
}
