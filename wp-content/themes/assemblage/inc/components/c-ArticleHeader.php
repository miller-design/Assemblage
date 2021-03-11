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
	private static $header;

	public function __construct($custom_options) {

		SiteBase::insert_component_css(Self::class);

		$default_options = array(
			"image" 				=> '',
			"header_text"		=> '',
			"excerpt" 			=> '',
			"issue_number"	=> '',
			"term"					=> '',
			"read_time"			=> '',
			"header_type"		=> '',
			"video_src"			=> '',
			"classes"				=> '',
		);

		$this->options = $default_options;
		$this->options = array_merge($default_options, $custom_options);

		if($this->options['header_type']) {
			switch($this->options['header_type']) {
				case 'full-screen':
					$this->options['classes'] .= 'c-ArticleHeader--full-screen ';
					Self::$header = Self::build_full_screen($this->options);
					break;
				case 'video':
					$this->options['classes'] .= 'c-ArticleHeader--video ';
					Self::$header = Self::build_video_header($this->options);
					break;
			}
		}
	}

	public static function add_options($custom_options = array()) {

		return new self($custom_options);
	}

	public static function add_acf($acf_item, $acf_override = null) {

		$acf_options = array(
			"header_type"		=> $acf_item['header_type'],
			"bg_color"			=> $acf_item['header_colour'],
			"video_src"			=> $acf_item['video_src'],
		);

		if($acf_override){
			$acf_options = array_merge($acf_options, $acf_override);
		}

		return new self($acf_options);
	}

	private static function build_full_screen($options) {

		$output = '';

		$output .= LazyImage::get_image($options['image'], 'c-ArticleHeader__image-bg');
		$output .= '<div class="[ c-ArticleHeader__content ]">';
			$output .= '<p class="[ c-ArticleHeader__header ]">';
				$output .= '<span class="[ c-ArticleHeader__header-highlight ]">' . $options['term']['name'] . '</span>';
				$output .= $options['header_text'];
			$output .= '</p>';
			$output .= '<p class="[ c-ArticleHeader__details ]">' . $options['term']['name'] . ', Issue ' . $options['issue_number']['name'] . '</p>';
		$output .= '</div>';

		return $output;
	}

	private static function build_video_header($options) {

		$output = '';

		$output .= '<div class="[ c-ArticleHeader__content ]">';
			$output .= '<p class="[ c-ArticleHeader__header ]">' . $options['header_text'] . '</p>';
			$output .= '<p class="[ c-ArticleHeader__details ]">' . $options['term']['name'] . ', Issue ' . $options['issue_number']['name'] . '</p>';
		$output .= '</div>';
		$output .= '<div class="[ c-ArticleHeader__video ]">';
			$output .= '<p class="[ c-ArticleHeader__details ]">Video Here</p>';
		$output .= '</div>';

		return $output;
	}

	public function render() { ?>

		<div class="[ c-ArticleHeader <?= $this->options['classes']; ?> ]">
			<div class="[ c-ArticleHeader__inner ]">
				<?= Self::$header; ?>
			</div>
		</div><?php
	}
}
