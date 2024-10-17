<?php

namespace SureCart\Controllers\Admin\Invoices;

use SureCart\Support\Scripts\AdminModelEditController;

/**
 * Coupon page
 */
class InvoiceScriptsController extends AdminModelEditController {
	/**
	 * What types of data to add the the page.
	 *
	 * @var array
	 */
	protected $with_data = [ 'currency', 'supported_currencies', 'links' ];

	/**
	 * Script handle.
	 *
	 * @var string
	 */
	protected $handle = 'surecart/scripts/admin/invoice';

	/**
	 * Script path.
	 *
	 * @var string
	 */
	protected $path = 'admin/invoices';
}
