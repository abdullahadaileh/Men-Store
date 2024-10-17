<?php
/**
 * Returns the markup for the current template.
 *
 * @access private
 * @since 5.8.0
 *
 * @global string   $_wp_current_template_content
 * @global WP_Embed $wp_embed
 *
 * @return string Block template markup.
 */
function surecart_get_the_block_template_html( $template_content ) {
	global $wp_embed;

	if ( ! $template_content ) {
		if ( is_user_logged_in() ) {
			return '<h1>' . esc_html__( 'No matching template found' ) . '</h1>';
		}
		return;
	}

	$content = $wp_embed->run_shortcode( $template_content );
	$content = $wp_embed->autoembed( $content );
	$content = do_blocks( $content );
	$content = wptexturize( $content );
	$content = convert_smilies( $content );
	$content = shortcode_unautop( $content );
	$content = wp_filter_content_tags( $content, 'template' );
	$content = do_shortcode( $content );
	$content = str_replace( ']]>', ']]&gt;', $content );

	// Wrap block template in .wp-site-blocks to allow for specific descendant styles
	// (e.g. `.wp-site-blocks > *`).
	return '<div class="wp-site-blocks">' . $content . '</div>';
}
