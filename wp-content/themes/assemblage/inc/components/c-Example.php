<?php

if (!defined('ABSPATH')) exit;

/**
 * Example Component Class.
 *
 * @class       Example
 * @version     1.0.0
 */

class Example {

	// setup

	private $options;

	public function __construct($custom_options) {

		SiteBase::insert_component_css(Self::class);

		$default_options = array(
			"title" => 'Default Title',
			"link" => null,
		);

		$this->options = $default_options;
		$this->options = array_merge($default_options, $custom_options);
	}

	public static function add_options($custom_options = array()) {

		return new self($custom_options);
	}

	public static function add_acf($acf_item, $acf_override = null) {
		// Optional method
		// a quick way to link the component to it's ACF - use instead of add_options(), eg:
		// Example::add_acf($current-repeater-field-loop-object)->render();
		// OR
		// Example::add_acf($page-id)->render();

		$acf_options = array(
			"title" => $acf_item['title']
			// "title" => get_field('title', $page-id) <-- if add_acf($page-id)
		);

		if($acf_override){
			$acf_options = array_merge($acf_options, $acf_override);
		}

		return new self($acf_options);
	}

	public static function block_settings() {
		
		return array(
			'title' => __('Example'),
			'description' => __('A Example block.'),
			'category' => 'media',
			'icon' => 'admin-comments',
			'keywords' => array('example', 'layout'),
			'example' => array(
				'attributes' => array(
					'mode' => 'preview',
					'data' => array(
						'title' => "Some text for the preview",
					)
				)
			)
		);
	}

	public static function add_block($block) {

		$options = array(
			'title' => get_field('title'),
		);

		// don't load the link in the admin, the block won't be clickable!
		if(!is_admin()) {
			$options['link'] = get_field('link');
		}

		self::addOptions($options)->render();
	}

	public function render() {
		// if your component needs javascript, attach it like so... g-component="Example"
		// Then write you component Javascript in src/js/c-Example.js using GIA syntax ?>

		<div class="[ c-Example ]" g-component="Example" g-options='{"someOption": "customValue"}'>
			<h1 class="[ c-Example__title ]" g-ref="title">
				<?php
					if(!empty($this->options['link'])) {
						echo '<a href="' . $this->options['link'] . '"';
						echo $this->options['title'];
						echo '</a>';
					}else{
						echo $this->options['title'];
					}
				?>
			</h1>
			<div class="[ c-Example__slide ]" g-ref="slide"></div>
			<div class="[ c-Example__slide ]" g-ref="slide"></div>
			<div class="[ c-Example__slide ]" g-ref="slide"></div>
			<button class="[ c-Example__button ]" g-ref="expandToggle">Expand</button>
		</div><?php
	}
}
