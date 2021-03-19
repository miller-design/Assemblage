		</main>
		<?php

		$footer_small_links = [
			[
				"link" => '#',
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
				"link" => '#',
				"link_text" => 'Privacy Policy',
			],
			[
				"link" => '#',
				"link_text" => 'Terms & Conditions',
			],
		];

		$burger_tertiary_pages = [
			[
				"link" => '#',
				"link_text" => 'Contact',
			],
			[
				"link" => '#',
				"link_text" => 'Privacy Policy',
			],
			[
				"link" => '#',
				"link_text" => 'Terms & Conditions',
			],
		];

		$burger_social_links = [
			[
				"link" => get_field('facebook_url', 'options'),
				"link_text" => 'Facebook',
			],
			[
				"link" => get_field('twitter_url', 'options'),
				"link_text" => 'Twitter',
			],
			[
				"link" => get_field('instagram_url', 'options'),
				"link_text" => 'Instagram',
			],
		];

		BurgerMenu::add_options([
			"nav"							=> get_field('main_menu', 'options'),
			"seconday_links"	=> $burger_tertiary_pages,
			"social_links" 		=> $burger_social_links,
		])->render(); ?>

		<span class="[ u-site-overlay ][ js-overlay ]"></span>

		<footer class="[ l-Footer ]">
			<div class="[ l-Footer__top ]">
				<div class="[ l-Footer__left ]">
					<p class="[ l-Footer__statement ]"><?= get_field('footer_statement', 'options'); ?></p>
				</div>
				<div class="[ l-Footer__right ]">
					<p>Contact Form</p>
				</div>
			</div>

			<div class="[ l-Footer__bottom ]">
				<div class="[ l-Footer__left ]">
					<p class="[ l-Footer__copyright ]">&copy; Assemblage World Ltd., <?= date('Y'); ?></p>
				</div>
				<div class="[ l-Footer__right ]">
					<ul class="[ l-Footer__links ]"><?php
						foreach($footer_small_links as $link) {
							echo '<li class="[ l-Footer__link ]"><a href="' . $link['link'] . '">' . $link['link_text'] . '</a></li>';
						} ?>
					</ul>
				</div>
			</div>
		</footer>

		<?php wp_footer(); ?>

	</body>

</html>