<?php
/**
 * Upgrade Notice service.
 *
 * @package   SureCartAppCore
 * @author    SureCart <support@surecart.com>
 * @copyright  SureCart
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0
 * @link      https://surecart.com
 */

namespace SureCart\WordPress;

use SureCartCore\Application\Application;

/**
 * Main communication channel with the theme.
 */
class UpgradeNoticeService {
	/**
	 * Application instance.
	 *
	 * @var Application
	 */
	protected $app = null;

	/**
	 * List of versions to show the update notice.
	 *
	 * @var array
	 */
	public $show_update_notice_versions = [
		'3.0.0',
	];

	/**
	 * Constructor.
	 *
	 * @param Application $app Application instance.
	 */
	public function __construct( $app ) {
		$this->app = $app;
	}

	/**
	 * Bootstrap the plugin.
	 *
	 * @return void
	 */
	public function bootstrap() {
		add_action( 'in_plugin_update_message-' . SURECART_PLUGIN_BASE, array( $this, 'updateMessage' ) );
	}

	/**
	 * Should show update notice?
	 *
	 * @param string $new_version Plugin new version.
	 *
	 * @return boolean
	 */
	public function shouldShowUpdateNotice( $new_version ) {
		$highest_version = max( $this->show_update_notice_versions );
		return version_compare( $new_version, $highest_version, '>=' );
	}

	/**
	 * Display the update message.
	 *
	 * @param array $plugin_data Plugin data.
	 *
	 * @return void
	 */
	public function updateMessage( $plugin_data ) {
		if ( ! $this->shouldShowUpdateNotice( $plugin_data['new_version'] ) ) {
			return;
		}

		// Enqueue the plugin upgrade notice styles.
		wp_enqueue_style( 'surecart-plugin-upgrade-notice', plugins_url( 'styles/plugin-upgrade-notice.css', SURECART_PLUGIN_FILE ), '', $this->plugin()->version(), 'all' );

		// Display the update warning if the condition is met.
		$this->versionUpdateWarning();
	}

	/**
	 * Display a warning if the plugin version has changed.
	 *
	 * @return void
	 */
	public function versionUpdateWarning() {
		?>
		<hr class="sc-major-update-warning__separator" />
		<div class="sc-major-update-warning">
			<div class="sc-major-update-warning__icon">
				<span class="dashicons dashicons-info"></span>
			</div>
			<div>
				<div class="sc-major-update-warning__title">
					<?php echo esc_html__( 'Important: Backup Your Site Before Updating!', 'surecart' ); ?>
				</div>
				<div class="sc-major-update-warning__message">
					<?php
					echo wpautop(
						sprintf(
							/* translators: %1$s Link open tag, %2$s: Link close tag. */
							esc_html__( 'To ensure a smooth update, please %1$sbackup your site%2$s before proceeding. For the safest experience, perform the update in a staging environment first. This helps prevent any unexpected issues and ensures your site remains up and running smoothly.', 'surecart' ),
							'<strong>',
							'</strong>'
						)
					);
					?>
				</div>
			</div>
		</div>
		<?php
	}

	/**
	 * Shortcut to \SureCart\WordPress\PluginService
	 *
	 * @return \SureCart\WordPress\PluginService
	 */
	public function plugin() {
		return $this->app->resolve( 'surecart.plugin' );
	}
}
