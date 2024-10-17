<?php


namespace SureCart\WordPress\Templates;

/**
 * The template service.
 */
class TemplatesService {
	/**
	 * The service container.
	 *
	 * @var array
	 */
	private $container;

	/**
	 * The template file/name associations.
	 *
	 * @var array
	 */
	private $templates = [];

	/**
	 * The post type for the templates.
	 *
	 * @var string
	 */
	private $post_type = '';

	/**
	 * SureCart plugin slug
	 *
	 * This is used to save templates to the DB which are stored against this value in the wp_terms table.
	 *
	 * @var string
	 */
	const PLUGIN_SLUG = 'surecart/surecart';

	/**
	 * Get things going.
	 *
	 * @param array  $container The service container.
	 * @param array  $templates The template file/name associations.
	 * @param string $post_type The post type for the templates.
	 */
	public function __construct( $container, $templates, $post_type ) {
		$this->container = $container;
		$this->templates = $templates;
		$this->post_type = $post_type;
	}

	/**
	 * Bootstrap actions and filters.
	 *
	 * @return void
	 */
	public function bootstrap() {
		add_filter( 'theme_' . $this->post_type . '_templates', [ $this, 'addTemplates' ] );
		add_filter( 'template_include', [ $this, 'includeTemplate' ], 9 );
		add_filter( 'body_class', [ $this, 'bodyClass' ] );
		add_action( 'init', [ $this, 'registerMeta' ] );

		// product page query overrides.
		add_filter( 'posts_pre_query', [ $this, 'overrideProductPostQuery' ], 10, 2 );
		add_filter( 'query_vars', [ $this, 'addCurrentProductQueryVar' ] );
		add_filter( 'get_post_metadata', [ $this, 'overrideProductPostMeta' ], 10, 4 );
	}

	/**
	 * Short-circuits the return value of a meta field for our post type.
	 *
	 * @param mixed  $value     The value to return, either a single metadata value or an array
	 *                          of values depending on the value of `$single`. Default null.
	 * @param int    $object_id ID of the object metadata is for.
	 * @param string $meta_key  Metadata key.
	 * @param bool   $single    Whether to return only the first value of the specified `$meta_key`.
	 *
	 * @return mixed
	 */
	public function overrideProductPostMeta( $value, $object_id, $meta_key, $single ) {
		// not our meta query.
		if ( 'sc_id' !== $meta_key && 'sc_slug' !== $meta_key ) {
			return $value;
		}

		$product = get_query_var( 'surecart_current_product' );

		if ( ! $product ) {
			// get the product in case the product page id query var is the slug.
			$product_id = get_query_var( 'sc_product_page_id' );
			$product    = \SureCart\Models\Product::with( [ 'prices', 'image' ] )->find( $product_id );
		}

		// we don't have an id or slug.
		if ( empty( $product->id ) || empty( $product->slug ) ) {
			return $value;
		}

		// return the id.
		if ( 'sc_id' === $meta_key ) {
			return $product->id;
		}

		// return the slug.
		if ( 'sc_slug' === $meta_key ) {
			return $product->slug;
		}

		return $value;
	}

	/**
	 * Add surecart_current_product to list of query vars.
	 *
	 * @param array $vars The query vars.
	 * @return array
	 */
	public function addCurrentProductQueryVar( $vars ) {
		$vars[] = 'surecart_current_product';
		return $vars;
	}

