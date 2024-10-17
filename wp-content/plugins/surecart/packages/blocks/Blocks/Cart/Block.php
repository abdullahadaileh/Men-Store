<?php

namespace SureCartBlocks\Blocks\Cart;

use SureCartBlocks\Blocks\BaseBlock;

/**
 * Cart CTA Block.
 */
class Block extends BaseBlock {
	/**
	 * Render the block
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content Post content.
	 * @param object $block Block object.
	 *
	 * @return string
	 */
	public function render( $attributes, $content, $block = null ) {
		return filter_block_content( $content, 'post' );
	}
}
