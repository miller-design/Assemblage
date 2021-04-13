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

	public static function output_subscribe_panel() {

		$panel_text = get_field('subscribe_text', 'options'); ?>

		<div class="[ l-Panel ][ js-subscribe-panel ]">
			<div class="[ l-Panel__header ]">
				<span class="[ l-Panel__close ][ js-subscribe-close ]">Close</span>
			</div>
			<div class="[ l-Panel__content ]">
				<div class="[ l-Panel__subscribe ]">
					<h5 class="[ l-Panel__subscribe-header ]">Subscribe</h5>
					<p class="[ l-Panel__subscribe-text ]"><?= $panel_text; ?></p>
					<?php NewsletterSignup::add_options([
						"in_modal"	=> true,
						"classes" => 'c-NewsletterSignup--dark ',
					])->render(); ?>
				</div>
			</div>
			<div class="[ l-Panel__footer ]">
				<a href="<?= get_permalink(get_page_by_path('privacy-policy')); ?>">Privacy Policy</a>
				<a href="<?= get_permalink(get_page_by_path('terms-conditions')); ?>">Terms & Conditions</a>
			</div>
		</div><?php
	}
}
