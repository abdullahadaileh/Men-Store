<?php

namespace SureCartBlocks\Blocks\Upsell\Upsell;

use SureCartBlocks\Blocks\BaseBlock;

/**
 * Upsell Description Block
 */
class Block extends BaseBlock {
	/**
	 * Render the block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content Post content.
	 *
	 * @return string
	 */
	public function render( $attributes, $content ) {
		return wp_sprintf(
			'<sc-upsell %s>%s</sc-upsell>',
			get_block_wrapper_attributes(),
			filter_block_content( $content, 'post' )
		);
	}
}
