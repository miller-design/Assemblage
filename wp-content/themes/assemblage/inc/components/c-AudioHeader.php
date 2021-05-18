<?php

if (!defined('ABSPATH')) exit;

/**
 * AudioHeader Component Class.
 *
 * @class       AudioHeader
 * @version     1.0.0
 */

class AudioHeader {

	// setup
	private $options;
	private static $header_details;

	public function __construct($custom_options) {

		SiteBase::insert_component_css(Self::class);

		$default_options = array(
			"image" 						=> '',
			"header_text"				=> '',
			"audio"							=> [],
			"external_links"		=> [],
			"issue_number"			=> '',
			"term"							=> '',
			"type_style"				=> '',
			"bd_colour"					=> '',
			"classes"						=> '',
		);

		$this->options = $default_options;
		$this->options = array_merge($default_options, $custom_options);

		if($this->options['header_text']) {
			$this->options['header_text'] = '<p class="[ c-AudioHeader__header ]">' . $this->options['header_text'] . '</p>';
		}

		if($this->options['issue_number'] && $this->options['audio']) {
			Self::$header_details = '<p class="[ c-AudioHeader__details ]">Issue ' . $this->options['issue_number']['name'] . '&nbsp;<span class="dot"></span>&nbsp;Audio <span g-ref="audioLength"></span></p>';
		} else {
			Self::$header_details = '';
		}

		if($this->options['external_links']) {
			$this->options['external_links'] = Self::build_listen_list($this->options['external_links']);
		}

		if($this->options['type_style'] === 'serif') {
			$this->options['classes'] .= 'c-AudioHeader--serif ';
		} else {
			$this->options['classes'] .= 'c-AudioHeader--sans-serif ';
		}

		if($this->options["background_colour"]) {
			$this->options["background_colour"] = $this->options["background_colour"]['value'];
		}

		if($this->options["image"]) {
			$this->options["image"] = LazyImage::get_image($this->options["image"], [50, 100], 'c-AudioHeader__image js-parralax-image');
		}
	}

	public static function add_options($custom_options = array()) {

		return new self($custom_options);
	}

	private static function build_listen_list($links) {

		if(!empty($links)) {
			$max = count($links);
			$i = 1;
			$output .= '<p class="[ c-AudioHeader__link-header ]">Listen on:</p>';
			foreach($links as $link) {
				$comma = ($i < $max) ? ',' : '';
				$output .= '<a href="' . $link['url'] .'" class="[ c-AudioHeader__links ]" target="_blank" rel="noopener">' . $link['name'] . $comma .'</a>';
				$i++;
			}
		}

		return $output;
	}


	public function render() { ?>

		<div class="[ c-AudioHeader <?= $this->options['classes']; ?> ]" g-component="AudioHeader" style="--bg-color: <?= $this->options['background_colour']; ?>;">
			<div class="[ c-AudioHeader__inner ]">
				<div class="[ c-AudioHeader__content-wrap ]">
					<div class="[ c-AudioHeader__text ]">
						<?= $this->options['header_text']; ?>
						<?= Self::$header_details; ?>
						<?= $this->options['external_links']; ?>
					</div>
					<div class="[ c-AudioHeader__audio ]" g-ref="audioWrapper">
						<?php if($this->options['audio']) { ?>
							<audio id="myAudio_<?= uniqid(); ?>" controls preload="auto" class="video-js" g-ref="audioPlayer">
								<source src="<?= $this->options['audio']['url']; ?>" />
								Your browser does not support the
								<code>audio</code> element.
							</audio><?php
						} ?>
					</div>
				</div>
				<div class="[ c-AudioHeader__image-wrap ]">
					<?= $this->options['image']; ?>
				</div>
			</div>
		</div><?php
	}
}
