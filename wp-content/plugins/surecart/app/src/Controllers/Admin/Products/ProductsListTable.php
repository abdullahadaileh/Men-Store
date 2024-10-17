<?php

namespace SureCart\Controllers\Admin\Products;

use SureCart\Models\Product;
use SureCart\Support\TimeDate;
use SureCart\Controllers\Admin\Tables\ListTable;
use SureCart\Models\ProductCollection;

/**
 * Create a new table class that will extend the WP_List_Table
 */
class ProductsListTable extends ListTable {
	/**
	 * The checkbox.
	 *
	 * @var bool
	 */
	public $checkbox = true;

	/**
	 * The error message.
	 *
	 * @var string
	 */
	public $error = '';

	/**
	 * The list of pages.
	 *
	 * @var array
	 */
	public $pages = array();

	/**
	 * The BulkActionService instance.
	 *
	 * @var \SureCart\Background\BulkActionService
	 */
	public $bulk_actions = null;

	/**
	 * Constructor.
	 *
	 * @param \SureCart\Background\BulkActionService $bulk_actions The BulkActionService instance.
	 */
	public function __construct( \SureCart\Background\BulkActionService $bulk_actions ) {
		parent::__construct();

		$this->bulk_actions = $bulk_actions;

		add_action( 'admin_notices', [ $this, 'show_bulk_action_admin_notice' ] );
	}

	/**
	 * Show bulk action admin notice.
	 */
	public function show_bulk_action_admin_notice() {
		$this->bulk_actions->showBulkActionAdminNotice( 'delete_products' );
	}

	/**
	 * Prepare the items for the table to process
	 *
	 * @return void
	 */
	public function prepare_items() {
		$columns  = $this->get_columns();
		$hidden   = $this->get_hidden_columns();
		$sortable = $this->get_sortable_columns();

		$this->_column_headers = array( $columns, $hidden, $sortable );

		$query = $this->table_data();

		if ( is_wp_error( $query ) ) {
			$this->error = $query->get_error_message();
			$this->items = array();
			return;
		}

		$this->set_pagination_args(
			array(
				'total_items' => $query->pagination->count,
				'per_page'    => $this->get_items_per_page( 'products' ),
			)
		);

		$this->items = $query->data;
	}

	/**
	 * Get views for the list table status links.
	 *
	 * @global int $post_id
	 * @global string $comment_status
	 * @global string $comment_type
	 */
	protected function get_views() {
		$statuses = array(
			'active'   => __( 'Active', 'surecart' ),
			'archived' => __( 'Archived', 'surecart' ),
			'all'      => __( 'All', 'surecart' ),
		);

		foreach ( $statuses as $status => $label ) {
			$link = admin_url( 'admin.php?page=sc-products' );
			$current_link_attributes = '';

			if ( ! empty( $_GET['status'] ) ) {
				if ( $status === $_GET['status'] ) {
					$current_link_attributes = ' class="current" aria-current="page"';
				}
			} elseif ( 'active' === $status ) {
				$current_link_attributes = ' class="current" aria-current="page"';
			}

			$link = add_query_arg( 'status', $status, $link );

			$link = esc_url( $link );

			$status_links[ $status ] = "<a href='$link'$current_link_attributes>" . $label . '</a>';
		}

		/**
		 * Filters the comment status links.
		 *
		 * @since 2.5.0
		 * @since 5.1.0 The 'Mine' link was added.
		 *
		 * @param string[] $status_links An associative array of fully-formed comment status links. Includes 'All', 'Mine',
		 *                              'Pending', 'Approved', 'Spam', and 'Trash'.
		 */
		return apply_filters( 'comment_status_links', $status_links );
	}

