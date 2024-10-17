<?php

namespace SureCart\Database;

use SureCart\Database\Tables\IncomingWebhook;
use SureCart\Database\Tables\Integrations;
use SureCartCore\ServiceProviders\ServiceProviderInterface;

/**
 * WordPress Users service.
 */
class MigrationsServiceProvider implements ServiceProviderInterface {
	/**
	 * {@inheritDoc}
	 *
	 * @param  \Pimple\Container $container Service Container.
	 */
	public function register( $container ) {
		$container['surecart.tables.integrations'] = function () {
			return new Integrations( new Table() );
		};

		$container['surecart.tables.webhooks.incoming'] = function () {
			return new IncomingWebhook( new Table() );
		};

		$container['surecart.migrations.usermeta'] = function() {
			return new UserMetaMigrationsService();
		};

		$container['surecart.migrations.webhook'] = function() {
			return new WebhookMigrationsService();
		};
	}

	/**
	 * {@inheritDoc}
	 *
	 * @param  \Pimple\Container $container Service Container.
	 */
	public function bootstrap( $container ) {
		$container['surecart.tables.integrations']->install();
		$container['surecart.tables.webhooks.incoming']->install();
		$container['surecart.migrations.usermeta']->bootstrap();
		$container['surecart.migrations.webhook']->bootstrap();
	}
}
