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
			"flip_layout"			=> false,
			"type_style"			=> '',
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
					$this->options['classes'] .= ' c-ArticleSplitHeader--with-excerpt';
					Self::$header_content = Self::build_content_alt($this->options);
					break;
			}
		}

		if($this->options['type_style']) {
			switch($this->options['type_style']) {
				case 'serif':
					$this->options['classes'] .= ' c-ArticleSplitHeader--serif';
					break;
				case 'sans-serif':
					$this->options['classes'] .= ' c-ArticleSplitHeader--sans-serif';
					break;
			}
		}

		if($this->options['additional_text']) {
			$this->options['additional_text'] = Self::additional_text($this->options['additional_text']);
		}

		if($this->options['flip_layout']) {
			$this->options['classes'] .= ' c-ArticleSplitHeader--reversed  ';
		}
	}

	public static function add_options($custom_options = array()) {

		return new self($custom_options);
	}

	private static function build_content($options) {

		$output = '';

		$output .= '<div class="[ c-ArticleSplitHeader__header-outer-wrapper ]">';
			$output .= '<div class="[ c-ArticleSplitHeader__header-wrap ]">';
				$output .= '<p class="[ c-ArticleSplitHeader__header ]">' . $options['header_text'] . '</p>';
				$output .= '<p class="[ c-ArticleSplitHeader__details ]">Issue ' . $options['issue_number']['name'] . '&nbsp;&nbsp;<span class="dot"></span>&nbsp;&nbsp;' . $options['read_time'] . '</p>';
			$output .= '</div>';
		$output .= '</div>';

		return $output;
	}

	private static function build_content_alt($options) {

		$output = '';

		$output .= '<div class="[ c-ArticleSplitHeader__header-outer-wrapper ]">';
			$output .= '<p class="[ c-ArticleSplitHeader__header ]">' . $options['header_text'] . '</p>';
			$output .= '<div class="[ c-ArticleSplitHeader__detail-wrap ]">';
				$output .= '<p class="[ c-ArticleSplitHeader__details ]">Issue ' . $options['issue_number']['name'] . '&nbsp;&nbsp;<span class="dot"></span>&nbsp;&nbsp;' . $options['read_time'] . '</p>';
				$output .= '<p class="[ c-ArticleSplitHeader__excerpt ]">' . $options['excerpt'] . '</p>';
			$output .= '</div>';
		$output .= '</div>';

		return $output;
	}

	private static function additional_text($data) {

		foreach ($data as $row) {

			if($row['acf_fc_layout'] === 'paragraph') {

				return '<div class="[ c-ArticleSplitHeader__additional-content-text ]">' . $row['text_area'] . '</div>';

			} else if($row['acf_fc_layout'] === 'large_text') {

				$quote_open = ($row['quote'] === true) ? '<q>' : '';
				$quote_close = ($row['quote'] === true) ? '</q>' : '';
				$classes .= ($row['align_text_center'] === true) ? 'l-ParagraphBlocks--text-center ' : '';
				return '<p class="[ l-ParagraphBlocks__large-text ' . $classes . ']">' . $quote_open . $row['text_area'] . $quote_close .'</p>';

			}
		}
	}

	public function render() { ?>

		<div class="[ c-ArticleSplitHeader <?= $this->options['classes']; ?> ]">
			<div class="[ c-ArticleSplitHeader__inner ]">
				<?php if($this->options['header_type'] === 'half-screen-v2') {
					echo '<p class="[ c-ArticleSplitHeader__header-mobile ]">' . $this->options['header_text'] . '</p>';
				} ?>
				<div class="[ c-ArticleSplitHeader__image ]">
					<?php echo LazyImage::get_image($this->options['image'], [50, 100], 'c-ArticleSplitHeader__image-half', true, false); ?>
				</div>
				<div class="[ c-ArticleSplitHeader__right ]">
					<?= Self::$header_content; ?>
					<div class="[ c-ArticleSplitHeader__additional-content ]">
						<?= $this->options['additional_text']; ?>
					</div>
				</div>
			</div>
		</div><?php
	}
}
