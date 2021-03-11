<?php

if (!defined('ABSPATH')) exit;

/**
 * InterviewHeader Header Component Class.
 *
 * @class       InterviewHeader
 * @version     1.0.0
 */

class InterviewHeader {

	// setup

	private $options;

	public function __construct($custom_options) {

		SiteBase::insert_component_css(Self::class);

		$default_options = array(
			"image" 						=> '',
			"header_text"				=> '',
			"excerpt" 					=> '',
			"issue_number"			=> '',
			"term"							=> '',
			"read_time"					=> '',
			"background_colour" => '',
			"classes"						=> '',
		);

		$this->options = $default_options;
		$this->options = array_merge($default_options, $custom_options);
	}

	public static function add_options($custom_options = array()) {

		return new self($custom_options);
	}

	public function render() { ?>

		<div class="[ c-InterviewHeader <?= $this->options['classes']; ?> ]">
			<div class="[ c-InterviewHeader__inner ]">
				<div class="[ c-InterviewHeader__content ]">
					<p class="[ c-InterviewHeader__header ]"><?php echo $this->options['header_text']; ?></p>
					<div class="[ c-InterviewHeader__detail-wrap ]">
						<p class="[ c-InterviewHeader__details ]"><?php echo $this->options['term']['name']; ?>, Issue <?php echo $this->options['issue_number']['name']; ?></p>
						<p class="[ c-InterviewHeader__excerpt ]"><?php echo $this->options['excerpt']; ?></p>
					</div>
				</div>
				<div class="[ c-InterviewHeader__image ]">
					<?php echo LazyImage::get_image($this->options['image'], 'c-InterviewHeader__image-half'); ?>
				</div>
			</div>
		</div><?php
	}
}
