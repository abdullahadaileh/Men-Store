<style>
	.wp-list-table .column-image {
		width: 40px;
	}

	.sc-product-name {
		display: flex;
		gap: 1em;
	}

	.sc-product-image-preview {
		width: 40px;
		height: 40px;
		object-fit: cover;
		background: #f3f3f3;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--sc-border-radius-small);
	}

</style>

<div class="wrap">
	<?php
	\SureCart::render(
		'layouts/partials/admin-index-header',
		[
			'title'    => __( 'Products', 'surecart' ),
			'new_link' => \SureCart::getUrl()->edit( 'product' ),
		]
	);
	?>

	<?php $table->search_form( __( 'Search Products', 'surecart' ), 'sc-search-products' ); ?>

	<form id="products-filter" method="get">
		<?php $table->views(); ?>
		<?php $table->display(); ?>
	</form>
</div>
