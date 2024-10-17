<div class="wrap">

	<?php
	echo wp_kses_post(
		\SureCart::notices()->render(
			[
				'name'  => 'invoice_info',
				'title' => esc_html__( 'What are Invoices?', 'surecart' ),
				'text'  => esc_html__( 'Invoices are similar to orders, but are used for payments and plan changes on active subscriptions. In the future you will be able to create an invoice to send out.', 'surecart' ),
			]
		)
	);
	?>

	<?php \SureCart::render( 'layouts/partials/admin-index-styles' ); ?>

	<?php
	\SureCart::render(
		'layouts/partials/admin-index-header',
		[
			'title' => __( 'Invoices', 'surecart' ),
		]
	);
	?>

	<?php $table->display(); ?>
</div>

