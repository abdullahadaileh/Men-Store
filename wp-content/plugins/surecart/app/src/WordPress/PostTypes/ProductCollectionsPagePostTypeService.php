<?php

namespace SureCart\WordPress\PostTypes;

/**
 * Product collection page post type service class.
 */
class ProductCollectionsPagePostTypeService {
	/**
	 * The post type slug.
	 *
	 * @var string
	 */
	protected $post_type = 'sc_collection';

	/**
	 * Bootstrap service.
	 *
	 * @return void
	 */
	public function bootstrap() {
		add_action( 'init', [ $this, 'registerPostType' ] );
	}

	/**
	 * Register the product post type.
	 *
	 * @return void
	 */
	public function registerPostType() {
		register_post_type(
			$this->post_type,
			array(
				'labels'            => array(
					'name'                     => _x( 'SureCart Product Collections', 'post type general name', 'surecart' ),
					'singular_name'            => _x( 'SureCart Product Collection', 'post type singular name', 'surecart' ),
					'add_new'                  => _x( 'Add New', 'SureCart Product Collection', 'surecart' ),
					'add_new_item'             => __( 'Add new SureCart Product Collection', 'surecart' ),
					'new_item'                 => __( 'New SureCart Product Collection', 'surecart' ),
					'edit_item'                => __( 'Edit SureCart Product Collection', 'surecart' ),
					'view_item'                => __( 'View SureCart Product Collection', 'surecart' ),
					'all_items'                => __( 'All SureCart Product Collections', 'surecart' ),
					'search_items'             => __( 'Search SureCart Product Collections', 'surecart' ),
					'not_found'                => __( 'No checkout forms found.', 'surecart' ),
					'not_found_in_trash'       => __( 'No checkout forms found in Trash.', 'surecart' ),
					'filter_items_list'        => __( 'Filter checkout forms list', 'surecart' ),
					'items_list_navigation'    => __( 'SureCart Product Collections list navigation', 'surecart' ),
					'items_list'               => __( 'SureCart Product Collections list', 'surecart' ),
					'item_published'           => __( 'SureCart Product Collection published.', 'surecart' ),
					'item_published_privately' => __( 'SureCart Product Collection published privately.', 'surecart' ),
					'item_reverted_to_draft'   => __( 'SureCart Product Collection reverted to draft.', 'surecart' ),
					'item_scheduled'           => __( 'SureCart Product Collection scheduled.', 'surecart' ),
					'item_updated'             => __( 'SureCart Product Collection updated.', 'surecart' ),
				),
				'public'            => true,
				'show_ui'           => false,
				'show_in_menu'      => false,
				'rewrite'           => false,
				'show_in_rest'      => false,
				'show_in_nav_menus' => false,
				'can_export'        => false,
				'capability_type'   => 'post',
				'map_meta_cap'      => true,
				'supports'          => array(
					'custom-fields',
				),
			)
		);
	}
}
