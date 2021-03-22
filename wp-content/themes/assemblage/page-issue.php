<?php

/* Template Name: Issue */

get_header();

$active_issue = get_field('set_active_issue');
$active_issue_acf_id = get_term($active_issue)->taxonomy . '_' . get_term($active_issue)->term_id;

	$args = [
		'post_type' => 'journal',
		'post_status' => 'publish',
		'posts_per_page' => -1,
		'tax_query' => [
			[
				'taxonomy' => 'issues',
				'field' => 'id',
				'terms' => $active_issue,
			]
		],
	];

	$loop = new WP_Query( $args );

	$options = [
		"image" 	=> get_field('featured_image', $active_issue_acf_id),
		"number"	=> get_term($active_issue)->name,
		"name"		=> get_field('issue_name', $active_issue_acf_id),
		"excerpt" => get_field('issue_excerpt', $active_issue_acf_id),
	];

	IssueHeader::add_options($options)->render(); ?>

	<section class="[ l-FeaturedLoop ]">
		<div class="[ l-FeaturedLoop__header ]">
			<h2>Featured Stories</h2>
			<div class="[ l-FeaturedLoop__loop ]"><?php
				$features = get_field('featured_stories');
				foreach ($features as $post_item ) {
					$options = [
						"image" 	=> get_field('featured_image_portrait', $post_item->ID),
						"header" 	=> get_the_title($post_item->ID),
						"text" 		=> mb_strimwidth(get_field('article_excerpt', $post_item->ID), 0, 100, "..."),
						"link" 		=> get_permalink($post_item->ID),
						"issue"		=> Journal::get_post_term($post_item->ID, 'issues'),
						"tax"			=> Journal::get_post_term($post_item->ID, 'topic'),
					];
					PostCard::add_options($options)->render();
				} ?>

			</div>
		</div>
	</section><?php

	$spotlight_article = get_field('spotlight_article');
	$spotlight_id = $spotlight_article['article'];
	$image_type = ($spotlight_article['layout'] === 'split-screen') ? 'featured_image_portrait' : 'featured_image';

	$options = [
		"header_type"		=> $spotlight_article['layout'],
		"image" 				=> get_field($image_type, $spotlight_id),
		"header_text"		=> get_the_title($spotlight_id),
		"excerpt" 			=> mb_strimwidth(get_field('article_excerpt', $spotlight_id), 0, 100, "..."),
		"issue_number"	=> Journal::get_post_term($spotlight_id, 'issues'),
		"term"					=> Journal::get_post_term($spotlight_id, 'topic'),
	];

	FeaturedArticle::add_options($options)->render(); ?>

	<div class="[ l-4Col ]"><?php
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
		endif; ?>
	</div><?php

get_footer(); ?>