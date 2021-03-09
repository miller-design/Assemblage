<?php

if (!defined('ABSPATH')) exit;

/**
 * Burger Icon Component Class
 *
 * @class       Burger
 * @version     1.0.0
 */

class Burger {

	// setup
	private $options;

	public function __construct($customOptions){

		SiteBase::insert_component_css(Self::class);

		$defaultOptions = array(
			"classes"		=> '',
		);

		$this->options = $defaultOptions;
		$this->options = array_merge($defaultOptions, $customOptions);

	}

	public static function add_options($customOptions = array()){
		return new self($customOptions);
	}


	public function render(){ ?>

		<div class="[ c-Burger <?php echo $this->options['classes']; ?> ][ js-burger-menu ]" g-component="Burger">
			<span class="[ c-Burger__row ]"></span>
			<span class="[ c-Burger__row ]"></span>
			<span class="[ c-Burger__row ]"></span>
		</div><?php
	}
}
