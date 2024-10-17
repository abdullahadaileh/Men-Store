<?php
/**
 * Shop page block template.
 */
return [
	'title'      => __( 'Cart', 'surecart' ),
	'categories' => [],
	'blockTypes' => [],
	'content'    => '<!-- wp:group {"align":"wide","layout":{"inherit":true,"type":"constrained"}} -->
	<div class="wp-block-group alignwide"><!-- wp:group {"align":"wide"} -->
	<div class="wp-block-group alignwide"><!-- wp:surecart/product-item-list {"limit":8,"align":"wide"} -->
	<!-- wp:surecart/product-item {"style":{"spacing":{"blockGap":"12px"}}} -->
	<!-- wp:surecart/product-item-image {"src":"","sizing":"cover","ratio":"1/1.33","style":{"border":{"radius":"6px"},"spacing":{"margin":{"bottom":"16px"}}}} /-->

	<!-- wp:surecart/product-item-title {"title":"Product Title","align":"left","style":{"typography":{"fontWeight":"400","fontSize":"14px","lineHeight":"1.2"},"spacing":{"margin":{"bottom":"10px"}},"color":{"text":"#374151"}}} /-->

	<!-- wp:surecart/product-item-price {"align":"left","style":{"color":{"text":"#111827"},"typography":{"fontSize":"18px","fontWeight":"500"}}} /-->
	<!-- /wp:surecart/product-item -->
	<!-- /wp:surecart/product-item-list --></div>
	<!-- /wp:group --></div>
	<!-- /wp:group -->',
];
