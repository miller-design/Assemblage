<?php

get_header();

	$args = [
		'post_type' => 'journal',
		'post_status' => 'publish',
		'posts_per_page' => -1,
		'tax_query' => [
			[
				'taxonomy' => 'issues',
				'field' => 'id',
				'terms' => get_field('set_active_issue', 'options'),
			]
		],
	];

	$loop = new WP_Query( $args );

	if ($loop->have_posts()) :
		while ($loop->have_posts()) : $loop->the_post();

			$options = [
				"image" 	=> get_field('featured_image_portrait', get_the_id()),
				"header" 	=> get_the_title(get_the_id()),
				"text" 		=> mb_strimwidth(get_field('article_excerpt', get_the_id()), 0, 100, "..."),
				"link" 		=> get_permalink(get_the_id()),
				"issue"		=> Journal::get_post_term(get_the_id(), 'issues'),
				"tax"			=> Journal::get_post_term(get_the_id(), 'topic'),
			];

			PostCard::add_options($options)->render();

		endwhile;
	endif;

get_footer(); ?>