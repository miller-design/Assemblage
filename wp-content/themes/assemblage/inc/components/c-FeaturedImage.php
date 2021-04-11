<?php

if (!defined('ABSPATH')) exit;

/**
 * FeaturedImage Component Class.
 *
 * @class       FeaturedImage
 * @version     1.0.0
 */

class FeaturedImage {

	// setup

	private $options;

	public function __construct($custom_options) {

		SiteBase::insert_component_css(Self::class);

		$default_options = array(
			"image" 			=> '',
			"alignment" 	=> '',
			"classes"			=> '',
		);

		$this->options = $default_options;
		$this->options = array_merge($default_options, $custom_options);

		if($this->options["alignment"] === 'left') {
			$this->options["classes"] .= ' c-FeaturedImage--left ';
		} else if($this->options["alignment"] === 'right') {
			$this->options["classes"] .= ' c-FeaturedImage--right ';
		} else if($this->options["alignment"] === 'center') {
			$this->options["classes"] .= ' c-FeaturedImage--center ';
		} else if($this->options["alignment"] === 'center-small') {
			$this->options["classes"] .= ' c-FeaturedImage--center-small ';
		}
	}

	public static function add_options($custom_options = array()) {

		return new self($custom_options);
	}

	public static function add_acf($acf_item, $acf_override = null) {

		$acf_options = array(
			"image" => $acf_item['image'],
			"alignment" => $acf_item['align_image'],
		);

		return new self($acf_options);
	}

	public function render() { ?>

		<div class="[ c-FeaturedImage <?= $this->options["classes"]; ?>]">
			<div class="[ c-FeaturedImage__inner ]">
				<div class="[ c-FeaturedImage__image-wrap ]">
					<?= LazyImage::get_image($this->options["image"], 100, 'c-FeaturedImage__image js-parralax-image', true, false); ?>
				</div>
			</div>
		</div><?php
	}
}
