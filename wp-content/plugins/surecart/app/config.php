<?php
/**
 * Configuration. Based on WPEmerge config:
 *
 * @link https://docs.wpemerge.com/#/framework/configuration
 *
 * @package SureCart
 */

return [
	/**
	 * Array of service providers you wish to enable.
	 */
	'providers'              => [
		\SureCartAppCore\AppCore\AppCoreServiceProvider::class,
		\SureCartAppCore\Config\ConfigServiceProvider::class,
		\SureCart\Support\UtilityServiceProvider::class,
		\SureCart\Database\MigrationsServiceProvider::class,
		\SureCart\Database\UpdateMigrationServiceProvider::class,
		\SureCart\Account\AccountServiceProvider::class,
		\SureCart\WordPress\PluginServiceProvider::class,
		\SureCart\WordPress\TranslationsServiceProvider::class,
		\SureCart\WordPress\ThemeServiceProvider::class,
		\SureCart\WordPress\Templates\TemplatesServiceProvider::class,
		\SureCart\WordPress\Pages\PageServiceProvider::class,
		\SureCart\WordPress\Posts\PostServiceProvider::class,
		\SureCart\WordPress\Users\UsersServiceProvider::class,
		\SureCart\WordPress\Admin\Profile\UserProfileServiceProvider::class,
		\SureCart\WordPress\PostTypes\FormPostTypeServiceProvider::class,
		\SureCart\WordPress\Assets\AssetsServiceProvider::class,
		\SureCart\WordPress\Shortcodes\ShortcodesServiceProvider::class,
		\SureCart\WordPress\Admin\Menus\AdminMenuPageServiceProvider::class,
		\SureCart\WordPress\Admin\Notices\AdminNoticesServiceProvider::class,
		\SureCart\WordPress\CLI\CLIServiceProvider::class,
		\SureCartAppCore\Assets\AssetsServiceProvider::class,
		\SureCart\Routing\PermalinkServiceProvider::class,
		\SureCart\Routing\RouteConditionsServiceProvider::class,
		\SureCart\Routing\AdminRouteServiceProvider::class,
		\SureCart\Permissions\RolesServiceProvider::class,
		\SureCart\Settings\SettingsServiceProvider::class,
		\SureCart\Request\RequestServiceProvider::class,
		\SureCart\View\ViewServiceProvider::class,
		\SureCart\Cart\CartServiceProvider::class,
		\SureCart\Webhooks\WebhooksServiceProvider::class,
		\SureCart\BlockLibrary\BlockServiceProvider::class,
		\SureCart\Support\Errors\ErrorsServiceProvider::class,
		\SureCart\Activation\ActivationServiceProvider::class,
		\SureCart\Background\BackgroundServiceProvider::class,

		// REST providers.
		\SureCart\Rest\SiteHealthRestServiceProvider::class,
		\SureCart\Rest\AbandonedCheckoutRestServiceProvider::class,
		\SureCart\Rest\AbandonedCheckoutProtocolRestServiceProvider::class,
		\SureCart\Rest\BlockPatternsRestServiceProvider::class,
		\SureCart\Rest\AccountRestServiceProvider::class,
		\SureCart\Rest\BrandRestServiceProvider::class,
		\SureCart\Rest\BumpRestServiceProvider::class,
		\SureCart\Rest\UpsellFunnelRestServiceProvider::class,
		\SureCart\Rest\UpsellRestServiceProvider::class,
		\SureCart\Rest\FulfillmentRestServiceProvider::class,
		\SureCart\Rest\LoginRestServiceProvider::class,
		\SureCart\Rest\PurchasesRestServiceProvider::class,
		\SureCart\Rest\StatisticRestServiceProvider::class,
		\SureCart\Rest\IntegrationsRestServiceProvider::class,
		\SureCart\Rest\IncomingWebhooksRestServiceProvider::class,
		\SureCart\Rest\RegisteredWebhookRestServiceProvider::class,
		\SureCart\Rest\IntegrationProvidersRestServiceProvider::class,
		\SureCart\Rest\CancellationActRestServiceProvider::class,
		\SureCart\Rest\CancellationReasonRestServiceProvider::class,
		\SureCart\Rest\CustomerRestServiceProvider::class,
		\SureCart\Rest\PaymentMethodsRestServiceProvider::class,
		\SureCart\Rest\ProcessorRestServiceProvider::class,
		\SureCart\Rest\ManualPaymentMethodsRestServiceProvider::class,
		\SureCart\Rest\PaymentIntentsRestServiceProvider::class,
		\SureCart\Rest\ProductsRestServiceProvider::class,
		\SureCart\Rest\ProductGroupsRestServiceProvider::class,
		\SureCart\Rest\ProductCollectionsRestServiceProvider::class,
		\SureCart\Rest\PriceRestServiceProvider::class,
		\SureCart\Rest\CouponRestServiceProvider::class,
		\SureCart\Rest\PromotionRestServiceProvider::class,
		\SureCart\Rest\UploadsRestServiceProvider::class,
		\SureCart\Rest\BalanceTransactionRestServiceProvider::class,
		\SureCart\Rest\ChargesRestServiceProvider::class,
		\SureCart\Rest\RefundsRestServiceProvider::class,
		\SureCart\Rest\DownloadRestServiceProvider::class,
		\SureCart\Rest\LicenseRestServiceProvider::class,
		\SureCart\Rest\LineItemsRestServiceProvider::class,
		\SureCart\Rest\ActivationRestServiceProvider::class,
		\SureCart\Rest\AffiliationProtocolRestServiceProvider::class,
		\SureCart\Rest\MediaRestServiceProvider::class,
		\SureCart\Rest\SubscriptionRestServiceProvider::class,
		\SureCart\Rest\SubscriptionProtocolRestServiceProvider::class,
		\SureCart\Rest\PeriodRestServiceProvider::class,
		\SureCart\Rest\SettingsRestServiceProvider::class,
		\SureCart\Rest\PortalProtocolRestServiceProvider::class,
		\SureCart\Rest\TaxProtocolRestServiceProvider::class,
		\SureCart\Rest\OrderProtocolRestServiceProvider::class,
		\SureCart\Rest\TaxRegistrationRestServiceProvider::class,
		\SureCart\Rest\TaxZoneRestServiceProvider::class,
		\SureCart\Rest\TaxOverrideRestServiceProvider::class,
		\SureCart\Rest\CustomerNotificationProtocolRestServiceProvider::class,
		\SureCart\Rest\OrderRestServiceProvider::class,
		\SureCart\Rest\CheckoutRestServiceProvider::class,
		\SureCart\Rest\DraftCheckoutRestServiceProvider::class,
		\SureCart\Rest\InvoicesRestServiceProvider::class,
		\SureCart\Rest\WebhooksRestServiceProvider::class,
		\SureCart\Rest\VerificationCodeRestServiceProvider::class,
		\SureCart\Rest\CheckEmailRestServiceProvider::class,
		\SureCart\Rest\ReturnItemsRestServiceProvider::class,
		\SureCart\Rest\ReturnReasonsRestServiceProvider::class,
		\SureCart\Rest\ReturnRequestsRestServiceProvider::class,
		\SureCart\Rest\ShippingProfileRestServiceProvider::class,
		\SureCart\Rest\ShippingMethodRestServiceProvider::class,
		\SureCart\Rest\ShippingRateRestServiceProvider::class,
		\SureCart\Rest\ShippingZoneRestServiceProvider::class,
		\SureCart\Rest\ShippingProtocolRestServiceProvider::class,
		\SureCart\Rest\ProvisionalAccountRestServiceProvider::class,
		\SureCart\Rest\ProductMediaRestServiceProvider::class,
		\SureCart\Rest\VariantsRestServiceProvider::class,
		\SureCart\Rest\VariantOptionsRestServiceProvider::class,
		\SureCart\Rest\VariantValuesRestServiceProvider::class,
		\SureCart\Rest\ClicksRestServiceProvider::class,
		\SureCart\Rest\ReferralItemsRestServiceProvider::class,
		\SureCart\Rest\PayoutsRestServiceProvider::class,
		\SureCart\Rest\PayoutGroupsRestServiceProvider::class,
		\SureCart\Rest\ReferralsRestServiceProvider::class,
		\SureCart\Rest\AffiliationRequestsRestServiceProvider::class,
		\SureCart\Rest\AffiliationProductsRestServiceProvider::class,
		\SureCart\Rest\AffiliationsRestServiceProvider::class,
		\SureCart\Rest\ExportsRestServiceProvider::class,

		// integrations.
		\SureCart\Integrations\DiviServiceProvider::class,
		\SureCart\Integrations\ThriveAutomator\ThriveAutomatorServiceProvider::class,
		\SureCart\Integrations\LearnDash\LearnDashServiceProvider::class,
		\SureCart\Integrations\LearnDashGroup\LearnDashGroupServiceProvider::class,
		\SureCart\Integrations\LifterLMS\LifterLMSServiceProvider::class,
		\SureCart\Integrations\BuddyBoss\BuddyBossServiceProvider::class,
		\SureCart\Integrations\AffiliateWP\AffiliateWPServiceProvider::class,
		\SureCart\Integrations\TutorLMS\TutorLMSServiceProvider::class,
		\SureCart\Integrations\User\UserServiceProvider::class,
		\SureCart\Integrations\MemberPress\MemberPressServiceProvider::class,
		\SureCart\Integrations\Elementor\ElementorServiceProvider::class,
		\SureCart\Integrations\Beaver\BeaverServiceProvider::class,
		\SureCart\Integrations\RankMath\RankMathServiceProvider::class,
	],

	/**
	* SSR Blocks
	*/
	'blocks'                 => [
		\SureCartBlocks\Blocks\Email\Block::class,
		\SureCartBlocks\Blocks\Address\Block::class,
		\SureCartBlocks\Blocks\BuyButton\Block::class,
		\SureCartBlocks\Blocks\Coupon\Block::class,
		\SureCartBlocks\Blocks\AddToCartButton\Block::class,
		\SureCartBlocks\Blocks\CustomerDashboardButton\Block::class,
		\SureCartBlocks\Blocks\CheckoutForm\Block::class,
		\SureCartBlocks\Blocks\CartCoupon\Block::class,
		\SureCartBlocks\Blocks\CartSubtotal\Block::class,
		\SureCartBlocks\Blocks\CartBumpLineItem\Block::class,
		\SureCartBlocks\Blocks\CollapsibleRow\Block::class,
		\SureCartBlocks\Blocks\Columns\Block::class,
		\SureCartBlocks\Blocks\Column\Block::class,
		\SureCartBlocks\Blocks\CollectionPage\Block::class,
		\SureCartBlocks\Blocks\OrderConfirmationLineItems\Block::class,
		\SureCartBlocks\Blocks\Form\Block::class,
		\SureCartBlocks\Blocks\Payment\Block::class,
		\SureCartBlocks\Blocks\LogoutButton\Block::class,
		\SureCartBlocks\Blocks\ProductItemList\Block::class,
		\SureCartBlocks\Blocks\ProductCollection\Block::class,
		\SureCartBlocks\Blocks\PriceSelector\Block::class,
		\SureCartBlocks\Blocks\PriceChoice\Block::class,
		\SureCartBlocks\Blocks\Dashboard\WordPressAccount\Block::class,
		\SureCartBlocks\Blocks\Dashboard\CustomerDashboard\Block::class,
		\SureCartBlocks\Blocks\Dashboard\CustomerOrders\Block::class,
		\SureCartBlocks\Blocks\Dashboard\CustomerDownloads\Block::class,
		\SureCartBlocks\Blocks\Dashboard\CustomerBillingDetails\Block::class,
		\SureCartBlocks\Blocks\Dashboard\CustomerPaymentMethods\Block::class,
		\SureCartBlocks\Blocks\Dashboard\CustomerSubscriptions\Block::class,
		\SureCartBlocks\Blocks\Dashboard\CustomerLicenses\Block::class,
		\SureCartBlocks\Blocks\Dashboard\CustomerDashboardArea\Block::class,
		\SureCartBlocks\Blocks\Dashboard\DashboardPage\Block::class,
		\SureCartBlocks\Blocks\Dashboard\DashboardTab\Block::class,
		\SureCartBlocks\Blocks\ConditionalForm\Block::class,
		\SureCartBlocks\Blocks\StoreLogo\Block::class,
		\SureCartBlocks\Blocks\Password\Block::class,
		\SureCartBlocks\Blocks\CartMenuButton\Block::class,
		\SureCartBlocks\Blocks\CartSubmit\Block::class,
		\SureCartBlocks\Blocks\Cart\Block::class,
		\SureCartBlocks\Blocks\VariantPriceSelector\Block::class,
		\SureCartBlocks\Blocks\ProductDonation\Block::class,
		\SureCartBlocks\Blocks\ProductDonationAmounts\Block::class,
		\SureCartBlocks\Blocks\ProductDonationPrices\Block::class,
		\SureCartBlocks\Blocks\ProductDonationRecurringPrices\Block::class,
		\SureCartBlocks\Blocks\ProductDonationAmount\Block::class,
		\SureCartBlocks\Blocks\ProductDonationCustomAmount\Block::class,

		// Deprecated.
		\SureCartBlocks\Blocks\Dashboard\Deprecated\CustomerInvoices\Block::class,
		\SureCartBlocks\Blocks\Dashboard\Deprecated\CustomerCharges\Block::class,

		\SureCartBlocks\Blocks\Product\Description\Block::class,
		\SureCartBlocks\Blocks\Product\Title\Block::class,
		\SureCartBlocks\Blocks\Product\Price\Block::class,
		\SureCartBlocks\Blocks\Product\PriceChoices\Block::class,
		\SureCartBlocks\Blocks\Product\VariantChoices\Block::class,
		\SureCartBlocks\Blocks\Product\Media\Block::class,
		\SureCartBlocks\Blocks\Product\Quantity\Block::class,
		\SureCartBlocks\Blocks\Product\BuyButton\Block::class,
		\SureCartBlocks\Blocks\Product\BuyButtons\Block::class,
		\SureCartBlocks\Blocks\Product\CollectionBadges\Block::class,

		\SureCartBlocks\Blocks\ProductCollectionTitle\Block::class,
		\SureCartBlocks\Blocks\ProductCollectionDescription\Block::class,
		\SureCartBlocks\Blocks\ProductCollectionImage\Block::class,

		\SureCartBlocks\Blocks\Upsell\Upsell\Block::class,
		\SureCartBlocks\Blocks\Upsell\Title\Block::class,
		\SureCartBlocks\Blocks\Upsell\UpsellTotals\Block::class,
		\SureCartBlocks\Blocks\Upsell\CountdownTimer\Block::class,
		\SureCartBlocks\Blocks\Upsell\SubmitButton\Block::class,
		\SureCartBlocks\Blocks\Upsell\NoThanksButton\Block::class,
	],

	/** Which components to preload for each block. */
	'preload'                => [
		'surecart/address'                   => [ 'sc-order-shipping-address', 'sc-address', 'sc-dropdown' ],
		'surecart/add-to-cart-button'        => [ 'sc-cart-form', 'sc-price-input', 'sc-cart-form-submit' ],
		'surecart/button'                    => [ 'sc-button' ],
		'surecart/buy-button'                => [ 'sc-button' ],
		'surecart/card'                      => [ 'sc-card' ],
		'surecart/checkbox'                  => [ 'sc-checkbox' ],
		'surecart/column'                    => [ 'sc-column' ],
		'surecart/columns'                   => [ 'sc-columns' ],
		'surecart/confirmation'              => [ 'sc-order-confirmation' ],
		'surecart/coupon'                    => [ 'sc-order-coupon-form', 'sc-coupon-form', 'sc-button', 'sc-input' ],
		'surecart/customer-dashboard-button' => [ 'sc-button' ],
		'surecart/customer-dashboard'        => [ 'sc-tab-group' ],
		'surecart/customer-subscriptions'    => [ 'sc-subscriptions-list', 'sc-dialog', 'sc-card', 'sc-stacked-list', 'sc-stacked-list-row', 'sc-flex' ],
		'surecart/dashboard-page'            => [ 'sc-spacing' ],
		'surecart/dashboard-tab'             => [ 'sc-tab' ],
		'surecart/customer-billing-details'  => [ 'sc-dashboard-customer-details', 'sc-breadcrumbs', 'sc-breadcrumb', 'sc-customer-edit' ],
		'surecart/divider'                   => [ 'sc-divider' ],
		'surecart/donation'                  => [ 'sc-donation-choices', 'sc-choices', 'sc-choice' ],
		'surecart/donation-amount'           => [ 'sc-choice', 'sc-format-number' ],
		'surecart/email'                     => [ 'sc-input', 'sc-customer-email' ],
		'surecart/phone'                     => [ 'sc-input', 'sc-phone-input', 'sc-customer-phone' ],
		'surecart/express-payment'           => [ 'sc-express-payment', 'sc-divider', 'sc-stripe-payment-request' ],
		'surecart/form'                      => [ 'sc-checkout', 'sc-form', 'sc-checkout-unsaved-changes-warning', 'sc-line-items-provider', 'sc-block-ui' ],
		'surecart/heading'                   => [ 'sc-heading' ],
		'surecart/input'                     => [ 'sc-input' ],
		'surecart/line-items'                => [ 'sc-line-items', 'sc-line-item', 'sc-line-item-tax', 'sc-product-line-item', 'sc-format-number', 'sc-skeleton' ],
		'surecart/logout-button'             => [ 'sc-button' ],
		'surecart/name'                      => [ 'sc-customer-name', 'sc-input' ],
		'surecart/first-name'                => [ 'sc-customer-firstname', 'sc-input' ],
		'surecart/last-name'                 => [ 'sc-customer-lastname', 'sc-input' ],
		'surecart/name-your-price'           => [ 'sc-custom-order-price-input', 'sc-price-input', 'sc-skeleton' ],
		'surecart/password'                  => [ 'sc-order-password', 'sc-input' ],
		'surecart/payment'                   => [ 'sc-payment', 'sc-toggles', 'sc-toggle', 'sc-tag' ],
		'surecart/price-choice'              => [ 'sc-price-choice', 'sc-choice', 'sc-skeleton' ],
		'surecart/price-selector'            => [ 'sc-price-choices' ],
		'surecart/variant-price-selector'    => [ 'sc-checkout-product-price-variant-selector' ],
		'surecart/submit'                    => [ 'sc-order-submit', 'sc-button', 'sc-total', 'sc-paypal-buttons', 'sc-format-number', 'sc-spinner' ],
		'surecart/subtotal'                  => [ 'sc-line-item-total', 'sc-format-number' ],
		'surecart/total'                     => [ 'sc-line-item-total', 'sc-format-number' ],
		'surecart/totals'                    => [ 'sc-order-summary' ],
		'surecart/conditional-from'          => [ 'sc-conditional-form' ],
		'surecart/product-price'             => [ 'sc-product-price', 'sc-tag', 'sc-format-number' ],
		'surecart/product-media'             => [],
		'surecart/product-buy-buttons'       => [ 'sc-product-buy-button', 'sc-button' ],
		'surecart/product-price-choices'     => [ 'sc-product-price-choices', 'sc-choices', 'sc-price-choice-container', 'sc-choice-container', 'sc-format-number', 'sc-skeleton' ],
		'surecart/product-variant-choices'   => [ 'sc-product-variation-choices' ],
		'surecart/product-quantity'          => [ 'sc-product-quantity', 'sc-form-control', 'sc-icon', 'sc-quantity-select' ],
		'surecart/product-collection-badges' => [],
	],

	/**
	 * Links used.
	 */
	'links'                  => [
		'purchase' => 'https://app.surecart.com/plans',
	],

	/**
	* Permission Controllers
	*/
	'permission_controllers' => [
		\SureCart\Permissions\Models\ActivationPermissionsController::class,
		\SureCart\Permissions\Models\BalanceTransactionPermissionsController::class,
		\SureCart\Permissions\Models\ChargePermissionsController::class,
		\SureCart\Permissions\Models\LicensePermissionsController::class,
		\SureCart\Permissions\Models\CustomerPermissionsController::class,
		\SureCart\Permissions\Models\OrderPermissionsController::class,
		\SureCart\Permissions\Models\CheckoutPermissionsController::class,
		\SureCart\Permissions\Models\InvoicePermissionsController::class,
		\SureCart\Permissions\Models\PaymentMethodPermissionsController::class,
		\SureCart\Permissions\Models\PurchasePermissionsController::class,
		\SureCart\Permissions\Models\RefundPermissionsController::class,
		\SureCart\Permissions\Models\SubscriptionPermissionsController::class,
	],

	/**
	 * Array of route group definitions and default attributes.
	 * All of these are optional so if we are not using
	 * a certain group of routes we can skip it.
	 * If we are not using routing at all we can skip
	 * the entire 'routes' option.
	 */
	'routes'                 => [
		'web'   => [
			'definitions' => __DIR__ . DIRECTORY_SEPARATOR . 'routes' . DIRECTORY_SEPARATOR . 'web.php',
			'attributes'  => [
				'namespace' => 'SureCart\\Controllers\\Web\\',
			],
		],
		'admin' => [
			'definitions' => __DIR__ . DIRECTORY_SEPARATOR . 'routes' . DIRECTORY_SEPARATOR . 'admin.php',
			'attributes'  => [
				'namespace' => 'SureCart\\Controllers\\Admin\\',
			],
		],
		'ajax'  => [
			'definitions' => __DIR__ . DIRECTORY_SEPARATOR . 'routes' . DIRECTORY_SEPARATOR . 'ajax.php',
			'attributes'  => [
				'namespace' => 'SureCart\\Controllers\\Ajax\\',
			],
		],
	],

	/**
	 * View Composers settings.
	 */
	'view_composers'         => [
		'namespace' => 'SureCart\\ViewComposers\\',
	],

	/**
	 * Register middleware class aliases.
	 * Use fully qualified middleware class names.
	 *
	 * Internal aliases that you should avoid overriding:
	 * - 'flash'
	 * - 'old_input'
	 * - 'csrf'
	 * - 'user.logged_in'
	 * - 'user.logged_out'
	 * - 'user.can'
	 */
	'middleware'             => [
		'archive_model'       => \SureCart\Middleware\ArchiveModelMiddleware::class,
		'edit_model'          => \SureCart\Middleware\EditModelMiddleware::class,
		'nonce'               => \SureCart\Middleware\NonceMiddleware::class,
		'webhooks'            => \SureCart\Middleware\WebhooksMiddleware::class,
		'assets.components'   => \SureCart\Middleware\ComponentAssetsMiddleware::class,
		'assets.brand_colors' => \SureCart\Middleware\BrandColorMiddleware::class,
		'assets.admin_colors' => \SureCart\Middleware\AdminColorMiddleware::class,
	],

	/**
	 * Map model names to their corresponding classes.
	 * This lets you reference a model based on a simple string.
	 */
	'models'                 => [
		'abandoned_checkout'  => \SureCart\Models\AbandonedCheckout::class,
		'account'             => \SureCart\Models\Account::class,
		'cancellation_reason' => \SureCart\Models\CancellationReason::class,
		'charge'              => \SureCart\Models\Charge::class,
		'coupon'              => \SureCart\Models\Coupon::class,
		'customer'            => \SureCart\Models\Customer::class,
		'customer_link'       => \SureCart\Models\CustomerLink::class,
		'form'                => \SureCart\Models\Form::class,
		'line_item'           => \SureCart\Models\LineItem::class,
		'order'               => \SureCart\Models\Order::class,
		'price'               => \SureCart\Models\Price::class,
		'processor'           => \SureCart\Models\Processor::class,
		'product'             => \SureCart\Models\Product::class,
		'promotion'           => \SureCart\Models\Promotion::class,
		'subscription'        => \SureCart\Models\Subscription::class,
		'upload'              => \SureCart\Models\Upload::class,
		'user'                => \SureCart\Models\User::class,
		'webhook'             => \SureCart\Models\Webhook::class,
	],

	/**
	 * Register middleware groups.
	 * Use fully qualified middleware class names or registered aliases.
	 * There are a couple built-in groups that you may override:
	 * - 'web'      - Automatically applied to web routes.
	 * - 'admin'    - Automatically applied to admin routes.
	 * - 'ajax'     - Automatically applied to ajax routes.
	 * - 'global'   - Automatically applied to all of the above.
	 * - 'surecart' - Internal group applied the same way 'global' is.
	 *
	 * Warning: The 'surecart' group contains some internal SureCart core
	 * middleware which you should avoid overriding.
	 */
	'middleware_groups'      => [
		'global' => [],
		'web'    => [],
		'ajax'   => [],
		'admin'  => [],
	],

	/**
	 * Optionally specify middleware execution order.
	 * Use fully qualified middleware class names.
	 */
	'middleware_priority'    => [
		// phpcs:ignore
		// \SureCart\Middleware\MyMiddlewareThatShouldRunFirst::class,
		// \SureCart\Middleware\MyMiddlewareThatShouldRunSecond::class,
	],

	/**
	 * Webhook events we gonna proceed.
	 */
	'webhook_events'         => [
		// 'cancellation_act.updated',
		// 'customer.created',
		'customer.updated',
		// 'order.created',
		// 'order.made_processing',
		// 'order.paid', // In doc
		// 'order.payment_failed',
		'purchase.created',
		'purchase.invoked',
		'purchase.updated',
		'purchase.revoked',
		// 'refund.created',
		// 'refund.succeeded', // In doc
		// 'subscription.canceled', // In doc
		// 'subscription.created',
		// 'subscription.completed',
		// 'subscription.made_active', // In doc
		// 'subscription.made_past_due',
		// 'subscription.made_trialing', // In doc
		'subscription.renewed', // needed for AffiliateWP recurring referrals.
		// 'subscription.updated',
		'account.updated',
	],

	/**
	 * Custom directories to search for views.
	 * Use absolute paths or leave blank to disable.
	 * Applies only to the default PhpViewEngine.
	 */
	'views'                  => [ dirname( __DIR__ ) . DIRECTORY_SEPARATOR . 'views' ],

	/**
	 * App Core configuration.
	 */
	'app_core'               => [
		'path' => dirname( __DIR__ ),
		'url'  => plugin_dir_url( SURECART_PLUGIN_FILE ),
	],
];
