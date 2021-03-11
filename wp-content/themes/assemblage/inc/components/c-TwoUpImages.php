<?php

if (!defined('ABSPATH')) exit;

/**
 * TwoUpImages Component Class.
 *
 * @class       TwoUpImages
 * @version     1.0.0
 */

class TwoUpImages {

	// setup
	private $options;

	public function __construct($custom_options) {

		SiteBase::insert_component_css(Self::class);

		$default_options = array(
			"layout" 				=> '',
			"image_left"		=> '',
			"image_right"		=> '',
			"caption_left"	=> '',
			"caption_right"	=> '',
			"classes"				=> '',
		);

		$this->options = $default_options;
		$this->options = array_merge($default_options, $custom_options);

		if($this->options["layout"] === 'v1') {
			$this->options["classes"] .= ' c-TwoUpImages--offset-images ';
			$this->options["image_left"] = LazyImage::get_image($this->options["image_left"], [30, 50, 100], 'c-TwoUpImages__image', true, false);
			$this->options["image_right"] = LazyImage::get_image($this->options["image_right"], [50, 100], 'c-TwoUpImages__image', true, false);
			$this->options["caption_left"] = '<p class="[ c-TwoUpImages__caption left ]">' . $this->options["caption_left"] . '</p>';
			$this->options["caption_right"] = '<p class="[ c-TwoUpImages__caption right ]">' . $this->options["caption_right"] . '</p>';

		} else if($this->options["layout"] === 'v2') {
			$this->options["classes"] .= ' c-TwoUpImages--equal-images ';
			$this->options["image_left"] = LazyImage::get_image($this->options["image_left"], [50, 100], 'c-TwoUpImages__image', true, false);
			$this->options["image_right"] = LazyImage::get_image($this->options["image_right"], [50, 100], 'c-TwoUpImages__image', true, false);
		}
	}

	public static function add_options($custom_options = array()) {

		return new self($custom_options);
	}

	public static function add_acf($acf_item, $acf_override = null) {

		$acf_options = array(
			"layout" 				=> $acf_item['image_layout'],
			"image_left"		=> $acf_item['image_left'],
			"image_right"		=> $acf_item['image_right'],
			"caption_left"	=> $acf_item['caption_left'],
			"caption_right"	=> $acf_item['caption_right'],
		);

		return new self($acf_options);
	}

	public function render() { ?>

		<div class="[ c-TwoUpImages <?= $this->options["classes"]; ?>]">
			<div class="[ c-TwoUpImages__inner ]">
				<div class="[ c-TwoUpImages__left ]">
					<?= $this->options["image_left"]; ?>
					<div class="[ c-TwoUpImages__captions ]">
						<?= $this->options["caption_left"]; ?>
						<?= $this->options["caption_right"]; ?>
					</div>
				</div>
				<div class="[ c-TwoUpImages__right ]">
					<?= $this->options["image_right"]; ?>
				</div>
			</div>
		</div><?php
	}
}
