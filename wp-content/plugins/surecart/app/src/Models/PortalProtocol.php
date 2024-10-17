<?php

namespace SureCart\Models;

/**
 * Holds the data of the current account.
 */
class PortalProtocol extends Model {
	/**
	 * Rest API endpoint
	 *
	 * @var string
	 */
	protected $endpoint = 'portal_protocol';

	/**
	 * Object name
	 *
	 * @var string
	 */
	protected $object_name = 'portal_protocol';

	/**
	 * Does an update clear account cache?
	 *
	 * @var boolean
	 */
	protected $clears_account_cache = true;
}
