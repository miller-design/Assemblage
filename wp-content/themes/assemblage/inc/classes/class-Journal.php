<?php

if ( ! defined( 'ABSPATH' ) ) exit;

/**
* Journal Class
*
* @class       Journal
* @version     1.0.0
*/

class Journal {

	const PostType = 'journal';

	public static function init() {

		add_action('init', 'Journal::set_up_post_type');
		add_action('init', 'Journal::set_up_taxonomy');
		add_action('pre_get_posts', 'Journal::limit_posts_per_page');
		add_action( "issues_edit_form", 'Journal::hide_description_row');
		add_action( "issues_add_form", 'Journal::hide_description_row');

		// Ajax Functions
		// add_action( "wp_ajax_load_editors_letter", 'Journal::get_editors_letter_panel');
		// add_action( "wp_ajax_nopriv_load_editors_letter", 'Journal::get_editors_letter_panel');

		// add_action( "wp_ajax_load_content_list", 'Journal::get_issue_content_list_panel');
		// add_action( "wp_ajax_nopriv_load_content_list", 'Journal::get_issue_content_list_panel');

		add_action( "wp_ajax_load_more_posts", 'Journal::get_more_posts');
		add_action( "wp_ajax_nopriv_load_more_posts", 'Journal::get_more_posts');

		add_action( "wp_ajax_load_more_terms", 'Journal::get_more_terms');
		add_action( "wp_ajax_nopriv_load_more_terms", 'Journal::get_more_terms');
	}

	public static function set_up_post_type() {

		$args = array(
			'labels' => array(
				'name' => 'Journal',
				'singular_name' => 'Journal',
			),
			'public' => true,
			'has_archive' => true,
			'rewrite' => array('slug' => 'issues'),
			'menu_icon' => 'dashicons-edit-large',
			'menu_position' => 10,
			'show_in_rest' => false,
		);

		register_post_type(self::PostType, $args );

	}

	public static function set_up_taxonomy() {

		register_taxonomy(
			'topic',
			self::PostType,
			array(
				'singular_name' => 'Topic',
				'name' => 'Topic',
				'all_items' => 'Topics',
				'label' => 'Topic',
				'public' => true,
				'show_ui' => true,
				'hierarchical' => true,
				'show_admin_column' => true,
				'show_in_rest' => false,
				'rewrite' => array(
					'slug' => 'topic',
				)
			)
		);

		register_taxonomy(
			'issues',
			self::PostType,
			array(
				'singular_name' => 'Issue',
				'name' => 'Issue',
				'all_items' => 'Issues',
				'label' => 'Issue',
				'public' => true,
				'show_ui' => true,
				'hierarchical' => false,
				'show_admin_column' => true,
				'show_in_rest' => true,
				'rewrite' => array(
					'slug' => 'issue',
				)
			)
		);

		register_taxonomy(
			'tags',
			self::PostType,
			array(
				'singular_name' => 'Tag Group',
				'name' => 'Tag Group',
				'all_items' => 'Tag Groups',
				'label' => 'Tag Group',
				'public' => true,
				'show_ui' => true,
				'hierarchical' => false,
				'show_admin_column' => true,
				'show_in_rest' => true,
				'rewrite' => array(
					'slug' => 'tag-group',
				)
			)
		);
	}

	public static function hide_description_row() {
		echo "<style> .term-description-wrap { display:none; } </style>";
	}

	// change post count
	public static function limit_posts_per_page($query) {

		/* only proceed on the front end */
		if( is_admin() ) {
				return;
		}

		/* ensure this only happens on companies posts */
		if ( $query->is_main_query() && $query->is_post_type_archive('Journal') ) {

			$query->set( 'posts_per_page', '-1' );

		}

		return $query;
	}


	public static function estimated_reading_time($ID, $short_hand = false) {

		if (get_field('modules', $ID)|| get_field('header_blocks', $ID)) {

			$modules = get_field('modules', $ID);
			$header_modules = get_field('header_blocks', $ID);
			$content = '';

			// loop through all flexible modules on the page
			foreach($modules as $module) {

				$blocks = $module['blocks'];
				$discoveries = $module['discoveries'];
				// loop through all nested text blocks
				foreach($blocks as $block) {
					// add blocks to the content variable
					$content .= $block['text_area'];
				}

				foreach ($discoveries as $discover) {
					$content .= $discover['content'];
				}
			}

			foreach($header_modules as $module) {
				$content .= $module['text_area'];
			}

			$word_count = str_word_count(strip_tags($content));
			$read_time = ceil($word_count / 250);

			$suffix = ($short_hand === true) ? 'min read' : 'minute read time';

			return '<span class="read-time">' . $read_time . ' ' . $suffix . '</span>';
		}
	}

	public static function get_post_term($post_id, $tax) {

		$issues_tax = wp_get_object_terms($post_id, $tax);

		$output = [];

		if (!empty($issues_tax)) {

			foreach ($issues_tax as $issue) {

				$output[] = [
					'link' 	=>  get_term_link($issue),
					'name' 	=> $issue->name,
					'id'		=> $issue->term_id,
				];

			}

			return $output;
		}
	}


