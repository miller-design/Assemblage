<?php

/* Template Name: Issue */

get_header();

	// check if issue url has issue peramiter if not use acf value
	if(isset($_GET['issue'])) {
		$active_issue = $_GET['issue'];
	} else {
		$active_issue = get_field('set_active_issue', 'options');
	}

	$active_issue_acf_id = get_term($active_issue)->taxonomy . '_' . $active_issue;

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
		"image" 		=> get_field('featured_image', $active_issue_acf_id),
		"number"		=> get_term($active_issue)->name,
		"name"			=> get_field('issue_name', $active_issue_acf_id),
		"excerpt" 	=> get_field('issue_excerpt', $active_issue_acf_id),
		"panel_bg" 	=> '#fff',
		"term_id"		=> $active_issue_acf_id
	];

	IssueHeader::add_options($options)->render();

	$options = [
		"title"				=> 'Featured Stories',
		"link"				=> [
			"active"	=> false,
		],
		"posts" 			=> get_field('featured_stories', $active_issue_acf_id),
		"slide-size"	=> 'large',
	];
	PostSlider::add_options($options)->render();

	$spotlight_article = get_field('spotlight_article', $active_issue_acf_id);
	$spotlight_id = $spotlight_article['article'];
	$image_type = ($spotlight_article['layout'] === 'split-screen') ? 'featured_image_portrait' : 'featured_image';
	$layout_dir = ($spotlight_article['flip_layout'] === true) ? 'c-FeaturedArticle--flip' : '';

	$caption = '';
	if(get_field('read_time', $spotlight_id)) {
		$caption = get_field('read_time', $spotlight_id);
	} else {
		$caption = Journal::estimated_reading_time($spotlight_id, true);
	}

	$options = [
		"header_type"		=> $spotlight_article['layout'],
		"image" 				=> get_field($image_type, $spotlight_id),
		"header_text"		=> get_the_title($spotlight_id),
		"excerpt" 			=> get_field('article_excerpt', $spotlight_id),
		"issue_number"	=> Journal::get_post_term($spotlight_id, 'issues')[0],
		"term"					=> Journal::get_post_term($spotlight_id, 'topic')[0],
		"read_time"			=> $caption,
		"flip_layout"		=> $spotlight_article['flip_layout'],
		"type_style"		=> $spotlight_article['font_style'],
		"link"					=> [
			"url"	=> get_permalink($spotlight_id),
		],
	];

	FeaturedArticle::add_options($options)->render();

	if(!empty($loop->posts)) { ?>

		<div class="[ l-SectionHeader ]">
			<p>All stories</p>
		</div>
		<div class="[ l-4col ]">
			<div class="[ l-4col__inner ]"><?php
				if ($loop->have_posts()) :
					while ($loop->have_posts()) : $loop->the_post();
					$caption = '';
					if(get_field('read_time', get_the_id())) {
						$caption = get_field('read_time', get_the_id());
					} else {
						$caption = Journal::estimated_reading_time(get_the_id(), true);
					}
						echo '<div class="[ l-4col__item ]">';
							$options = [
								"image" 		=> get_field('featured_image_portrait', get_the_id()),
								"header" 		=> get_the_title(get_the_id()),
								"text" 			=> mb_strimwidth(get_field('article_excerpt', get_the_id()), 0, 100, "..."),
								"link" 			=> get_permalink(get_the_id()),
								"issue"			=> Journal::get_post_term(get_the_id(), 'issues')[0],
								"tax"				=> Journal::get_post_term(get_the_id(), 'topic')[0],
								"read_time"	=> $caption,
							];

							PostCard::add_options($options)->render();
						echo '</div>';
					endwhile;
				endif; ?>
			</div>
		</div><?php
	}

get_footer(); ?>