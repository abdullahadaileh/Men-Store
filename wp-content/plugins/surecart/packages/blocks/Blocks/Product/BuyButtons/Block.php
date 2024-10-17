<?php

namespace SureCartBlocks\Blocks\Product\BuyButtons;

use SureCartBlocks\Blocks\BaseBlock;

/**
 * Product Title Block
 */
class Block extends BaseBlock {
	/**
	 * Register the block.
	 *
	 * @return void
	 */
	public function register() {
		register_block_type_from_metadata(
			$this->getDir(),
		);
	}
}
