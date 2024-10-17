<?php
namespace SureCart\Models;

use SureCart\Models\Traits\CanFinalize;
use SureCart\Models\Traits\HasCustomer;
use SureCart\Models\Traits\HasSubscription;
use SureCart\Models\Traits\HasPaymentIntent;
use SureCart\Models\Traits\HasPaymentMethod;
use SureCart\Models\Traits\HasProcessorType;

/**
 * Invoice model
 */
class Invoice extends Model {
	use HasCustomer, HasSubscription, HasPaymentIntent, HasPaymentMethod, CanFinalize, HasProcessorType;

	/**
	 * Rest API endpoint
	 *
	 * @var string
	 */
	protected $endpoint = 'invoices';

	/**
	 * Object name
	 *
	 * @var string
	 */
	protected $object_name = 'invoice';

		/**
		 * Need to pass the processor type on create
		 *
		 * @param array  $attributes Optional attributes.
		 * @param string $type stripe, paypal, etc.
		 */
	public function __construct( $attributes = [], $type = '' ) {
		$this->processor_type = $type;
		parent::__construct( $attributes );
	}
}
