<?php

namespace SureCart\Controllers\Rest;

use SureCart\Models\Price;

/**
 * Handle Price requests through the REST API
 */
class PricesController extends RestController {
	/**
	 * Class to make the requests.
	 *
	 * @var string
	 */
	protected $class = Price::class;
}
