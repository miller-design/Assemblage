<?php

if (!defined('ABSPATH')) exit;

/**
 * ArticleHeader Component Class.
 *
 * @class       ArticleHeader
 * @version     1.0.0
 */

class ArticleHeader {

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

	public function render() { ?>

		<div class="[ c-ArticleHeader ]">
			<div class="[ c-ArticleHeader__text ]">
				<?php echo $this->options['text']; ?>
			</div>
		</div><?php
	}
}
