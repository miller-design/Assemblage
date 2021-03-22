<?php

/* Template Name: Privacy Policy */

get_header(); ?>

<div class="[ l-2col ]">
	<div class="[ l-2col__col l-2col__col--space-between ]">
		<h1><?= (get_field('page_title')) ? get_field('page_title') : get_the_title(); ?></h1>
	</div>
	<div class="[ l-2col__col ]">
		<div class="[ privacy-content ]">
			<?= get_the_content(); ?>
		</div>
	</div>
</div>


<?php get_footer(); ?>