	/**
	 * Override the parent columns method. Defines the columns to use in your listing table
	 *
	 * @return array
	 */
	public function get_columns() {
		return array(
			'cb'                  => '<input type="checkbox" />',
			'name'                => __( 'Name', 'surecart' ),
			'price'               => __( 'Price', 'surecart' ),
			'commission_amount'   => __( 'Commission Amount', 'surecart' ),
			'quantity'            => __( 'Quantity', 'surecart' ),
			'integrations'        => __( 'Integrations', 'surecart' ),
			'product_collections' => __( 'Collections', 'surecart' ),
			'status'              => __( 'Product Page', 'surecart' ),
			'featured'            => __( 'Featured', 'surecart' ),
			'date'                => __( 'Date', 'surecart' ),
		);
	}

	/**
	 * Displays the checkbox column.
	 *
	 * @param Product $product The product model.
	 */
	public function column_cb( $product ) {
		?>
		<label class="screen-reader-text" for="cb-select-<?php echo esc_attr( $product['id'] ); ?>"><?php _e( 'Select comment', 'surecart' ); ?></label>
		<input id="cb-select-<?php echo esc_attr( $product['id'] ); ?>" type="checkbox" name="bulk_action_product_ids[]" value="<?php echo esc_attr( $product['id'] ); ?>" />
			<?php
	}

	/**
	 * Show the quantity.
	 *
	 * @param Product $product The product model.
	 */
	public function column_quantity( $product ) {
		// translators: %d is the number of available stock.
		return $product->stock_enabled ? sprintf( __( '%d Available', 'surecart' ), $product->available_stock ) : '∞';
	}

	/**
	 * Show the affiliate commission amount.
	 *
	 * @param Product $product The product model.
	 */
	public function column_commission_amount( $product ) {
		return $product->commission_structure->commission_amount ?? '-';
	}

	/**
	 * Show collections as tags.
	 *
	 * @param Product $product The product model.
	 */
	public function column_product_collections( $product ) {
		$product_collections = $product->product_collections->data ?? array();

		// this has no collection.
		if ( empty( $product_collections ) ) {
			return '-';
		}

		$product_collections_tags = array();

		foreach ( $product_collections as $product_collection ) {
			$product_collections_tags[] = '<a href="' . esc_url( admin_url( 'admin.php?page=sc-products&sc_collection=' . $product_collection['id'] ) ) . '">' . $product_collection['name'] . '</a>';
		}

		return implode( ', ', $product_collections_tags );
	}

	/**
	 * Show any integrations.
	 */
	public function column_integrations( $product ) {
		$list = $this->productIntegrationsList( [ 'product_id' => $product->id ] );
		return $list ? $list : '-';
	}

	/**
	 * Define which columns are hidden
	 *
	 * @return array
	 */
	public function get_hidden_columns() {
		return array(
			'commission_amount',
		);
	}

	/**
	 * Define the sortable columns
	 *
	 * @return array
	 */
	public function get_sortable_columns() {
		return array( 'title' => array( 'title', false ) );
	}

