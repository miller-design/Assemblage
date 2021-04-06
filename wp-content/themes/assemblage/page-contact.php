<?php

/* Template Name: Contact */

get_header(); ?>

<div class="[ l-2col ]">
	<div class="[ l-2col__col l-2col__col--space-between ][ contact-content-wrap ]">
		<div class="[ contact-header ]">
			<h1><?= (get_field('page_title')) ? get_field('page_title') : get_the_title(); ?></h1>
		</div>
		<div class="[ contact-form ]">
			<?= Forms::output_contact_form(); ?>
		</div>

	</div>
	<div class="[ l-2col__col ][ contact-image-wrap ]">
		<div class="[ contact-header-mobile ]">
			<h1><?= (get_field('page_title')) ? get_field('page_title') : get_the_title(); ?></h1>
		</div>
		<?= LazyImage::get_image(get_post_thumbnail_id(), [50, 100], 'contact-image', true, false); ?>
	</div>
</div>


<?php get_footer(); ?>