	/* ================================================================
	 	Social Media Share Links
	================================================================ */

	public static function share_buttons($postID) {

		$url = urlencode(get_the_permalink($postID));
		$title = urlencode(html_entity_decode(get_the_title($postID), ENT_COMPAT, 'UTF-8'));
		$media = urlencode(wp_get_attachment_url(get_field('featured_image', $postID)));

		include get_template_directory() . '/templates/social-share-list.php';

	}


	/* ================================================================
	 	Next post Link
	================================================================ */

	public static function get_next_story() {

		$next_post_id = get_next_post(true, '', 'issues')->ID;

		if(!empty($next_post_id)) {

			$options = [
				"image" 	=> get_field('featured_image_portrait', $next_post_id),
				"header" 	=> get_the_title($next_post_id),
				"text" 		=> mb_strimwidth(get_field('article_excerpt', $next_post_id), 0, 100, "..."),
				"link" 		=> get_permalink($next_post_id),
				"issue"		=> Self::get_post_term($next_post_id, 'issues')[0],
				"tax"			=> Self::get_post_term($next_post_id, 'topic')[0],
			];

			NextPost::add_options($options)->render();
		}
	}


	/* ================================================================
	 	End of article layout
	================================================================ */

	public static function add_article_end_section($postID, $alignment) {

		$issue = Self::get_post_term($postID, 'issues')[0];
		$tags = Self::get_post_term($postID, 'tags');
		$max_tags = count($tags);
		$count_value = 0;

		echo '<div class="[ l-ArticleEnd ' . $alignment . ' ]">';
			echo '<div class="[ l-ArticleEnd__inner ]">';
				echo '<div class="[ l-ArticleEnd__col ]">';
					echo '<div class="[ l-ArticleEnd__top ]">';
						echo '<p class="[ l-ArticleEnd__share-label ]">Share Article:</p>';
						Self::share_buttons($postID);
					echo '</div>';
					echo '<div class="[ l-ArticleEnd__bottom ]">';
						echo '<ul class="[ l-ArticleEnd__more-list ]">';
							echo '<li><p class="[ l-ArticleEnd__more-label ]">View More:</p></li>';
							echo '<li><a href="' . get_permalink( get_page_by_path( 'issue' ) ) . '?issue=' . $issue['id'] . '">Issue ' . $issue['name'] . ',</a></li>';
							foreach ($tags as $tag) {
								$comma = ($count_value < ($max_tags - 1)) ? ' ,' : ''; // want it to finish before last <li>
								echo '<li><a href="' . $tag['link'] . '">' . $tag['name'] . $comma .'</a></li>';
								$count_value ++;
							}
						echo '</ul>';
					echo '</div>';
				echo '</div>';
			echo '</div>';
		echo '</div>';
	}

	public static function get_editors_letter_panel() {

		if(isset($_GET['issue'])) {
			$active_issue = $_GET['issue'];
		} else {
			$active_issue = get_field('set_active_issue', 'options');
		}

		$term_id = get_term($active_issue)->taxonomy . '_' . $active_issue;
		$term_number = get_term($active_issue)->name;
		$image = get_field('editor_image', $term_id);
		$intro = get_field('introduction', $term_id);
		$content = get_field('editors_content', $term_id);
		$contributors = get_field('contributor', $term_id);

		echo '<div class="[ l-Panel ][ js-editors-panel ]">';
			echo '<div class="[ l-Panel__header ]">';
				echo '<span class="[ l-Panel__close ][ js-editors-close ]">Close</span>';
			echo '</div>';
			echo '<div class="[ l-Panel__content ]">';
				echo '<div class="[ l-EditorsLetter ]">';
					echo '<div class="[ l-EditorsLetter__inner ]">';
						echo '<div class="[ l-EditorsLetter__header ]">';
							echo '<h2>Founders&#39 letter</h2>';
						echo '</div>';
						if($image) {
							echo '<div class="[ l-EditorsLetter__image-wrap ]">';
								echo LazyImage::get_image($image, [50, 100], 'l-EditorsLetter__image', true, false);
							echo '</div>';
						}
						echo '<div class="[ l-EditorsLetter__content ]">';
							echo '<h4 class="[ l-EditorsLetter__intro ]">' . $intro .'</h4>';
							echo '<div class="[ l-EditorsLetter__text ]">';
								echo $content;
								echo '<span class="[ l-EditorsLetter__link ][ js-read-issue ]">Read Issue ' . $term_number . '</span>';
							echo '</div>';
							if(!empty($contributors)) {
								echo '<div class="[ l-EditorsLetter__contributors-wrap ]">';
									echo '<div class="[ l-EditorsLetter__contributors-left ]">';
										echo '<h4 class="[ l-EditorsLetter__contributors-header ]">Contributors</h4>';
									echo '</div>';
									echo '<div class="[ l-EditorsLetter__contributors-right ]">';
										foreach($contributors as $contributor) {
											echo '<div class="[ l-EditorsLetter__contributors-col ]">';
												echo '<ul>';
													echo '<li>' . $contributor['type'] . '</li>';
													foreach ($contributor['names'] as $person) {
														echo '<li>' . $person['name'] . '</li>';
													}
												echo '</ul>';
											echo '</div>';
										}
									echo '</div>';
								echo '</div>';
							}
						echo '</div>';
					echo '</div>';
				echo '</div>';
			echo '</div>';
		echo '</div>';
	}

