<?php

if (!defined('ABSPATH')) exit;

/**
 * Newsletter Signup Component Class
 *
 * @class       Newsletter Signup
 * @version     1.0.0
 */

class NewsletterSignup {

	// setup
	private $options;

	public function __construct($customOptions){

		SiteBase::insert_component_css(Self::class);

		$defaultOptions = array(
			"header"				=> '', // content will be passed an already styled layout
			"show_header"		=> true, // close icon for disabling modal
			"small_label"		=> false, // close icon for disabling modal
			"in_modal"			=> false,
			"classes"				=> '',
		);

		$this->options = $defaultOptions;
		$this->options = array_merge($defaultOptions, $customOptions);

		if($this->options['show_header'] === true) {
			$this->options['header'] = '<p class="[ c-NewsletterSignup__header ]">Register for news and upcoming issues</p>';
		}

		if($this->options['small_label'] === true) {
			$this->options['classes'] = 'c-NewsletterSignup--small-txt';
		}

	}

	public static function add_options($customOptions = array()){
		return new self($customOptions);
	}

	public function render(){ ?>

		<div class="[ c-NewsletterSignup <?php echo $this->options['classes']; ?> ]" g-component="NewsletterSignup" g-options='{"inModal": "<?php echo $this->options['in_modal']; ?>"}'>
			<?php echo $this->options['header']; ?>
			<div class="[ c-NewsletterSignup__form ]">
				<?php echo Forms::output_email_signup_form(); ?>
			</div>
		</div><?php
	}
}
