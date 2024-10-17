<?php

namespace SureCart\Controllers\Admin\Invoices;

use SureCart\Support\Currency;
use SureCart\Support\TimeDate;
use SureCart\Controllers\Admin\Tables\ListTable;
use SureCart\Models\Invoice;

/**
 * Create a new table class that will extend the WP_List_Table
 */
class InvoicesListTable extends ListTable {
	public $checkbox = true;

	/**
	 * Prepare the items for the table to process
	 *
	 * @return Void
	 */
	public function prepare_items() {
		$columns  = $this->get_columns();
		$hidden   = $this->get_hidden_columns();
		$sortable = $this->get_sortable_columns();

		$this->_column_headers = array( $columns, $hidden, $sortable );

		$query = $this->table_data();
		if ( is_wp_error( $query ) ) {
			$this->items = [];
			return;
		}

		$this->set_pagination_args(
			[
				'total_items' => $query->pagination->count,
				'per_page'    => $this->get_items_per_page( 'orders' ),
			]
		);

		$this->items = $query->data;
	}

	public function search() {
		?>
	<form class="search-form"
		method="get">
		<?php $this->search_box( __( 'Search Invoices', 'surecart' ), 'order' ); ?>
		<input type="hidden"
			name="id"
			value="1" />
	</form>
		<?php
	}

	/**
	 * Override the parent columns method. Defines the columns to use in your listing table
	 *
	 * @return Array
	 */
	public function get_columns() {
		return [
			'invoice' => __( 'Invoice', 'surecart' ),
			'date'    => __( 'Date', 'surecart' ),
			'status'  => __( 'Status', 'surecart' ),
			'method'  => __( 'Method', 'surecart' ),
			'total'   => __( 'Total', 'surecart' ),
			'mode'    => '',
		];
	}

	/**
	 * Displays the checkbox column.
	 *
	 * @param Product $product The product model.
	 */
	public function column_cb( $product ) {
		?>
		<label class="screen-reader-text" for="cb-select-<?php echo esc_attr( $product['id'] ); ?>"><?php _e( 'Select comment', 'surecart' ); ?></label>
		<input id="cb-select-<?php echo esc_attr( $product['id'] ); ?>" type="checkbox" name="delete_comments[]" value="<?php echo esc_attr( $product['id'] ); ?>" />
			<?php
	}

	/**
	 * Show the payment method for the invoice.
	 *
	 * @param \SureCart\Models\Invoice $invoice Invoice model.
	 *
	 * @return string
	 */
	public function column_method( $invoice ) {
		if ( ! empty( $invoice->payment_intent->processor_type ) && 'paypal' === $invoice->payment_intent->processor_type ) {
			return '<sc-icon name="paypal" style="font-size: 56px; line-height:1; height: 28px;"></sc-icon>';
		}
		if ( ! empty( $invoice->payment_intent->payment_method->card->brand ) ) {
			return '<sc-cc-logo style="font-size: 32px; line-height:1;" brand="' . esc_html( $invoice->payment_intent->payment_method->card->brand ) . '"></sc-cc-logo>';
		}

		return $invoice->payment_intent->processor_type ?? '-';
	}

	/**
	 * Define which columns are hidden
	 *
	 * @return Array
	 */
	public function get_hidden_columns() {
		return array();
	}

	/**
	 * Define the sortable columns
	 *
	 * @return Array
	 */
	public function get_sortable_columns() {
		return array( 'title' => array( 'title', false ) );
	}

	/**
	 * Get the table data
	 *
	 * @return Array
	 */
	protected function table_data() {
		return Invoice::where(
			[
				'status' => $this->getStatus(),
			]
		)->with( [ 'charge', 'customer', 'payment_intent', 'payment_intent.payment_method', 'payment_method.card' ] )
		->paginate(
			[
				'per_page' => $this->get_items_per_page( 'invoices' ),
				'page'     => $this->get_pagenum(),
			]
		);
	}

	/**
	 * Get the archive query status.
	 *
	 * @return boolean|null
	 */
	public function getStatus() {
		$status = sanitize_text_field( wp_unslash( $_GET['status'] ?? 'paid' ) );
		if ( 'paid' === $status ) {
			return [ 'paid', 'completed' ];
		}
		if ( 'incomplete' === $status ) {
			return [ 'finalized' ];
		}
		if ( 'all' === $status ) {
			return [];
		}
		return $status ? [ esc_html( $status ) ] : [];
	}

	/**
	 * Handle the total column
	 *
	 * @param \SureCart\Models\Invoice $invoice Invoice Model.
	 *
	 * @return string
	 */
	public function column_total( $invoice ) {
		return '<sc-format-number type="currency" currency="' . strtoupper( esc_html( $invoice->currency ) ) . '" value="' . (float) $invoice->amount_due . '"></sc-format-number>';
	}

	/**
	 * Handle the total column
	 *
	 * @param \SureCart\Models\Invoice $invoice Invoice model.
	 *
	 * @return string
	 */
	public function column_date( $invoice ) {
		return '<sc-format-date date="' . (int) $invoice->updated_at . '" type="timestamp" month="short" day="numeric" year="numeric" hour="numeric" minute="numeric"></sc-format-date>';
	}

	/**
	 * Render the "Redeem By"
	 *
	 * @param string $timestamp Redeem timestamp.
	 * @return string
	 */
	public function get_expiration_string( $timestamp = '' ) {
		if ( ! $timestamp ) {
			return '';
		}
		// translators: coupon expiration date.
		return sprintf( __( 'Valid until %s', 'surecart' ), date_i18n( get_option( 'date_format' ), $timestamp / 1000 ) );
	}

	/**
	 * Handle the status
	 *
	 * @param \SureCart\Models\Invoice $invoice Order Model.
	 *
	 * @return string
	 */
	public function column_status( $invoice ) {
		if ( ! empty( $invoice->charge->fully_refunded ) ) {
			return '<sc-tag type="danger">' . __( 'Refunded', 'surecart' ) . '</sc-tag>';
		}
		return '<sc-order-status-badge status="' . esc_attr( $invoice->status ) . '"></sc-order-status-badge>';
	}

	/**
	 * Name of the coupon
	 *
	 * @param \SureCart\Models\Promotion $promotion Promotion model.
	 *
	 * @return string
	 */
	public function column_invoice( $invoice ) {
		ob_start();
		?>
		<a class="row-title" aria-label="<?php echo esc_attr__( 'Edit Order', 'surecart' ); ?>" href="<?php echo esc_url( \SureCart::getUrl()->edit( 'invoice', $invoice->id ) ); ?>">
			<?php echo esc_html( sanitize_text_field( $invoice->number ?? $invoice->id ) ); ?>
		</a>
		<br />
		<a  aria-label="<?php echo esc_attr__( 'Edit Order', 'surecart' ); ?>" href="<?php echo esc_url( \SureCart::getUrl()->edit( 'invoice', $invoice->id ) ); ?>">
			<?php
			// translators: Customer name.
			echo esc_html( $invoice->customer->name ?? $invoice->customer->email );
			?>
		</a>
		<?php

		return ob_get_clean();
	}
}
