<?php
namespace SureCart\Controllers\Web;

use SureCart\Models\Form;

/**
 * Handles Product page requests for frontend.
 */
class ProductPageController extends BasePageController {
	/**
	 * Show the product page
	 *
	 * @param \SureCartCore\Requests\RequestInterface $request Request.
	 * @param \SureCartCore\View                      $view View.
	 *
	 * @return function|void
	 */
	public function show( $request, $view ) {
		// get the product from the query var.
		$id = get_query_var( 'sc_product_page_id' );

		// fetch the product by id/slug.
		$this->model = \SureCart\Models\Product::with( [ 'image', 'prices', 'product_medias', 'product_media.media', 'variants', 'variant_options' ] )->find( $id );

		if ( is_wp_error( $this->model ) ) {
			return $this->handleError( $this->model );
		}

		// if this product is a draft, check read permissions.
		if ( 'draft' === $this->model->status && ! current_user_can( 'read_sc_products' ) ) {
			return $this->notFound();
		}

		// slug changed or we are using the id, redirect.
		if ( $this->model->slug !== $id ) {
			return \SureCart::redirect()->to( $this->model->permalink );
		}

		set_query_var( 'sc_product_page_id', $this->model->id );

		// add the filters.
		$this->filters();
		$this->setInitialProductState();

		// handle block theme.
		if ( wp_is_block_theme() ) {
			global $_wp_current_template_content;
			$_wp_current_template_content = $this->model->template->content ?? '';
		}

		// Include the view only it is not empty.
		if ( $view ) {
			include $view;
		}

		return \SureCart::response();
	}

	/**
	 * Handle filters.
	 *
	 * @return void
	 */
	public function filters(): void {
		parent::filters();

		// Add edit product link to admin bar.
		add_action( 'admin_bar_menu', [ $this, 'addEditProductLink' ], 99 );
	}

	/**
	 * Add edit product link.
	 *
	 * @param \WP_Admin_Bar $wp_admin_bar Admin bar.
	 *
	 * @return void
	 */
	public function addEditProductLink( $wp_admin_bar ): void {
		$wp_admin_bar->add_node(
			[
				'id'    => 'edit-product',
				'title' => __( 'Edit Product', 'surecart' ),
				'href'  => esc_url( \SureCart::getUrl()->edit( 'product', $this->model->id ) ),
			]
		);
	}

	/**
	 * Set initial product state
	 *
	 * @return void
	 */
	public function setInitialProductState() {
		$product_state[ $this->model->id ] = $this->model->getInitialPageState();

		sc_initial_state(
			[
				'product' => $product_state,
			]
		);
	}
}
