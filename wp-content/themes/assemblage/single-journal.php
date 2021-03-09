<?php get_header(); ?>

	<article class="[ l-JournalSingle ]">

		<h1><?php the_title(); ?></h1><?php

		the_content();

		echo Journal::estimated_reading_time();
		echo '<br/>';
		echo Journal::get_post_term_links(get_the_id(), 'issues');
		echo '<br/>'; ?>

	</article>

<?php get_footer(); ?>