<?php

if (!defined('ABSPATH')) exit;

/**
 * Issue Header Component Class.
 *
 * @class       IssueHeader
 * @version     1.0.0
 */

class IssueHeader {

	// setup

	private $options;

	public function __construct($custom_options) {

		SiteBase::insert_component_css(Self::class);

		$default_options = array(
			"image" 		=> '',
			"number"		=> '',
			"name"			=> '',
			"excerpt" 	=> '',
			"panel_bg" 	=> '',
			"classes"		=> '',
			"term_id"		=> '',
		);

		$this->options = $default_options;
		$this->options = array_merge($default_options, $custom_options);

	}

	public static function add_options($custom_options = array()) {

		return new self($custom_options);
	}

	public function render() { ?>

		<section class="[ c-IssueHeader <?= $this->options['classes']; ?> ]" g-component="IssueHeader" g-options='{"panelBg": "<?= $this->options['panel_bg']; ?>"}'>
			<div class="[ c-IssueHeader__inner ]">
				<div class="[ c-IssueHeader__left ]">
					<h1 class="[ c-IssueHeader__header ]">Issue <span><?= $this->options['number']; ?></span></h1>
					<div class="[ c-IssueHeader__content ]">
						<p class="[ c-IssueHeader__name ]"><?= $this->options['name']; ?></p>
						<p class="[ c-IssueHeader__intro ]"><?= $this->options['excerpt']; ?></p>
						<div class="[ c-IssueHeader__cta-wrap ]">
							<button class="[ c-IssueHeader__btn ]" g-ref="tableTrigger" data-term-id="<?= $this->options['term_id']; ?>" data-number="<?= $this->options['number']; ?>"><svg role="img"><use xlink:href="<?=get_template_directory_uri(); ?>/dist/sprite.svg#contents"></use></svg> Table of Contents</button>
							<button class="[ c-IssueHeader__btn ]" g-ref="editorTrigger" data-term-id="<?= $this->options['term_id']; ?>" data-number="<?= $this->options['number']; ?>">Read the Founders' Letter</button>
						</div>
					</div>
				</div>
				<div class="[ c-IssueHeader__right ]">
					<div class="[ c-IssueHeader__image-wrap ]">
						<?= LazyImage::get_image($this->options['image'], [50, 100], 'c-IssueHeader__img js-parralax-image', true, false); ?>
						<h1 class="[ c-IssueHeader__header-mobile ]">Issue <span><?= $this->options['number']; ?></span></h1>
					</div>
				</div>
			</div>
		</section><?php
	}
}
