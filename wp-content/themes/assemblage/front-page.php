<?php

/* Template Name: Front Page */

get_header();

$active_issue = get_field('select_active_issue');
$show_next_issue = get_field('display_next_issue');
$active_issue_acf_id = get_term($active_issue)->taxonomy . '_' . $active_issue;
$active_issue_number = get_term($active_issue)->name;

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

$post_slider_loop = new WP_Query( $args );
?>

<section class="[ home-full-block ]"><?php

	$options = [
		"image" 						=> get_field('hero_image'),
		"issue_number"			=> $active_issue_number,
		"issue_name"				=> get_field('issue_name', $active_issue_acf_id),
		"issue_text"				=> get_field('issue_excerpt', $active_issue_acf_id),
		"issue_link"				=> get_permalink( get_page_by_path( 'issue' ) ) . '?issue=' . $active_issue,
		"bio_text"					=> get_field('mobile_intro_text'),
		"classes"						=> '',
	];

	Hero::add_options($options)->render(); ?>

</section>

<section class="[ home-full-block ]">
	<div class="[ home-row ]"><?php
		$options = [
			"title"				=> 'Current Issue <sup>' . $active_issue_number .'</sup>',
			"link"				=> [
				"active"	=> true,
				"url"			=> get_permalink( get_page_by_path( 'issue' ) ) . '?issue=' . $active_issue,
				"text"		=> 'Read Issue ' . $active_issue_number,
			],
			"posts" 			=> $post_slider_loop->posts,
			"slide-size"	=> 'large',
		];
		PostSlider::add_options($options)->render(); ?>
	</div>
	<div class="[ ]"><?php

		$current_type_style = get_field('current_typography_style');

		if($show_next_issue) {

			$next_issue = get_field('next_issue');
			$next_issue_acf_id = get_term($next_issue)->taxonomy . '_' . $next_issue;

			$options = [
				"header_type"			=> 'next-issue',
				"image" 					=> get_field('featured_image', $next_issue_acf_id),
				"term"						=> 'Next Issue <sup>' . get_term($next_issue)->name . '</sup>',
				"header_text"			=> get_field('issue_name', $next_issue_acf_id),
				"excerpt" 				=> get_field('issue_excerpt', $next_issue_acf_id),
				"release_date"  	=> get_field('release_date', $next_issue_acf_id),
				"flip_layout"			=> false,
				"type_style"			=> $current_type_style,
				"white_bg"				=> false,
			];

			FeaturedArticle::add_options($options)->render();

		} else {
			$current_featured = get_field('current_featured_article')->ID;

			$options = [
				"header_type"		=> 'split-screen',
				"image" 				=> get_field('featured_image_portrait', $current_featured),
				"header_text"		=> get_the_title($current_featured),
				"excerpt" 			=> get_field('article_excerpt', $current_featured),
				"issue_number"	=> Journal::get_post_term($current_featured, 'issues')[0],
				"term"					=> Journal::get_post_term($current_featured, 'topic')[0],
				"read_time"			=> Journal::estimated_reading_time($current_featured, true),
				"flip_layout"		=> true,
				"type_style"		=> $current_type_style,
				"link"					=> [
					"url"	=> get_permalink($current_featured),
				],
			];

			FeaturedArticle::add_options($options)->render();

		} ?>
	</div>
</section>

<?php if(get_field('show_featured')) { ?>

	<section class="[ home-full-block ]">
		<div class="[ ]">
			<div class="[ l-SectionHeader ]">
				<p>Featured stories</p>
			</div>
			<div class="[ l-4col ]">
				<div class="[ l-4col__inner ]"><?php
					$articles = get_field('featured_stories_list');

					foreach($articles as $article) {
						echo '<div class="[ l-4col__item ]">';
							$options = [
								"image" 		=> get_field('featured_image_portrait', $article->ID),
								"header" 		=> get_the_title($article->ID),
								"text" 			=> mb_strimwidth(get_field('article_excerpt', $article->ID), 0, 100, "..."),
								"link" 			=> get_permalink($article->ID),
								"issue"			=> Journal::get_post_term($article->ID, 'issues')[0],
								"tax"				=> Journal::get_post_term($article->ID, 'topic')[0],
								"read_time"	=> Journal::estimated_reading_time($article->ID, true),
							];

							PostCard::add_options($options)->render();
						echo '</div>';
					} ?>
				</div>
			</div>
		</div>
		<div class="[ ]"><?php
			$featured_id = get_field('featured_story')->ID;
			$featured_type_style = get_field('featured_typography_style');

			$options = [
				"header_type"		=> 'full-screen',
				"image" 				=> get_field('featured_image', $featured_id),
				"header_text"		=> get_the_title($featured_id),
				"excerpt" 			=> get_field('article_excerpt', $featured_id),
				"issue_number"	=> Journal::get_post_term($featured_id, 'issues')[0],
				"term"					=> Journal::get_post_term($featured_id, 'topic')[0],
				"read_time"			=> Journal::estimated_reading_time($featured_id, true),
				"flip_layout"		=> true,
				"type_style"		=> $featured_type_style,
				"link"					=> [
					"url"	=> get_permalink($featured_id),
				],
			];

			FeaturedArticle::add_options($options)->render(); ?>
		</div>
	</section>

<?php } ?>

<?php if(get_field('show_recommended')) { ?>

	<section class="[ home-full-block ]">
		<div class="[ ]"><?php

			$options = [
				"title"				=> 'Recommended Readsss',
				"link"				=> [
					"active"	=> true,
					"url"			=> get_post_type_archive_link('journal'),
					"text"		=> 'All Stroies',
				],
				"posts" 			=> get_field('recommended_reads'),
				"slide-size"	=> 'small',
			];
			PostSlider::add_options($options)->render(); ?>
		</div>
	</section>

<?php } ?>


<?php get_footer(); ?>
