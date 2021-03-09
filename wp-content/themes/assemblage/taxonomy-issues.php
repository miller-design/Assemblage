<?php

get_header(); ?>

	<div class="[ l-IssueArchive ]">

		<h1><?php echo single_term_title('Issue: '); ?></h1><?php

		if (have_posts()):

			while (have_posts()) : the_post();

				echo get_the_title();

			endwhile;

		endif; ?>

	</div>

<?php get_footer();
