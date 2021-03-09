<?php

get_header();

	if (have_posts()) :

		while (have_posts()) : the_post();



		endwhile;

	else :

		get_search_form();

	endif;

get_footer();