	/**
	 * Filters the posts array before the query takes place to return a product post.
	 * Return a non-null value to bypass WordPress' default post queries.
	 *
	 * Filtering functions that require pagination information are encouraged to set
	 * the `found_posts` and `max_num_pages` properties of the WP_Query object,
	 * passed to the filter by reference. If WP_Query does not perform a database
	 * query, it will not have enough information to generate these values itself.
	 *
	 * @since 4.6.0
	 *
	 * @param WP_Post[]|int[]|null $posts Return an array of post data to short-circuit WP's query,
	 *                                    or null to allow WP to run its normal queries.
	 * @param \WP_Query            $wp_query The WP_Query instance (passed by reference).
	 *
	 * @return WP_Post[]|null Array of post data, or null to allow WP to run its normal queries.
	 */
	public function overrideProductPostQuery( $posts, \WP_Query $wp_query ) {
		$product_id = isset( $wp_query->query['sc_product_page_id'] ) ? $wp_query->query['sc_product_page_id'] : null;
		if ( ! $product_id ) {
			return;
		}

		$product = \SureCart\Models\Product::with( [ 'image', 'prices', 'featured_product_media', 'product_medias', 'product_media.media', 'variant_options', 'variants', 'product_collections' ] )->find( $product_id );
		if ( is_wp_error( $product ) ) {
			$wp_query->is_404 = true;
			return;
		}

		set_query_var( 'surecart_current_product', $product );

		// create a fake post for the product.
		$post                    = new \stdClass();
		$post->post_title        = $product->name;
		$post->post_name         = $product->slug;
		$post->post_content      = '<div>' . ( $product->getTemplateContent() ?? '' ) . '</div>';
		$post->post_status       = 'publish';
		$post->post_type         = 'sc_product'; // TODO: change to surecart-product-template post type?
		$post->sc_id             = $product->id;
		$post->product           = $product;
		$post->post_author       = 1;
		$post->post_parent       = 0;
		$post->comment_count     = 0;
		$post->comment_status    = 'closed';
		$post->ping_status       = 'closed';
		$post->post_password     = '';
		$post->post_excerpt      = '';
		$post->post_date         = ( new \DateTime( "@$product->created_at" ) )->setTimezone( new \DateTimeZone( wp_timezone_string() ) )->format( 'Y-m-d H:i:s' );
		$post->post_date_gmt     = date_i18n( 'Y-m-d H:i:s', $product->created_at, true );
		$post->post_modified     = ( new \DateTime( "@$product->updated_at" ) )->setTimezone( new \DateTimeZone( wp_timezone_string() ) )->format( 'Y-m-d H:i:s' );
		$post->post_modified_gmt = date_i18n( 'Y-m-d H:i:s', $product->updated_at, true );
		$post->ID                = 999999999;
		$posts                   = array( $post );

		$wp_query->found_posts       = 1;
		$wp_query->max_num_pages     = 1;
		$wp_query->is_singular       = true;
		$wp_query->is_single         = true;
		$wp_query->is_archive        = false;
		$wp_query->is_tax            = false;
		$wp_query->is_home           = false;
		$wp_query->is_search         = false;
		$wp_query->is_404            = false;
		$wp_query->queried_object    = $post;
		$wp_query->queried_object_id = $post->ID;

		return $posts;
	}

	/**
	 * Register any template meta we need.
	 */
	public function registerMeta() {
		register_meta(
			'post',
			'_surecart_dashboard_logo_width',
			[
				'auth_callback' => function( $allowed, $meta_key, $object_id, $user_id, $cap, $caps ) {
					return current_user_can( 'edit_post', $object_id );
				},
				'default'       => '180px',
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'string',
			]
		);

		foreach ( [
			'show_logo',
			'navigation_orders',
			'navigation_subscriptions',
			'navigation_downloads',
			'navigation_billing',
			'navigation_account',
		] as $toggle ) {
			register_meta(
				'post',
				'_surecart_dashboard_' . $toggle,
				[
					'auth_callback' => function( $allowed, $meta_key, $object_id, $user_id, $cap, $caps ) {
						return current_user_can( 'edit_post', $object_id );
					},
					'default'       => true,
					'show_in_rest'  => true,
					'single'        => true,
					'type'          => 'boolean',
				]
			);
		}
	}

	/**
	 * Is one of our templates active?
	 *
	 * @return boolean
	 */
	public function isTemplateActive() {
		$template = get_page_template_slug();
		return false !== $template && array_key_exists( $template, $this->templates );
	}

	/**
	 * Add the templates. to the existing templates.
	 *
	 * @param array $posts_templates Existing templates.
	 *
	 * @return array
	 */
	public function addTemplates( $posts_templates ) {
		return array_merge( $posts_templates, $this->templates );
	}

	/**
	 * Include the template if it is set.
	 *
	 * @param string $template Template url.
	 *
	 * @return string
	 */
	public function includeTemplate( $template ) {
		global $post;
		$id = $post->ID ?? null;

		if ( wp_is_block_theme() ) {
			return $template;
		}

		// check for product and use the template id.
		$product = get_query_var( 'surecart_current_product' );

		if ( ! empty( $product->metadata->wp_template_id ) ) {
			$page_template = $product->metadata->wp_template_id;
		} else {
			$page_template = get_post_meta( $id, '_wp_page_template', true );
		}

		// if the set template does not match one of these templates.
		if ( empty( $page_template ) || false === strpos( $page_template, '.php' ) ) {
			return $template;
		}

		$file = trailingslashit( $this->container[ SURECART_CONFIG_KEY ]['app_core']['path'] ) . '/templates/' . $page_template;

		// Return file if it exists.
		if ( file_exists( $file ) ) {
			return $file;
		}

		return $template;
	}

	/**
	 * Add to the body class if it's our template.
	 *
	 * @param array $body_class Array of body class names.
	 *
	 * @return array
	 */
	public function bodyClass( $body_class ) {
		$template = get_page_template_slug();

		if ( false !== $template && $this->isTemplateActive() ) {
			$body_class[] = 'surecart-template';
			$body_class[] = 'surecart-template-' . get_template();
		}

		return $body_class;
	}
}
