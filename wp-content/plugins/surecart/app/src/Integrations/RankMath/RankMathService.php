<?php

namespace SureCart\Integrations\RankMath;

/**
 * Controls the MemberPress integration.
 */
class RankMathService {
	/**
	 * Bootstrap the service.
	 *
	 * @return void
	 */
	public function bootstrap() {
		add_filter( 'rank_math/sitemap/providers', [ $this, 'addProviders' ] );
	}

	/**
	 * Add the providers.
	 *
	 * @param array $external_providers External providers.
	 *
	 * @return array
	 */
	public function addProviders( $external_providers ) {
		if ( ! empty( \RankMath\Helper::get_settings( 'sitemap.pt_sc_product_sitemap' ) ) ) {
			$external_providers['product'] = new ProductSiteMap();
		}

		if ( ! empty( \RankMath\Helper::get_settings( 'sitemap.pt_sc_collection_sitemap' ) ) ) {
			$external_providers['collection'] = new CollectionSiteMap();
		}

		return $external_providers;
	}
}
