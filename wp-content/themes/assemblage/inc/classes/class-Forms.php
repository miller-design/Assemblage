<?php
// Place all core Base Theme stuff in here

if (!defined('ABSPATH')) exit;


class Forms {


	public static function init() {


	}

	public static function output_contact_form() { ?>

		<div class="c-Form" g-component="Form">
			<?php echo do_shortcode('[contact-form-7 id="51" title="Contact Form"]'); ?>
		</div><?php
	}

	public static function output_email_signup_form() { ?>

		<?php echo do_shortcode('[contact-form-7 id="289" title="Email Signup"]');
	}
}
