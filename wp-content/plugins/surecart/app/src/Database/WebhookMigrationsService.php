<?php

namespace SureCart\Database;

use SureCart\Models\RegisteredWebhook;

/**
 * Run this migration when version changes or for new installations.
 */
class WebhookMigrationsService extends GeneralMigration {
	/**
	 * The version number when we will run the migration.
	 *
	 * @var string
	 */
	protected $version = '2.4.0';

	/**
	 * Run the migration.
	 *
	 * @return void
	 */
	public function run(): void {
		// Get the registered webhooks.
		$webhook = RegisteredWebhook::get();

		// Stop if webhook is not found or there is some sort of error.
		if ( ! $webhook || is_wp_error( $webhook ) || empty( $webhook->id ) || empty( $webhook->url ) ) {
			return;
		}
		// Update the webhook. This will update the events on the server.
		try {
			RegisteredWebhook::update();
		} catch ( \Exception $exception ) {
			wp_die( 'Webhook migration failed. Error: ' . esc_attr( $exception->getMessage() ) );
		}
	}
}
