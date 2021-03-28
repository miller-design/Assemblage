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
			"image" 						=> '',
			"header_text"				=> '',
			"excerpt" 					=> '',
			"issue_number"			=> '',
			"term"							=> '',
			"read_time"					=> '',
			"header_type"				=> '',
			"video_src"					=> '',
			"background_colour" => '',
			"type_style"				=> '',
			"text_alignment"		=> '',
			"classes"						=> '',
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

		if($this->options['type_style']) {
			switch($this->options['type_style']) {
				case 'serif':
					$this->options['classes'] .= 'c-ArticleHeader--serif ';
					break;
				case 'sans-serif':
					$this->options['classes'] .= 'c-ArticleHeader--sans-serif ';
					break;
			}
		}

		if($this->options['text_alignment']) {
			switch($this->options['text_alignment']) {
				case 'left':
					$this->options['classes'] .= 'c-ArticleHeader--text-left ';
					break;
				case 'center':
					$this->options['classes'] .= 'c-ArticleHeader--text-center ';
					break;
			}
		}

		if($this->options["background_colour"]) {
			$this->options['classes'] .= ($this->options["background_colour"]['label'] === 'Black') ? 'c-ArticleHeader--white-text ' : 'c-ArticleHeader--black-text ';
			$this->options["background_colour"] = $this->options["background_colour"]['value'];
		}
	}

	public static function add_options($custom_options = array()) {

		return new self($custom_options);
	}

	private static function build_full_screen($options) {

		$output = '';

		$output .= '<div class="[ c-ArticleHeader__image-wrap ]">';
			$output .= LazyImage::get_image($options['image'], 100, 'c-ArticleHeader__image-bg', true, false);
		$output .= '</div>';
		$output .= '<div class="[ c-ArticleHeader__inner ]">';
			$output .= '<div class="[ c-ArticleHeader__content ]">';
				$output .= '<p class="[ c-ArticleHeader__header ]">' . $options['header_text'] . '</p>';
				$output .= '<p class="[ c-ArticleHeader__details ]">Issue ' . $options['issue_number']['name'] . '&nbsp;&nbsp;<span class="dot"></span>&nbsp;&nbsp;' . $options['read_time'] . '</p>';
			$output .= '</div>';
		$output .= '</div>';

		return $output;
	}

	private static function build_video_header($options) {

		$vid_options = [
			"video_url" 				=> $options['video_src'],
			"autoplay"  				=> false,
			"echo"							=> false
		];

		$output = '';
		$output .= '<div class="[ c-ArticleHeader__inner ]">';
			$output .= '<div class="[ c-ArticleHeader__content ]">';
				$output .= '<p class="[ c-ArticleHeader__header ]">' . $options['header_text'] . '</p>';
				$output .= '<p class="[ c-ArticleHeader__details ]">Issue ' . $options['issue_number']['name'] . '&nbsp;&nbsp;<span class="dot"></span>&nbsp;&nbsp;Video [<span class="[ js-video-duration ]"></span>]</p>';
			$output .= '</div>';
			$output .= '<div class="[ c-ArticleHeader__video ]">';
				$output .= Video::add_options($vid_options)->render();
			$output .= '</div>';
		$output .= '</div>';

		return $output;
	}

	public function render() { ?>

		<div class="[ c-ArticleHeader <?= $this->options['classes']; ?> ]" style="--bg-color: <?= $this->options['background_colour']; ?>;">
			<?= Self::$header; ?>
		</div><?php
	}
}
