<?php

if (!defined('ABSPATH')) exit;

/**
 * PostCard Component Class.
 *
 * @class       PostCard
 * @version     1.0.0
 */

class PostCard {

	// setup
	private $options;
	private static $post_details;
	private static $post_link_open;
	private static $post_link_close;

	public function __construct($custom_options) {

		SiteBase::insert_component_css(Self::class);

		$default_options = array(
			"image" 				=> '',
			"header" 				=> '',
			"text" 					=> '',
			"link" 					=> '',
			"issue"					=> '',
			"read_time"			=> '',
			"slider"				=> false
		);

		$this->options = $default_options;
		$this->options = array_merge($default_options, $custom_options);

		if($this->options['image'] && $this->options['slider'] === false) {
			$this->options['image'] = LazyImage::get_image($this->options['image'], [100], 'c-PostCard__image', true, false);
		} else if($this->options['image'] && $this->options['slider'] === true) {
			$this->options['image'] = LazyImage::get_image($this->options['image'], [100], 'c-PostCard__image', false, true);
		}

		if($this->options['header']) {
			$this->options['header'] = '<p class="[ c-PostCard__header ]">' . $this->options['header'] . '</p>';
		}

		if($this->options['text']) {
			$this->options['text'] = '<p class="[ c-PostCard__text ]">' . $this->options['text'] . '</p>';
		}

		if($this->options['issue'] && $this->options['read_time']) {
			Self::$post_details = '<p class="[ c-PostCard__details ]">Issue ' . $this->options['issue']['name'] . '&nbsp;<span class="dot"></span>&nbsp;' . $this->options['read_time'] . '</p>';
		}

		if($this->options['link']) {
			Self::$post_link_open = '<a href="' . $this->options['link'] . '" class="[ c-PostCard__link ]">';
			Self::$post_link_close = '</a>';
		}
	}

	public static function add_options($custom_options = array()) {

		return new self($custom_options);
	}

	public function render() { ?>

		<article class="[ c-PostCard ]">
			<?= Self::$post_link_open; ?>
				<div class="[ c-PostCard__image-wrap ]">
					<?= $this->options['image']; ?>
				</div>
				<div class="[ c-PostCard__info ]">
					<?= Self::$post_details; ?>
					<?= $this->options['header']; ?>
					<?= $this->options['text']; ?>
				</div>
			<?= Self::$post_link_close; ?>
		</article><?php
	}
}
