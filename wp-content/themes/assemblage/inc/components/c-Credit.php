<?php

if (!defined('ABSPATH')) exit;

/**
 * Credit Component Class.
 *
 * @class       Credit
 * @version     1.0.0
 */

class Credit {

	// setup

	private $options;

	public function __construct($custom_options) {

		SiteBase::insert_component_css(Self::class);

		$default_options = array(
			"type" => '',
			"name" => '',
		);

		$this->options = $default_options;
		$this->options = array_merge($default_options, $custom_options);

		switch($this->options['type']) {
			case 'words':
				$this->options['type'] = 'Words by:';
				break;
			case 'photo':
				$this->options['type'] = 'Images by:';
				break;
			case 'video':
				$this->options['type'] = 'Videos by:';
				break;
			case 'sound':
				$this->options['type'] = 'Music by:';
				break;
		}
	}

	public static function add_options($custom_options = array()) {

		return new self($custom_options);
	}

	public static function add_acf($acf_item, $acf_override = null) {

		$acf_options = array(
			"type" => $acf_item['type'],
			"name" => $acf_item['name'],
		);

		if($acf_override){
			$acf_options = array_merge($acf_options, $acf_override);
		}

		return new self($acf_options);
	}


	public function render() { ?>

		<div class="[ c-Credit ]">
			<p class="[ c-Credit__text ]"><span><?php echo $this->options['type']; ?></span> <?php echo $this->options['name']; ?></p>
		</div><?php
	}
}
