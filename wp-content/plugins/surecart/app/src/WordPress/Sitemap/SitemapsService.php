<?php

namespace SureCart\WordPress\Sitemap;

/**
 * Handles sitemapping for the plugin.
 */
class SitemapsService {
	/**
	 * Bootstrap the service.
	 *
	 * @return void
	 */
	public function bootstrap() {
		add_filter(
			'init',
			function() {
				wp_register_sitemap_provider( 'products', new ProductSiteMap() );
				wp_register_sitemap_provider( 'collections', new ProductCollectionSiteMap() );
			}
		);
	}
}
