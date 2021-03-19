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
					$this->options['classes'] .= 'c-ArticleHeader--name-only ';
					Self::$header_type = Self::build_name_header($this->options);
					break;
				case 'small-image':
					$this->options['classes'] .= 'c-ArticleHeader--small-image ';
					Self::$header_type = Self::build_small_image_header($this->options);
					break;
			}
		}
	}

	public static function add_options($custom_options = array()) {

		return new self($custom_options);
	}

	public static function build_standard_header($data) {

		$output = '';

		$output .= '<div class="[ c-InterviewHeader__content ]">';
			$output .= '<p class="[ c-InterviewHeader__header ]">' . $data['header_text'] . '</p>';
			$output .= '<div class="[ c-InterviewHeader__detail-wrap ]">';
				$output .= '<p class="[ c-InterviewHeader__details ]">' . $data['term']['name'] . ', Issue ' . $data['issue_number']['name'] . '</p>';
				$output .= '<p class="[ c-InterviewHeader__excerpt ]">' . $data['excerpt'] . '</p>';
			$output .= '</div>';
		$output .= '</div>';
		$output .= '<div class="[ c-InterviewHeader__image ]">';
			$output .= LazyImage::get_image($data['image'], 'c-InterviewHeader__image-half');
		$output .= '</div>';

		return $output;

	}

	public static function build_name_header($data) {

		$output = '';

		$output .= '<div class="[ c-InterviewHeader__content ]">';
			$output .= '<p class="[ c-InterviewHeader__name first ]">' . $data['first_name'] . '</p>';
			$output .= '<p class="[ c-InterviewHeader__details ]">' . $data['term']['name'] . ', Issue ' . $data['issue_number']['name'] . '</p>';
			$output .= '<p class="[ c-InterviewHeader__name last ]">' . $data['first_name'] . '</p>';
		$output .= '</div>';
		$output .= '<div class="[ c-InterviewHeader__image ]">';
			$output .= LazyImage::get_image($data['image'], 'c-InterviewHeader__image-half');
		$output .= '</div>';

		return $output;

	}

	public static function build_small_image_header($data) {

		$output = '';

		$output .= '<div class="[ c-InterviewHeader__content ]">';
			$output .= '<p class="[ c-InterviewHeader__header ]">' . $data['header_text'] . '</p>';
			$output .= LazyImage::get_image($data['image'], 'c-InterviewHeader__small-img');
			$output .= '<div class="[ c-InterviewHeader__detail-wrap ]">';
				$output .= '<p class="[ c-InterviewHeader__details ]">' . $data['term']['name'] . ', Issue ' . $data['issue_number']['name'] . '</p>';
				$output .= '<p class="[ c-InterviewHeader__excerpt ]">' . $data['excerpt'] . '</p>';
			$output .= '</div>';
		$output .= '</div>';

		return $output;

	}

	public function render() { ?>

		<div class="[ c-InterviewHeader <?= $this->options['classes']; ?> ]" style="background-color: <?= $this->options['background_colour']; ?>;">
			<div class="[ c-InterviewHeader__inner ]">
				<?= Self::$header_type; ?>
			</div>
		</div><?php
	}
}