	public static function get_issue_content_list_panel() {

		if(isset($_GET['issue'])) {
			$active_issue = $_GET['issue'];
		} else {
			$active_issue = get_field('set_active_issue', 'options');
		}

		$term_id = get_term($active_issue)->taxonomy . '_' . $active_issue;
		$term_number = get_term($active_issue)->name;
		$index = 2;

		$args = array(
			'post_type' 	=> Self::PostType,
			'post_status' => 'publish',
			'tax_query' 	=> array(
				array(
					'taxonomy' 	=> 'issues',
					'field' 		=> 'slug',
					'terms' 		=> $term_number,
				),
			),
		);

		$loop = new WP_Query( $args );
		echo '<div class="[ l-Panel ][ js-contents-panel ]">';
			echo '<div class="[ l-Panel__header ]">';
				echo '<span class="[ l-Panel__close ][ js-contents-close ]">Close</span>';
			echo '</div>';
			echo '<div class="[ l-Panel__content ]">';
				echo '<div class="[ l-ContentsList ]">';
					echo '<div class="[ l-ContentsList__inner ]">';
						echo '<ul class="[ l-ContentsList__list ]">';
							if(!empty($loop->posts)) {
								echo '<li>';
									echo '<div class="[  l-ContentsList__left ]">';
										echo '<span class="[  l-ContentsList__index ]">01</span>';
									echo '</div>';
									echo '<div class="[  l-ContentsList__right ]">';
										echo '<span class="[ js-trigger-letter ]">Editor’s Letter<span>3 Min Read</span></span>';
									echo '</div>';
								echo '</li>';
								foreach($loop->posts as $article) {
									echo '<li>';
										echo '<div class="[  l-ContentsList__left ]">';
											echo '<span class="[  l-ContentsList__index ]">' . sprintf("%02d", $index)  . '</span>';
										echo '</div>';
										echo '<div class="[  l-ContentsList__right ]">';
											echo '<a href="' . get_permalink($article->ID) . '">' . get_the_title($article->ID) . '<span>' . Self::estimated_reading_time($article->ID, true) . '</span></a>';
										echo '</div>';
									echo '</li>';
									$index++;
								}
							}
						echo '</ul>';
					echo '</div>';
				echo '</div>';
			echo '</div>';
		echo '</div>';
	}

	public static function get_more_posts() {

		$paged = $_POST['paged'] + 1;
		$posts_per_page = $_POST['postsPerPage'];
		$term = $_POST['termSlug'];

		$args = array(
			'post_type' => self::PostType,
			'post_status' => 'publish',
			'posts_per_page' => $posts_per_page,
			'paged' => $paged,
			'tax_query' 	=> array(
				'relation' => 'AND',
			),
		);

		if(!empty($term)) {
			$args['tax_query'][] = array(
				'taxonomy' 	=> 'tags',
				'field' 		=> 'slug',
				'terms' 		=> $term,
			);
		}

		$loop = new WP_Query($args);

		if ($loop->have_posts()) {
			while ($loop->have_posts()) : $loop->the_post();
				echo '<div class="[ l-4col__item ]">';

					$options = [
						"image" 		=> get_field('featured_image_portrait', get_the_id()),
						"header" 		=> get_the_title(get_the_id()),
						"text" 			=> mb_strimwidth(get_field('article_excerpt', get_the_id()), 0, 100, "..."),
						"link" 			=> get_permalink(get_the_id()),
						"issue"			=> Journal::get_post_term(get_the_id(), 'issues')[0],
						"tax"				=> Journal::get_post_term(get_the_id(), 'topic')[0],
						"read_time"	=> Journal::estimated_reading_time(get_the_id(), true),
					];

					PostCard::add_options($options)->render();
				echo '</div>';
			endwhile;

			wp_reset_query();

		} else {
			echo 'empty';
		}

		die();
	}

	public static function get_more_terms() {

		$paged = $_POST['paged'] + 1;
		$posts_per_page = $_POST['postsPerPage'];

		$terms = get_terms("issues");
		$next_issue_acf_id = get_term($next_issue)->taxonomy . '_' . $next_issue;
		$chunks = array_chunk($terms, $posts_per_page);

		foreach($chunks[$paged] as $term) {

			echo '<div class="[ l-IssueArchive__item ]">';

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
			];

			FeaturedArticle::add_options($options)->render();

			echo '</div>';
		}

		die();
	}
}