	/**
	 * Get the table data
	 *
	 * @return array
	 */
	private function table_data() {
		$product_query = Product::where(
			array(
				'archived' => $this->getArchiveStatus(),
				'query'    => $this->get_search_query(),
				'cached'   => false
			)
		)->with(
			array(
				'prices',
				'product_collections',
				'featured_product_media',
				'product_media.media',
				'commission_structure',
			)
		);

		// Check if there is any sc_collection in the query, then filter it.
		if ( ! empty( $_GET['sc_collection'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			$product_query->where(
				array(
					'product_collection_ids' => array( sanitize_text_field( wp_unslash( $_GET['sc_collection'] ) ) ),  // phpcs:ignore WordPress.Security.NonceVerification.Recommended
				)
			);
		}

		return $product_query->paginate(
			array(
				'per_page' => $this->get_items_per_page( 'products' ),
				'page'     => $this->get_pagenum(),
			)
		);
	}

	/**
	 * Nothing found.
	 *
	 * @return void
	 */
	public function no_items() {
		if ( $this->error ) {
			echo esc_html( $this->error );
			return;
		}
		echo esc_html_e( 'No products found.', 'surecart' );
	}

	/**
	 * Handle the type column output.
	 *
	 * @param \SureCart\Models\Price $product Product model.
	 *
	 * @return string
	 */
	public function column_type( $product ) {
		if ( $product->recurring ) {
			return '<sc-tag type="success">
			<div
				style="
					display: flex;
					align-items: center;
					gap: 0.5em;"
			>
				<sc-icon name="repeat"></sc-icon>
				' . esc_html__( 'Subscription', 'surecart' ) . '
			</div>
		</sc-tag>';
		}

		return '<sc-tag type="info">
		<div
			style="
				display: flex;
				align-items: center;
				gap: 0.5em;"
		>
			<sc-icon name="bookmark"></sc-icon>
			' . esc_html__( 'One-Time', 'surecart' ) . '
		</div>
	</sc-tag>';
	}

	/**
	 * Handle the price column.
	 *
	 * @param \SureCart\Models\Product $product Product model.
	 *
	 * @return string
	 */
	public function column_price( $product ) {
		$prices = $product->prices->data ?? array();

		// this has no prices.
		if ( empty( $prices ) || ! is_array( $prices ) ) {
			return '<sc-tag type="warning">' . esc_html__( 'No price', 'surecart' ) . '</sc-tag>';
		}

		// map the prices into an array of formatted price strings.
		$price_display = array_map(
			function ( $price ) {
				if ( $price->ad_hoc ) {
					return esc_html__( 'Name your own price', 'surecart' );
				}
				if ( 0 === $price->amount ) {
					return esc_html__( 'Free', 'surecart' );
				}
				return '<sc-format-number type="currency" currency="' . $price->currency . '" value="' . $price->amount . '"></sc-format-number>';     },
			$prices
		);

		// combine into string with commas.
		$price_output = implode( ', ', array_slice( $price_display, 0, 2 ) );

		if ( $product->metrics->prices_count > 2 ) {
			// translators: %d is the number of other prices.
			$price_output .= sprintf( _n( ' and %d other price.', ' and %d other prices.', $product->metrics->prices_count - 2, 'surecart' ), $product->metrics->prices_count - 2 );
		}

		return $price_output;
	}

	/**
	 * Handle the status
	 *
	 * @param \SureCart\Models\Price $product Product model.
	 *
	 * @return string
	 */
	public function column_date( $product ) {
		$created = sprintf(
			'<time datetime="%1$s" title="%2$s">%3$s</time>',
			esc_attr( $product->created_at ),
			esc_html( TimeDate::formatDateAndTime( $product->created_at ) ),
			esc_html( TimeDate::humanTimeDiff( $product->created_at ) )
		);
		$updated = sprintf(
			'%1$s <time datetime="%2$s" title="%3$s">%4$s</time>',
			__( 'Updated', 'surecart' ),
			esc_attr( $product->updated_at ),
			esc_html( TimeDate::formatDateAndTime( $product->updated_at ) ),
			esc_html( TimeDate::humanTimeDiff( $product->updated_at ) )
		);
		return $created . '<br /><small style="opacity: 0.75">' . $updated . '</small>';
	}

	/**
	 * Published column
	 *
	 * @param \SureCart\Models\Product $product Product model.
	 *
	 * @return string
	 */
	public function column_featured( $product ) {
		ob_start();
		?>
			<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="<?php echo $product->featured ? 'currentColor' : 'none'; ?>" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
			</svg>
		<?php
		return ob_get_clean();
	}

	/**
	 * Published column
	 *
	 * @param \SureCart\Models\Product $product Product model.
	 *
	 * @return string
	 */
	public function column_status( $product ) {
		ob_start();
		?>
		<?php if ( 'published' === ( $product->status ?? '' ) ) : ?>
			<sc-tag type="success"><?php esc_html_e( 'Published', 'surecart' ); ?></sc-tag>
		<?php else : ?>
			<sc-tag><?php esc_html_e( 'Draft', 'surecart' ); ?></sc-tag>
		<?php endif; ?>
		<?php
		return ob_get_clean();
	}

	/**
	 * Name column
	 *
	 * @param \SureCart\Models\Product $product Product model.
	 *
	 * @return string
	 */
	public function column_name( $product ) {
		$pending_record_ids    = $this->bulk_actions->getRecordIds( 'delete_products', 'pending' );
		$processing_record_ids = $this->bulk_actions->getRecordIds( 'delete_products', 'processing' );
		$succeeded_record_ids  = $this->bulk_actions->getRecordIds( 'delete_products', 'succeeded' );
		$bulk_status           = '';
		if ( ! empty( $pending_record_ids ) && in_array( $product->id, $pending_record_ids ) ) {
			$bulk_status = 'pending';
		} elseif ( ! empty( $processing_record_ids ) && in_array( $product->id, $processing_record_ids ) ) {
			$bulk_status = 'processing';
		} elseif ( ! empty( $succeeded_record_ids ) && in_array( $product->id, $succeeded_record_ids ) ) {
			$bulk_status = 'succeeded';
		}

		ob_start();
		?>

		<div class="sc-product-name">
		<?php if ( $product->featured_media->url ) { ?>
			<img src="<?php echo esc_url( $product->featured_media->url ); ?>" alt="<?php echo esc_attr( $product->featured_media->alt ); ?>" title="<?php echo esc_attr( $product->featured_media->title ); ?>" class="sc-product-image-preview" />
		<?php } else { ?>
			<div class="sc-product-image-preview">
				<svg xmlns="http://www.w3.org/2000/svg" style="width: 18px; height: 18px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
			</div>
		<?php } ?>

		<div>
		<a class="row-title" aria-label="<?php esc_attr_e( 'Edit Product', 'surecart' ); ?>" href="<?php echo esc_url( \SureCart::getUrl()->edit( 'product', $product->id ) ); ?>">
			<?php echo esc_html( $product->name ); ?>
		</a>

		<?php echo wp_kses_post( $this->getRowActions( $product, $bulk_status ) ); ?>
		</div>

		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Get row actions.
	 *
	 * @param \SureCart\Models\Product $product Product model.
	 *
	 * @return array
	 */
	public function getRowActions( $product, $bulk_status ) {
		if ( 'succeeded' === $bulk_status ) {
			return '<div>' . esc_html__( 'Successfully deleted.', 'surecart' ) . '</div>';
		}

		if ( 'pending' === $bulk_status || 'processing' === $bulk_status ) {
			return '<div>' . esc_html__( 'Queued for deletion.', 'surecart' ) . '</div>';
		}

		return $this->row_actions(
			[
				'edit'         => '<a href="' . esc_url( \SureCart::getUrl()->edit( 'product', $product->id ) ) . '" aria-label="' . esc_attr( 'Edit Product', 'surecart' ) . '">' . esc_html__( 'Edit', 'surecart' ) . '</a>',
				'trash'        => $this->action_toggle_archive( $product ),
				'view_product' => '<a href="' . esc_url( $product->permalink ) . '" aria-label="' . esc_attr( 'View', 'surecart' ) . '">' . esc_html__( 'View', 'surecart' ) . '</a>',
			]
		);
	}

	/**
	 * Toggle archive action link and text.
	 *
	 * @param \SureCart\Models\Product $product Product model.
	 * @return string
	 */
	public function action_toggle_archive( $product ) {
		$text            = $product->archived ? __( 'Un-Archive', 'surecart' ) : __( 'Archive', 'surecart' );
		$confirm_message = $product->archived ? __( 'Are you sure you want to restore this product? This will be be available to purchase.', 'surecart' ) : __( 'Are you sure you want to archive this product? This will be unavailable for purchase.', 'surecart' );
		$link            = \SureCart::getUrl()->toggleArchive( 'product', $product->id );

		return sprintf(
			'<a class="submitdelete" onclick="return confirm(\'%1s\')" href="%2s" aria-label="%3s">%4s</a>',
			esc_attr( $confirm_message ),
			esc_url( $link ),
			esc_attr__( 'Toggle Product Archive', 'surecart' ),
			esc_html( $text )
		);
	}

	/**
	 * Define what data to show on each column of the table
	 *
	 * @param \SureCart\Models\Product $product Product model.
	 * @param String                   $column_name - Current column name.
	 *
	 * @return Mixed
	 */
	public function column_default( $product, $column_name ) {
		switch ( $column_name ) {
			case 'name':
				return '<a href="' . \SureCart::getUrl()->edit( 'product', $product->id ) . '">' . $product->name . '</a>';
			case 'name':
			case 'description':
				return $product->$column_name ?? '';
		}
	}

	/**
	 * Displays extra table navigation.
	 *
	 * @param string $which Top or bottom placement.
	 */
	protected function extra_tablenav( $which ) {
		?>
		<input type="hidden" name="page" value="sc-products" />

		<?php if ( ! empty( $_GET['status'] ) ) : // phpcs:ignore WordPress.Security.NonceVerification.Recommended ?>
			<input type="hidden" name="status" value="<?php echo esc_attr( $_GET['status'] ); ?>" />
		<?php endif; ?>

		<div class="alignleft actions">
		<?php
		if ( 'top' === $which ) {
			ob_start();
			$this->product_collection_dropdown();

			/**
			 * Fires before the Filter button on the product list tables.
			 *
			 * The Filter button allows sorting by date and/or category on the
			 * Posts list table, and sorting by date on the Pages list table.
			 *
			 * @param string $post_type The post type slug.
			 * @param string $which     The location of the extra table nav markup:
			 *                          'top' or 'bottom' for WP_Posts_List_Table,
			 *                          'bar' for WP_Media_List_Table.
			 */
			do_action( 'restrict_manage_products', $this->screen->post_type, $which );

			$output = ob_get_clean();

			if ( ! empty( $output ) ) {
				echo $output; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				submit_button( __( 'Filter', 'surecart' ), '', 'filter_action', false, array( 'id' => 'filter-by-collection-submit' ) );
			}
		}
		?>
		</div>

		<?php
		/**
		 * Fires immediately following the closing "actions" div in the tablenav
		 * for the products list table.
		 *
		 * @param string $which The location of the extra table nav markup: 'top' or 'bottom'.
		 */
		do_action( 'manage_products_extra_tablenav', $which );
	}

	/**
	 * @return array
	 */
	protected function get_bulk_actions() {
		$actions           = array();
		$actions['delete'] = __( 'Delete permanently', 'surecart' );
		return $actions;
	}

	/**
	 * Gets the current action selected from the bulk actions dropdown.
	 *
	 * @return string|false The action name. False if no action was selected.
	 */
	public function current_action() {
		if ( ! empty( $_REQUEST['delete_all'] ) ) {
			return 'delete_all';
		}

		return parent::current_action();
	}

	/**
	 * Displays a a dropdown to filter by product collection.
	 *
	 * @access protected
	 */
	protected function product_collection_dropdown() {
		/**
		 * Filters whether to remove the 'Formats' drop-down from the product list table.
		 *
		 * @param bool   $disable   Whether to disable the drop-down. Default false.
		 */
		if ( apply_filters( 'surecart/disable_product_collection_dropdown', false ) ) {
			return;
		}

		$product_collections  = ProductCollection::get( array( 'per_page' => -1 ) );
		$displayed_collection = isset( $_GET['sc_collection'] ) ? sanitize_text_field( wp_unslash( $_GET['sc_collection'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		?>

		<label for="filter-by-collection" class="screen-reader-text">
			<?php esc_html_e( 'Filter by Product Collection', 'surecart' ); ?>
		</label>
		<select name="sc_collection" id="filter-by-collection">
			<option <?php selected( $displayed_collection, '' ); ?> value=""><?php esc_html_e( 'All Product Collections', 'surecart' ); ?></option>
			<?php foreach ( $product_collections as $collection ) : ?>
				<option <?php selected( $displayed_collection, $collection->id ); ?> value="<?php echo esc_attr( $collection->id ); ?>"><?php echo esc_html( $collection->name ); ?></option>
			<?php endforeach; ?>
		</select>
		<?php
	}
}
