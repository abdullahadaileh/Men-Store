<?php

namespace SureCart\Integrations\RankMath;

defined( 'ABSPATH' ) || exit;

/**
 * Controls the Product Sitemap integration.
 */
class CollectionSiteMap implements \RankMath\Sitemap\Providers\Provider {
	/**
	 * What type of content this provider handles.
	 *
	 * @param string $type Type of content.
	 */
	public function handles_type( $type ) {
		return 'sc_collection' === $type;
	}

	/**
	 * Get the index links.
	 *
	 * @param int $max_entries Maximum number of entries per sitemap.
	 *
	 * @return array
	 */
	public function get_index_links( $max_entries ) {
		return [
			[
				'loc'     => \RankMath\Sitemap\Router::get_base_url( 'sc_collection-sitemap.xml' ),
				'lastmod' => date( 'c', time() ),
			],
		];
	}

	/**
	 * Get the sitemap links.
	 *
	 * @param string $type Type of content.
	 * @param int    $max_entries Maximum number of entries per sitemap.
	 * @param int    $current_page Current page.
	 *
	 * @return array
	 */
	public function get_sitemap_links( $type, $max_entries, $current_page ) {
		// get products.
		$collection = \SureCart\Models\ProductCollection::where( [ 'status' => 'published' ] )->paginate(
			[
				'page'     => $current_page,
				'per_page' => $max_entries,
			]
		);

		$links = array_map(
			function( $collection ) {
				$lastmod     = new \DateTime( '@' . $collection->updated_at );
				$lastmod_w3c = $lastmod->format( 'c' );
				return [
					'loc' => $collection->permalink,
					'mod' => $lastmod_w3c,
				];
			},
			$collection->data
		);

		return $links;
	}
}
