<?php

if (!defined('ABSPATH')) exit;

/**
 * ProgressBar Component Class
 *
 * @class       ProgressBar
 * @version     1.0.0
 */

class ProgressBar {

	// setup
	private $options;

	public function __construct($customOptions){

		SiteBase::insert_component_css(Self::class);

		$defaultOptions = array(
			"page_header"		=> '',
			"classes"				=> '',
		);

		$this->options = $defaultOptions;
		$this->options = array_merge($defaultOptions, $customOptions);

		$this->options['page_header'] = '<p class="[ c-ProgressBar__header ]"><span>Now Reading</span> ' . $this->options['page_header'] . '</p>';

	}

	public static function add_options($customOptions = array()){
		return new self($customOptions);
	}

	public function render(){ ?>

		<div class="[ c-ProgressBar ]" g-component="ProgressBar">
			<div class="[ c-ProgressBar__left ]">
				<?= $this->options['page_header']; ?>
			</div>
			<div class="[ c-ProgressBar__right ]">
				<?= Journal::share_buttons(get_the_id()); ?>
			</div>
			<div class="[ c-ProgressBr__bar ]" g-ref="progressBar"></div>
		</div><?php
	}
}
