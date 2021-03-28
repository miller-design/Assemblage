<?php

if (!defined('ABSPATH')) exit;

/**
 * InterviewHeader Header Component Class.
 *
 * @class       InterviewHeader
 * @version     1.0.0
 */

class InterviewHeader {

	// setup

	private $options;
	private static $header_type;

	public function __construct($custom_options) {

		SiteBase::insert_component_css(Self::class);

		$default_options = array(
			"image" 						=> '',
			"header_text"				=> '',
			"excerpt" 					=> '',
			"issue_number"			=> '',
			"term"							=> '',
			"read_time"					=> '',
			"background_colour" => '',
			"header_style"			=> '',
			"first_name"				=> '',
			"last_name"					=> '',
			"type_style"				=> '',
			"classes"						=> '',
		);

		$this->options = $default_options;
		$this->options = array_merge($default_options, $custom_options);

		if($this->options['header_style']) {
			switch($this->options['header_style']) {
				case 'default':
					Self::$header_type = Self::build_standard_header($this->options);
					break;
				case 'name-only':
					$this->options['classes'] .= 'c-InterviewHeader--name-only ';
					Self::$header_type = Self::build_name_header($this->options);
					break;
				case 'small-image':
					$this->options['classes'] .= 'c-InterviewHeader--small-image ';
					Self::$header_type = Self::build_small_image_header($this->options);
					break;
			}
		}

		if($this->options['type_style']) {
			switch($this->options['type_style']) {
				case 'serif':
					$this->options['classes'] .= 'c-InterviewHeader--serif ';
					break;
				case 'sans-serif':
					$this->options['classes'] .= 'c-InterviewHeader--sans-serif ';
					break;
			}
		}

		if($this->options["background_colour"]) {
			$this->options['classes'] .= ($this->options["background_colour"]['label'] === 'Black') ? 'c-InterviewHeader--white-text ' : 'c-InterviewHeader--black-text ';
			$this->options["background_colour"] = $this->options["background_colour"]['value'];
		}
	}

	public static function add_options($custom_options = array()) {

		return new self($custom_options);
	}

	public static function build_standard_header($data) {

		$output = '';

		$output .= '<div class="[ c-InterviewHeader__content standard ]">';
			$output .= '<p class="[ c-InterviewHeader__header ]">' . $data['header_text'] . '</p>';
			$output .= '<div class="[ c-InterviewHeader__detail-wrap ]">';
				$output .= '<p class="[ c-InterviewHeader__details ]">Issue ' . $data['issue_number']['name'] . '&nbsp;&nbsp;<span class="dot"></span>&nbsp;&nbsp;' . $data['read_time'] . '</p>';
				$output .= '<p class="[ c-InterviewHeader__excerpt ]">' . $data['excerpt'] . '</p>';
			$output .= '</div>';
		$output .= '</div>';
		$output .= '<div class="[ c-InterviewHeader__image standard ]">';
			$output .= '<p class="[ c-InterviewHeader__header-mobile ]">' . $data['header_text'] . '</p>';
				$output .= '<div class="[ c-InterviewHeader__image-wrap ]">';
				$output .= LazyImage::get_image($data['image'], [100], 'c-InterviewHeader__image-half', true, false);
			$output .= '</div>';

		$output .= '</div>';

		return $output;

	}

	public static function build_name_header($data) {

		$output = '';

		$output .= '<div class="[ c-InterviewHeader__content ]">';
			$output .= '<p class="[ c-InterviewHeader__name first ]">' . $data['first_name'] . '</p>';
			$output .= '<p class="[ c-InterviewHeader__details ]">Issue ' . $data['issue_number']['name'] . '&nbsp;&nbsp;<span class="dot"></span>&nbsp;&nbsp;' . $data['read_time'] . '</p>';
			$output .= '<p class="[ c-InterviewHeader__name last ]">' . $data['last_name'] . '</p>';
		$output .= '</div>';
		$output .= '<div class="[ c-InterviewHeader__image ]">';
			$output .= '<div class="[ c-InterviewHeader__image-wrap ]">';
				$output .= LazyImage::get_image($data['image'], [100], 'c-InterviewHeader__image-half', true, false);
			$output .= '</div>';
		$output .= '</div>';

		return $output;

	}

	public static function build_small_image_header($data) {

		$output = '';

		$output .= '<div class="[ c-InterviewHeader__content ]">';
			$output .= '<p class="[ c-InterviewHeader__header ]">' . $data['header_text'] . '</p>';
			$output .= '<div class="[ c-InterviewHeader__image-wrap ]">';
				$output .= LazyImage::get_image($data['image'], [50, 100], 'c-InterviewHeader__small-img', true, false);
			$output .= '</div>';
			$output .= '<div class="[ c-InterviewHeader__detail-wrap ]">';
				$output .= '<p class="[ c-InterviewHeader__details ]">Issue ' . $data['issue_number']['name'] . '&nbsp;&nbsp;<span class="dot"></span>&nbsp;&nbsp;' . $data['read_time'] . '</p>';
				$output .= '<p class="[ c-InterviewHeader__excerpt ]">' . $data['excerpt'] . '</p>';
			$output .= '</div>';
		$output .= '</div>';

		return $output;

	}

	public function render() { ?>

		<div class="[ c-InterviewHeader <?= $this->options['classes']; ?> ]" style="--bg-color: <?= $this->options['background_colour']; ?>;">
			<div class="[ c-InterviewHeader__inner ]">
				<?= Self::$header_type; ?>
			</div>
		</div><?php
	}
}
