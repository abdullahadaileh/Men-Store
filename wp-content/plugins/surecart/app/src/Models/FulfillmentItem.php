<?php

namespace SureCart\Models;

/**
 * Fulfillment model.
 */
class FulfillmentItem extends Model {
	/**
	 * Rest API endpoint
	 *
	 * @var string
	 */
	protected $endpoint = 'fulfillment_items';

	/**
	 * Object name
	 *
	 * @var string
	 */
	protected $object_name = 'fulfillment_item';
}
