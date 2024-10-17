<?php
namespace SureCart\Integrations\RankMath;

use SureCartCore\ServiceProviders\ServiceProviderInterface;

/**
 * Handles the learnDash Service.
 */
class RankMathServiceProvider implements ServiceProviderInterface {
	/**
	 * Register all dependencies in the IoC container.
	 *
	 * @param \Pimple\Container $container Service container.
	 * @return void
	 */
	public function register( $container ) {
		$container['surecart.rankmath'] = function () {
			return new RankMathService();
		};
	}

	/**
	 * {@inheritDoc}
	 *
	 * @param  \Pimple\Container $container Service Container.
	 */
	public function bootstrap( $container ) {
		$container['surecart.rankmath']->bootstrap();
	}
}
