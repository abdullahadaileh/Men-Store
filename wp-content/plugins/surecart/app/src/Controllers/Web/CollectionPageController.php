<?php

declare(strict_types=1);

namespace SureCart\Controllers\Web;

use SureCart\Models\Form;

/**
 * Handles Frontend Collection Pages.
 */
class CollectionPageController extends BasePageController {
	/**
	 * Show the product collection page.
	 *
	 * @param \SureCartCore\Requests\RequestInterface $request Request.
	 * @param \SureCartCore\View                      $view View.
	 *
	 * @return function
	 */
	public function show( $request, $view ) {
		// get the collection from the query var.
		$collection_page_id = get_query_var( 'sc_collection_page_id' );

		// fetch the collection by id/slug.
		$this->model = \SureCart\Models\ProductCollection::with( [ 'image' ] )->find( $collection_page_id );
		if ( is_wp_error( $this->model ) ) {
			return $this->handleError( $this->model );
		}

		// slug changed or we are using the id, redirect.
		if ( $this->model->slug !== $collection_page_id ) {
			return \SureCart::redirect()->to( $this->model->permalink );
		}

		set_query_var( 'sc_collection_page_id', $this->model->id );

		// add the filters.
		$this->filters();

		// handle block theme.
		if ( wp_is_block_theme() ) {
			global $_wp_current_template_content;
			$_wp_current_template_content = $this->model->template->content ?? '';
		}

		// include the default view.
		include $view;

		return \SureCart::response();
	}

	/**
	 * Handle filters.
	 *
	 * @return void
	 */
	public function filters(): void {
		parent::filters();

		// add edit product collection link.
		add_action( 'admin_bar_menu', [ $this, 'addEditCollectionLink' ], 99 );

		// add data needed for collection to load.
		add_filter(
			'surecart-components/scData',
			function( $data ) {
				$form = \SureCart::forms()->getDefault();

				$data['collection_data'] = [
					'collection'    => $this->model,
					'form'          => $form,
					'mode'          => Form::getMode( $form->ID ),
					'checkout_link' => \SureCart::pages()->url( 'checkout' ),
				];

				return $data;
			}
		);
	}

	/**
	 * Add edit product collection link.
	 *
	 * @param \WP_Admin_Bar $wp_admin_bar Admin bar.
	 *
	 * @return void
	 */
	public function addEditCollectionLink( $wp_admin_bar ): void {
		$wp_admin_bar->add_node(
			[
				'id'    => 'edit-collection',
				'title' => __( 'Edit Product Collection', 'surecart' ),
				'href'  => esc_url( \SureCart::getUrl()->edit( 'product_collections', $this->model->id ) ),
			]
		);
	}
}
