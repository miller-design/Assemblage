<?php

if (!defined('ABSPATH')) exit;

/**
 * NextPost Component Class.
 *
 * @class       NextPost
 * @version     1.0.0
 */

class NextPost {

	// setup
	private $options;
	private static $post_details;

	public function __construct($custom_options) {

		SiteBase::insert_component_css(Self::class);

		$default_options = array(
			"image" 	=> '',
			"header" 	=> '',
			"text" 		=> '',
			"link" 		=> '',
			"issue"		=> '',
			"tax"			=> '',
		);

		$this->options = $default_options;
		$this->options = array_merge($default_options, $custom_options);

		if($this->options['image']) {
			$this->options['image'] = LazyImage::get_image($this->options['image'], '', true, false);
		}

		if($this->options['header']) {
			$this->options['header'] = '<h4 class="[ c-NextPost__header ]">' . $this->options['header'] . '</h4>';
		}

		if($this->options['text']) {
			$this->options['text'] = '<p class="[ c-NextPost__text ]">' . $this->options['text'] . '</p>';
		}

		if($this->options['link']) {
			$this->options['link'] = '<a href="' . $this->options['link'] . '" class="[ c-NextPost__link ]">Read Story</a>';
		}

		if($this->options['issue'] && $this->options['tax']) {
			Self::$post_details = '<p class="[ c-NextPost__details ]">' . $this->options['tax']['name'] . ', Issue ' . $this->options['issue']['name'] . '</p>';
		}
	}

	public static function add_options($custom_options = array()) {

		return new self($custom_options);
	}

	public function render() { ?>

		<div class="[ c-NextPost ]">
			<div class="[ c-NextPost__inner ]">
				<div class="[ c-NextPost__left ]">
					<h5>Next Story</h5>
				</div>
				<div class="[ c-NextPost__right ]">
					<div class="[ c-NextPost__image-wrap ]">
						<?= $this->options['image']; ?>
					</div>
					<div class="[ c-NextPost__content-wrap ]">
						<div class="[ c-NextPost__details ]">
							<?= Self::$post_details; ?>
						</div>
						<div class="[ c-NextPost__info ]">
							<?= $this->options['header']; ?>
							<?= $this->options['text']; ?>
							<?= $this->options['link']; ?>
						</div>
					</div>
				</div>
			</div>
		</div><?php
	}
}
