<?php

if (!defined('ABSPATH')) exit;

/**
 * Hero Component Class.
 *
 * @class       Hero
 * @version     1.0.0
 */

class Hero {

	// setup
	private $options;
	private static $header;

	public function __construct($custom_options) {

		SiteBase::insert_component_css(Self::class);

		$default_options = array(
			"image" 						=> '',
			"issue_number"			=> '',
			"issue_name"				=> '',
			"issue_text"				=> '',
			"issue_link"				=> '',
			"bio_text"					=> '',
			"classes"						=> '',
		);

		$this->options = $default_options;
		$this->options = array_merge($default_options, $custom_options);

		if($this->options['image']) {
			$this->options['image'] = LazyImage::get_image($this->options['image'], [100], 'c-Hero__image', true, false);
		}

		if($this->options['issue_name']) {
			$this->options['issue_name'] = '<p class="[ c-Hero__header ]">Issue ' . $this->options['issue_number'] . ' : ' . $this->options['issue_name'] . '</p>';
		}

		if($this->options['issue_text']) {
			$this->options['issue_text'] = '<p class="[ c-Hero__excerpt ]">Issue ' . $this->options['issue_text'] . '</p>';
		}

		if($this->options['issue_link']) {
			$this->options['issue_link'] = '<a href="' . $this->options['issue_link'] . '" class="[ c-Hero__link ]">Read Current Issue</a>';
		}

		if($this->options['bio_text']) {
			$this->options['bio_text'] = '<p class="[ c-Hero__intro ]">Issue ' . $this->options['bio_text'] . '</p>';
		}
	}

	public static function add_options($custom_options = array()) {

		return new self($custom_options);
	}

	public function render() { ?>

		<div class="[ c-Hero <?= $this->options['classes']; ?> ]">
			<div class="[ c-Hero__inner ]">
				<div class="[ c-Hero__left ]">
					<div class="[ c-Hero__image-wrap ]">
						<?= $this->options['image']; ?>
					</div>
					<?= $this->options['bio_text']; ?>
				</div>
				<div class="[ c-Hero__right ]">
					<div class="[ c-Hero__content-wrap ]">
						<?= $this->options['issue_name']; ?>
						<?= $this->options['issue_text']; ?>
						<?= $this->options['issue_link']; ?>
					</div>
				</div>
			</div>
		</div><?php
	}
}
