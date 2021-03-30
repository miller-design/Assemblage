<?php

if (!defined('ABSPATH')) exit;

/**
 * PostSlider Component Class.
 *
 * @class       PostSlider
 * @version     1.0.0
 */

class PostSlider {

	// setup
	private $options;
	private static $link;

	public function __construct($custom_options) {

		SiteBase::insert_component_css(Self::class);

		$default_options = array(
			"title"				=> '',
			"link"				=> [
				"active"	=> false,
				"url"			=> '',
				"text"		=> '',
			],
			"posts" 			=> '',
			"slide-size"	=> 'large', // accepts string of eithe large or small
			"classes"			=> '',
		);

		$this->options = $default_options;
		$this->options = array_merge($default_options, $custom_options);

		if($this->options['posts']) {
			$this->options['posts'] = Self::build_slides($this->options['posts']);
		}

		if($this->options['title']) {
			$this->options['title'] = '<p class="[ c-PostSlider__header ]">' . $this->options['title'] . '</p>';
		}

		if($this->options['slide-size'] === 'small') {
			$this->options['classes'] .= 'c-PostSlider--small-slides ';
		}

		if($this->options['link']['active'] == true) {
			Self::$link = '<a class="[ c-PostSlider__link ]" href="' . $this->options['link']['url'] . '">' . $this->options['link']['text'] . '</a>';
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

	private function build_slides($data) {

		ob_start();
		foreach ($data as $slide) {

			echo '<div class="[ c-PostSlider__slide ]" g-ref="slide">';
				$options = [
					"image" 		=> get_field('featured_image_portrait', $slide->ID),
					"header" 		=> get_the_title($slide->ID),
					"text" 			=> mb_strimwidth(get_field('article_excerpt', $slide->ID), 0, 100, "..."),
					"link" 			=> get_permalink($slide->ID),
					"issue"			=> Journal::get_post_term($slide->ID, 'issues')[0],
					"tax"				=> Journal::get_post_term($slide->ID, 'topic')[0],
					"read_time"	=> Journal::estimated_reading_time($slide->ID, true),
					"slider" 		=> true,
				];
				PostCard::add_options($options)->render();
			echo '</div>';
		}
		$output = ob_get_contents();
		ob_end_clean();

		return $output;
	}

	public function render() { ?>

		<div class="[ c-PostSlider <?= $this->options['classes']; ?> ]" g-component="PostSlider">
			<div class="[ c-PostSlider__col ]">
				<div class="[ c-PostSlider__header-wrap ]">
					<?= $this->options['title']; ?>
					<?= Self::$link; ?>
				</div>
				<div class="[ c-PostSlider__wrapper ]" g-ref="slider">
					<?= $this->options['posts']; ?>
				</div>
			</div>
		</div><?php
	}
}
