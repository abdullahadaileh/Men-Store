<?php

namespace SureCart\Background;

/**
 * Controls sync services.
 */
class SyncService {
	/**
	 * The customer sync service.
	 *
	 * @return CustomerSyncService
	 */
	public function customers() {
		return new CustomerSyncService();
	}
}
