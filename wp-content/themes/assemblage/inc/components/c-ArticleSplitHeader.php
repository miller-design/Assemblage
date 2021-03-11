<?php

if (!defined('ABSPATH')) exit;

/**
 * Article Split Header Component Class.
 *
 * @class       ArticleSplitHeader
 * @version     1.0.0
 */

class ArticleSplitHeader {

	// setup

	private $options;
	private static $header_content;

	public function __construct($custom_options) {

		SiteBase::insert_component_css(Self::class);

		$default_options = array(
			"image" 					=> '',
			"header_text"			=> '',
			"excerpt" 				=> '',
			"issue_number"		=> '',
			"term"						=> '',
			"read_time"				=> '',
			"header_type"			=> '',
			"additional_text"	=> '',
			"classes"					=> '',
		);

		$this->options = $default_options;
		$this->options = array_merge($default_options, $custom_options);

		if($this->options['header_type']) {
			switch($this->options['header_type']) {
				case 'half-screen-v1':
					Self::$header_content = Self::build_content($this->options);
					break;
				case 'half-screen-v2':
					$this->options['classes'] .= 'c-ArticleSplitHeader--with-excerpt';
					Self::$header_content = Self::build_content_alt($this->options);
					break;
				case 'half-screen-v3':
					$this->options['classes'] .= 'c-ArticleSplitHeader--with-excerpt c-ArticleSplitHeader--reversed  ';
					Self::$header_content = Self::build_content_alt($this->options);
					break;
			}
		}

		if($this->options['additional_text']) {
			$this->options['additional_text'] = Self::additional_text($this->options['additional_text']);
		}
	}

	public static function add_options($custom_options = array()) {

		return new self($custom_options);
	}

	private static function build_content($options) {

		$output = '';

		$output .= '<div class="[ c-ArticleSplitHeader__header-wrap ]">';
			$output .= '<p class="[ c-ArticleSplitHeader__header ]">' . $options['header_text'] . '</p>';
			$output .= '<p class="[ c-ArticleSplitHeader__details ]">Issue ' . $options['issue_number']['name'] . ', ' . $options['read_time'] . '</p>';
		$output .= '</div>';

		return $output;
	}

	private static function build_content_alt($options) {

		$output = '';

		$output .= '<p class="[ c-ArticleSplitHeader__header ]">' . $options['header_text'] . '</p>';
		$output .= '<div class="[ c-ArticleSplitHeader__detail-wrap ]">';
			$output .= '<p class="[ c-ArticleSplitHeader__details ]">' . $options['term']['name'] . ', Issue ' . $options['issue_number']['name'] . '</p>';
			$output .= '<p class="[ c-ArticleSplitHeader__excerpt ]">' . $options['excerpt'] . '</p>';
		$output .= '</div>';

		return $output;
	}

	private static function additional_text($data) {

		// once the layout compontns for text and breakout text is built add in here
	}

	public function render() { ?>

		<div class="[ c-ArticleSplitHeader <?= $this->options['classes']; ?> ]">
			<div class="[ c-ArticleSplitHeader__inner ]">
				<div class="[ c-ArticleSplitHeader__image ]">
					<?php echo LazyImage::get_image($this->options['image'], 'c-ArticleSplitHeader__image-half'); ?>
				</div>
				<div class="[ c-ArticleSplitHeader__content ]">
					<?= Self::$header_content; ?>
					<?= $this->options['additional_text']; ?>
				</div>
			</div>
		</div><?php
	}
}
