<?php

if (!defined('ABSPATH')) exit;

/**
 * FeaturedArticle Component Class.
 *
 * @class       FeaturedArticle
 * @version     1.0.0
 */

class FeaturedArticle {

	// setup

	private $options;
	private static $header;

	public function __construct($custom_options) {

		SiteBase::insert_component_css(Self::class);

		$default_options = array(
			"header_type"				=> '',
			"image" 						=> '',
			"header_text"				=> '',
			"excerpt" 					=> '',
			"issue_number"			=> '',
			"term"							=> '',
			"read_time"					=> '',
			"flip_layout"				=> '',
			"type_style"				=> '',
			"classes"						=> '',
		);

		$this->options = $default_options;
		$this->options = array_merge($default_options, $custom_options);

		if($this->options['header_type']) {
			switch($this->options['header_type']) {
				case 'full-screen':
					$this->options['classes'] .= 'c-FeaturedArticle--full-screen ';
					Self::$header = Self::build_full_screen($this->options);
					break;
				case 'split-screen':
					$this->options['classes'] .= 'c-FeaturedArticle--split ';
					Self::$header = Self::build_split_screen($this->options);
					break;
			}
		}

		if($this->options['type_style'] === 'serif') {
			$this->options['classes'] .= 'c-FeaturedArticle--serif ';
		} else {
			$this->options['classes'] .= 'c-FeaturedArticle--sans-serif ';
		}

		if($this->options['flip_layout'] === true && $this->options['header_type'] === 'split-screen' ) {
			$this->options['classes'] .= 'c-FeaturedArticle--reverse ';
		}
	}

	public static function add_options($custom_options = array()) {

		return new self($custom_options);
	}

	private static function build_full_screen($options) {

		$output = '';
		$output .= LazyImage::get_image($options['image'], 100, 'c-FeaturedArticle__image-bg');
		$output .= '<p class="[ c-FeaturedArticle__type ]">' . $options['term']['name'] . '</p>';
		$output .= '<div class="[ c-FeaturedArticle__content ]">';
			$output .= '<p class="[ c-FeaturedArticle__header ]">' . $options['header_text'] . '</p>';
			$output .= '<p class="[ c-FeaturedArticle__details ]">Issue ' . $options['issue_number']['name'] . '&nbsp;<span class="dot"></span>&nbsp;' . $options['read_time'] . '</p>';

		$output .= '</div>';

		return $output;
	}

	private static function build_split_screen($options) {

		$output = '';
		$output .= '<div class="[ c-FeaturedArticle__content-wrap ]">';
			$output .= '<p class="[ c-FeaturedArticle__type ]">' . $options['term']['name'] . '</p>';
			$output .= '<div class="[ c-FeaturedArticle__content ]">';
				$output .= '<p class="[ c-FeaturedArticle__header ]">' . $options['header_text'] . '</p>';
				$output .= '<p class="[ c-FeaturedArticle__details ]">Issue ' . $options['issue_number']['name'] . '&nbsp;<span class="dot"></span>&nbsp;' . $options['read_time'] . '</p>';
				$output .= '<p class="[ c-FeaturedArticle__excerpt ]">' . $options['excerpt'] . '</p>';
			$output .= '</div>';
		$output .= '</div>';
		$output .= '<div class="[ c-FeaturedArticle__image-wrap ]">';
			$output .= LazyImage::get_image($options['image'], [50, 100], 'c-FeaturedArticle__image');
		$output .= '</div>';

		return $output;
	}


	public function render() { ?>

		<div class="[ c-FeaturedArticle <?= $this->options['classes']; ?> ]">
			<div class="[ c-FeaturedArticle__inner ]">
				<?= Self::$header; ?>
			</div>
		</div><?php
	}
}
