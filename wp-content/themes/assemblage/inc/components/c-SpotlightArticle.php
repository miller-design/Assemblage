<?php

if (!defined('ABSPATH')) exit;

/**
 * Sptlight Article Component Class.
 *
 * @class       SptlightArticle
 * @version     1.0.0
 */

class SptlightArticle {

	// setup

	private $options;
	private static $header;

	public function __construct($custom_options) {

		SiteBase::insert_component_css(Self::class);

		$default_options = array(
			"image" 						=> '',
			"header_text"				=> '',
			"excerpt" 					=> '',
			"issue_number"			=> '',
			"term"							=> '',
			"classes"						=> '',
		);

		$this->options = $default_options;
		$this->options = array_merge($default_options, $custom_options);

	}

	public static function add_options($custom_options = array()) {

		return new self($custom_options);
	}

	public function render() { ?>

		<div class="[ c-SptlightArticle <?= $this->options['classes']; ?> ]">
			<div class="[ c-SptlightArticle__inner ]">
				<span>Spotlight</span>
			</div>
		</div><?php
	}
}
