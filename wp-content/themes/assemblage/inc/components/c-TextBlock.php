<?php

if (!defined('ABSPATH')) exit;

/**
 * TextBlock Component Class.
 *
 * @class       TextBlock
 * @version     1.0.0
 */

class TextBlock {

	// setup

	private $options;

	public function __construct($custom_options) {

		SiteBase::insert_component_css(Self::class);

		$default_options = array(
			"text" => 'Default Text'
		);

		$this->options = $default_options;
		$this->options = array_merge($default_options, $custom_options);
	}

	public static function add_options($custom_options = array()) {

		return new self($custom_options);
	}

	public static function block_settings() {

		return array(
			'title' => __('TextBlock'),
			'description' => __('A pargraph block.'),
			'category' => 'Text',
			'icon' => 'admin-comments',
			'keywords' => array('text', 'layout'),
		);
	}

	public static function add_block($block) {

		$options = array(
			'text' => get_field('text_block'),
		);

		// don't load the link in the admin, the block won't be clickable!
		// if(!is_admin()) {
		// 	$options['link'] = get_field('link');
		// }

		self::add_options($options)->render();
	}

	public function render() { ?>

		<div class="[ c-TextBlock ]">
			<div class="[ c-TextBlock__text ]">
				<?php echo $this->options['text']; ?>
			</div>
		</div><?php
	}
}
