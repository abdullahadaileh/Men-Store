<?php

namespace SureCart\Controllers\Admin\Invoices;

use SureCart\Controllers\Admin\AdminController;
use SureCart\Controllers\Admin\Invoices\InvoicesListTable;

/**
 * Handles product admin requests.
 */
class InvoicesViewController extends AdminController {
	/**
	 * Invoices index.
	 */
	public function index() {
		$table = new InvoicesListTable();
		$table->prepare_items();
		$this->withHeader(
			array(
				'breadcrumbs' => [
					'invoices' => [
						'title' => __( 'Invoices', 'surecart' ),
					],
				],
			)
		);
		return \SureCart::view( 'admin/invoices/index' )->with(
			[
				'table' => $table,
			]
		);
	}

	/**
	 * Coupons edit.
	 */
	public function edit() {
		// enqueue needed script.
		add_action( 'admin_enqueue_scripts', \SureCart::closure()->method( InvoiceScriptsController::class, 'enqueue' ) );
		// return view.
		return '<div id="app"></div>';
	}

	public function archive( $request ) {
		// flash an error message
		\SureCart::flash()->add( 'errors', 'Please enter a valid email address.' );
		// redirect to order index page.
		return \SureCart::redirect()->to( \SureCart::getUrl()->index( 'invoice' ) );
	}
}
