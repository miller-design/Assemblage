		</main>
		<?php

		$social_links = [
			[
				"link" => get_field('instagram_url', 'options'),
				"link_text" => 'In',
			],
			[
				"link" => get_field('twitter_url', 'options'),
				"link_text" => 'Tw',
			],
			[
				"link" => get_field('facebook_url', 'options'),
				"link_text" => 'Fb',
			],
		]; ?>
		<footer class="[ l-Footer ]">
			<div class="[ l-Footer__top ]">

				<div class="[ l-Footer__col ]">
					<span>Sign up to our newsletter</span>
				</div>
				<div class="[ l-Footer__col ]">
					<span>Sitemap</span>
					<ul class="[ l-Footer__menu ]">
						<?php wp_nav_menu(array(
							'theme_location' => 'footer_main_menu',
							'items_wrap' => '%3$s',
							'container' => false,
							'echo' => true,
							'fallback_cb' => false,
						));?>
					</ul>
				</div>
				<div class="[ l-Footer__col ]">
					<span>Information</span>
					<ul class="[ l-Footer__menu ]">
						<?php wp_nav_menu(array(
							'theme_location' => 'footer_secondary_menu',
							'items_wrap' => '%3$s',
							'container' => false,
							'echo' => true,
							'fallback_cb' => false,
						));?>
					</ul>
				</div>
				<div class="[ l-Footer__col ]">
					<span>Legal</span>
					<ul class="[ l-Footer__menu ]">
						<li><a href="#">Terms of use</a></li>
						<li><a href="#">Privacy Policy</a></li>
					</ul>
				</div>

			</div>

			<div class="[ l-Footer__bottom ]">
				<div class="[ l-Footer__left ]">
					<p class="[ l-Footer__copyright ]">&copy;<?= date('Y'); ?> <span>Steinberg Hart</span></p>
					<ul class="[ l-Footer__social ]"><?php
						$i = 1;
						foreach($social_links as $link) {
							$slash = ($i < count($social_links)) ? ' /' : ''; ?>
							<li><a href="<?php echo $link['link']; ?>" target="_blank" rel="noopener"><?php echo $link['link_text'] . $slash; ?></a></li><?php
							$i++;
						} ?>
					</ul>
				</div>
				<div class="[ l-Footer__right ]">
					<a class="[ l-Footer__credit ]" href="https://www.madebysix.com/" target="_blank" rel="noopener">Made By <span>Six</span></a>
				</div>
			</div>
		</footer>

		<?php wp_footer(); ?>

	</body>

</html>
