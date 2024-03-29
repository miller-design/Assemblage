		</main>
		<?php

		$footer_small_links = [
			[
				"link" => get_permalink(get_page_by_path('contact')),
				"link_text" => 'Contact',
			],
			[
				"link" => get_field('twitter_url', 'options'),
				"link_text" => 'Twitter',
			],
			[
				"link" => get_field('facebook_url', 'options'),
				"link_text" => 'Facebook',
			],
			[
				"link" => get_field('instagram_url', 'options'),
				"link_text" => 'Instagram',
			],
			[
				"link" => get_permalink(get_page_by_path('privacy-policy')),
				"link_text" => 'Privacy Policy',
			],
			[
				"link" => get_permalink(get_page_by_path('terms-conditions')),
				"link_text" => 'Terms & Conditions',
			],
		]; ?>

		<span class="[ u-site-overlay ][ js-overlay ]"></span><?php

		Forms::output_subscribe_panel();

		if(is_page('issue')) {
			Journal::get_issue_content_list_panel();
			Journal::get_editors_letter_panel();
		} ?>


		<footer class="[ l-Footer ]">
			<div class="[ l-Footer__top ]">
				<div class="[ l-Footer__left ]">
					<p class="[ l-Footer__statement ]"><?= get_field('footer_statement', 'options'); ?></p>
				</div>
				<div class="[ l-Footer__right ]">
					<?php NewsletterSignup::add_options()->render(); ?>
				</div>
			</div>

			<div class="[ l-Footer__bottom ]">
				<div class="[ l-Footer__left ]">
					<p class="[ l-Footer__copyright ]">&copy; Assemblage World Ltd., <?= date('Y'); ?></p>
				</div>
				<div class="[ l-Footer__right ]">
					<ul class="[ l-Footer__links ]"><?php
						foreach($footer_small_links as $link) {
							if(!empty($link['link'])) {
								echo '<li class="[ l-Footer__link ]"><a href="' . $link['link'] . '">' . $link['link_text'] . '</a></li>';
							}
						} ?>
					</ul>
				</div>
			</div>
		</footer>

		<?php wp_footer(); ?>

	</body>

</html>
