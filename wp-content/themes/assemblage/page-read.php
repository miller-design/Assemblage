<?php

/* Template Name: Read */

get_header();

	$terms = get_terms("issues");
	$count = count($terms);
	$next_issue = get_field('next_issue_preview');
	$next_issue_acf_id = get_term($next_issue)->taxonomy . '_' . $next_issue;

	if($count > 0) {
		foreach ( $terms as $term ) {

			$active_issue_acf_id = $term->taxonomy . '_' . $term->term_id;

			$options = [
				"header_type"		=> 'split-screen-alt',
				"image" 				=> get_field('featured_image', $active_issue_acf_id),
				"term"					=> $term->name,
				"header_text"		=> get_field('issue_name', $active_issue_acf_id),
				"excerpt" 			=> get_field('issue_excerpt', $active_issue_acf_id),
				"flip_layout"		=> false,
				"type_style"		=> 'sans-serif',
				"link"					=> [
					"name"	=> 'Read Issue ' . $term->name,
					"url"		=> get_permalink( get_page_by_path( 'issue' ) ) . '?issue=' . $term->term_id,
				],
				"classes"	=> ($next_issue) ? 'next-issue-active ' : 'next-issue-not-active ',
			];

			FeaturedArticle::add_options($options)->render();
		}
	}

	if($next_issue) {

		$options = [
		 "header_type"		=> 'next-issue',
		 "image" 				=> get_field('featured_image', $next_issue_acf_id),
		 "term"					=> 'Next Issue <sup>' . get_term($next_issue)->name . '</sup>',
		 "header_text"		=> get_field('issue_name', $next_issue_acf_id),
		 "excerpt" 			=> get_field('issue_excerpt', $next_issue_acf_id),
		 "release_date"  => get_field('release_date', $next_issue_acf_id),
		 "flip_layout"		=> false,
		 "type_style"		=> 'sans-serif',
		 "white_bg"			=> true,
	 ];

	 FeaturedArticle::add_options($options)->render();
	}


get_footer(); ?>