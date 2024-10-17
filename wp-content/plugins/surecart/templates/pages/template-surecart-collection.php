<?php
get_header();
global $content_width;
echo '<style>
.wp-block-group {
	width: 100%;
}
.is-layout-constrained .alignwide {
	max-width: var(--wp--style--global--wide-size, ' . (int) ( $content_width ?? 1170 ) . 'px) !important;
	margin-left: auto;
	margin-right: auto;
}
</style>';
?>
<div class="wp-block-group is-layout-constrained" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70)">
	<div class="wp-block-group alignwide">
		<?php echo surecart_get_the_block_template_html( get_the_content() ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
	</div>
</div>
<?php
get_footer();
