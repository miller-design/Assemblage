<?php

/* Template Name: About */

get_header(); ?>

<div class="[ l-2col l-2col--on-grid l-2col--top ]">
	<div class="[ l-2col__inner ]">
		<div class="[ l-2col__col l-2col__col--space-between ]">
			<div class="[	about-header-wrap ]">
				<div class="[	about-header ]">
					<h1><?= (get_field('page_title')) ? get_field('page_title') : get_the_title(); ?></h1>
				</div>
				<div class="[ about-image-wrap-mobile ]">
					<?= LazyImage::get_image(get_field('featured_image'), [50, 100], 'about-image', true, false); ?>
				</div>
				<div class="[ about-intro ]">
					<?= get_field('intro_text'); ?>
				</div>
			</div>
		</div>
		<div class="[ l-2col__col ]">
			<div class="[ about-image-wrap ]">
				<?= LazyImage::get_image(get_field('featured_image'), [50, 100], 'about-image js-parralax-image', true, false); ?>
			</div>
			<div class="[ about-content ]">
				<?= get_field('page_copy'); ?>
			</div>
		</div>
	</div>
</div>

<div class="about-featured-image-wrap"><?php
	$options = [
		"image" => get_field('image'),
		"alignment" 	=> 'left',
	];
	FeaturedImage::add_options($options)->render(); ?>
</div>

<div class="[ about-team-grid ]">
	<div class="[ about-team-grid__row ]">
		<div class="[ about-team-grid__col ]">
			<h2>Our Team</h2>
		</div><?php
		$memebers = get_field('our_team_grid');
		foreach($memebers as $memeber) {
			echo '<div class="[ about-team-grid__col ]">';
				echo '<div class="[ about-team-grid__item ]">';
					echo LazyImage::get_image($memeber['image'], [50, 100], 'about-team-grid__item-image', true, false);
					echo '<p class="[ about-team-grid__item-name ]">' . $memeber['name'] . '<span>' . $memeber['position'] .'</span></p>';
					echo '<p class="[ about-team-grid__item-bio ]">' . $memeber['bio'] . '</p>';
				echo '</div>';
			echo '</div>';
		} ?>
	</div>
</div>


<?php get_footer(); ?>
