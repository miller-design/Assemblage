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

	IssueHeader::add_options($options)->render();

	$options = [
		"title"				=> 'Featured Stories',
		"link"				=> [
			"active"	=> false,
		],
		"posts" 			=> get_field('featured_stories'),
		"slide-size"	=> 'large',
	];
	PostSlider::add_options($options)->render();

	$spotlight_article = get_field('spotlight_article');
	$spotlight_id = $spotlight_article['article'];
	$image_type = ($spotlight_article['layout'] === 'split-screen') ? 'featured_image_portrait' : 'featured_image';
	$layout_dir = ($spotlight_article['flip_layout'] === true) ? 'c-FeaturedArticle--flip' : '';

	$options = [
		"header_type"		=> $spotlight_article['layout'],
		"image" 				=> get_field($image_type, $spotlight_id),
		"header_text"		=> get_the_title($spotlight_id),
		"excerpt" 			=> get_field('article_excerpt', $spotlight_id),
		"issue_number"	=> Journal::get_post_term($spotlight_id, 'issues')[0],
		"term"					=> Journal::get_post_term($spotlight_id, 'topic')[0],
		"read_time"			=> Journal::estimated_reading_time($spotlight_id, true),
		"flip_layout"		=> $spotlight_article['flip_layout'],
		"type_style"		=> $spotlight_article['font_style'],
	];

	FeaturedArticle::add_options($options)->render(); ?>

	<div class="[ l-4col ]">
		<div class="[ l-4col__inner ]"><?php
			if ($loop->have_posts()) :
				while ($loop->have_posts()) : $loop->the_post();
					echo '<div class="[ l-4col__item ]">';
						$options = [
							"image" 	=> get_field('featured_image_portrait', get_the_id()),
							"header" 	=> get_the_title(get_the_id()),
							"text" 		=> mb_strimwidth(get_field('article_excerpt', get_the_id()), 0, 100, "..."),
							"link" 		=> get_permalink(get_the_id()),
							"issue"		=> Journal::get_post_term(get_the_id(), 'issues'),
							"tax"			=> Journal::get_post_term(get_the_id(), 'topic'),
						];

						PostCard::add_options($options)->render();
					echo '</div>';
				endwhile;
			endif; ?>
		</div>
	</div><?php

get_footer(); ?>