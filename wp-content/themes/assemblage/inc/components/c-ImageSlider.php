<?php

if (!defined('ABSPATH')) exit;

/**
 * ImageSlider Component Class.
 *
 * @class       ImageSlider
 * @version     1.0.0
 */

class ImageSlider {

	// setup
	private $options;

	public function __construct($custom_options) {

		SiteBase::insert_component_css(Self::class);

		$default_options = array(
			"images" 			=> '',
			"classes"			=> '',
		);

		$this->options = $default_options;
		$this->options = array_merge($default_options, $custom_options);

		if($this->options['images']) {
			$this->options['images'] = Self::build_image_cells($this->options['images']);
		}
	}

	public static function add_options($custom_options = array()) {

		return new self($custom_options);
	}

	public static function add_acf($acf_item, $acf_override = null) {

		$acf_options = array(
			"images" => $acf_item['images'],
		);

		return new self($acf_options);
	}

	private function build_image_cells($data) {

		$output = '';
		foreach ($data as $slide) {
			$output .= '<div class="[ c-ImageSlider__slide ]" g-ref="slide">';
				$output .= LazyImage::get_image($slide['image'], [65, 100], 'c-ImageSlider__image', true, false);
				$output .= '<p class="[ l-ParagraphBlocks__image-caption ]">' . $slide['caption'] . '</p>';
			$output .= '</div>';
		}

		return $output;
	}

	public function render() { ?>

		<div class="[ c-ImageSlider ]" g-component="ImageSlider">
			<div class="[ c-ImageSlider__col ]">
				<div class="[ c-ImageSlider__wrapper ]" g-ref="slider">
					<?= $this->options['images']; ?>
				</div>
			</div>
		</div><?php
	}
}
