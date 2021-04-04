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
		add_action( "wp_ajax_load_editors_letter", 'Journal::get_editors_letter_panel');
		add_action( "wp_ajax_nopriv_load_editors_letter", 'Journal::get_editors_letter_panel');

		add_action( "wp_ajax_load_content_list", 'Journal::get_issue_content_list_panel');
		add_action( "wp_ajax_nopriv_load_content_list", 'Journal::get_issue_content_list_panel');

		add_action( "wp_ajax_load_more_posts", 'Journal::get_more_posts');
		add_action( "wp_ajax_nopriv_load_more_posts", 'Journal::get_more_posts');
	}

	public static function set_up_post_type() {

		$args = array(
			'labels' => array(
				'name' => 'Journal',
				'singular_name' => 'Journal',
			),
			'public' => true,
			'has_archive' => false,
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

		if (get_field('modules', $ID)) {

			$modules = get_field('modules', $ID);
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
					'link' =>  get_term_link($issue),
					'name' => $issue->name,
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

	public static function get_next_story($postID) {

		$options = [
			"image" 	=> get_field('featured_image_portrait', $postID),
			"header" 	=> get_the_title($postID),
			"text" 		=> mb_strimwidth(get_field('article_excerpt', $postID), 0, 100, "..."),
			"link" 		=> get_permalink($postID),
			"issue"		=> Self::get_post_term(get_the_id(), 'issues')[0],
			"tax"			=> Self::get_post_term(get_the_id(), 'topic')[0],
		];

		NextPost::add_options($options)->render();

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
						echo '<p class="[ l-ArticleEnd__more-label ]">View More:</p>';
						echo '<ul class="[ l-ArticleEnd__more-list ]">';
							echo '<li><a href="' . $issue['link'] . '">Issue ' . $issue['name'] . ',</a></li>';
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

		$term_id = $_POST['term'];
		$term_number = $_POST['number'];
		$image = get_field('editor_image', $term_id);
		$intro = get_field('introduction', $term_id);
		$content = get_field('editors_content', $term_id);
		$contributors = get_field('contributors', $term_id);

		// echo $_POST['text'];
		echo "<div class='[ l-EditorsLetter ]'>";
			echo "<div class='[ l-EditorsLetter__inner ]'>";
				echo "<div class='[ l-EditorsLetter__header ]'>";
					echo "<h2>Editor's letter</h2>";
				echo "</div>";
				if($image) {
					echo "<div class='[ l-EditorsLetter__image-wrap ]'>";
						echo LazyImage::get_image($image, [50, 100], 'l-EditorsLetter__image', true, false);
					echo "</div>";
				}
				echo "<div class='[ l-EditorsLetter__content ]'>";
					echo "<h4 class='[ l-EditorsLetter__intro ]'>" . $intro ."</h4>";
					echo "<div class='[ l-EditorsLetter__text ]'>";
						echo $content;
						echo "<span class='[ l-EditorsLetter__link ][ js-read-issue ]'>Read Issue " . $term_number . "</span>";
					echo "</div>";
					echo "<div class='[ l-EditorsLetter__contributors-wrap ]'>";
						echo "<div class='[ l-EditorsLetter__contributors-left ]'>";
							echo "<h4 class='[ l-EditorsLetter__contributors-header ]'>Contributors</h4>";
						echo "</div>";
						echo "<div class='[ l-EditorsLetter__contributors-right ]'>";
							if(!empty($contributors['editors'])) {
								echo "<div class='[ l-EditorsLetter__contributors-col ]'>";
									echo "<ul>";
										echo "<li>Editors</li>";
										foreach ($contributors['editors'] as $editor) {
											echo "<li>" . $editor['name'] . "</li>";
										}
									echo "</ul>";
								echo "</div>";
							}
							if(!empty($contributors['art_direction'])) {
								echo "<div class='[ l-EditorsLetter__contributors-col ]'>";
									echo "<ul>";
										echo "<li>Art Direction</li>";
										foreach ($contributors['art_direction'] as $editor) {
											echo "<li>" . $editor['name'] . "</li>";
										}
									echo "</ul>";
								echo "</div>";
							}
							if(!empty($contributors['articles'])) {
								echo "<div class='[ l-EditorsLetter__contributors-col ]'>";
									echo "<ul>";
										echo "<li>Articles</li>";
										foreach ($contributors['articles'] as $editor) {
											echo "<li>" . $editor['name'] . "</li>";
										}
									echo "</ul>";
								echo "</div>";
							}
							if(!empty($contributors['images'])) {
								echo "<div class='[ l-EditorsLetter__contributors-col ]'>";
									echo "<ul>";
										echo "<li>Images</li>";
										foreach ($contributors['images'] as $editor) {
											echo "<li>" . $editor['name'] . "</li>";
										}
									echo "</ul>";
								echo "</div>";
							}
							if(!empty($contributors['stylelist'])) {
								echo "<div class='[ l-EditorsLetter__contributors-col ]'>";
									echo "<ul>";
										echo "<li>Stylist</li>";
										foreach ($contributors['stylelist'] as $editor) {
											echo "<li>" . $editor['name'] . "</li>";
										}
									echo "</ul>";
								echo "</div>";
							}
							if(!empty($contributors['special_thanks'])) {
								echo "<div class='[ l-EditorsLetter__contributors-col ]'>";
									echo "<ul>";
										echo "<li>Special thanks</li>";
										foreach ($contributors['special_thanks'] as $editor) {
											echo "<li>" . $editor['name'] . "</li>";
										}
									echo "</ul>";
								echo "</div>";
							}
						echo "</div>";
					echo "</div>";
				echo "</div>";
			echo "</div>";
		echo "</div>";

		die();
	}

	public static function get_issue_content_list_panel() {

		$term_id = $_POST['term'];
		$term_number = $_POST['number'];
		$index = 2;

		$args = array(
			'post_type' 	=> Self::PostType,
			'post_status' => 'publish',
			'tax_query' 	=> array(
				array(
					'taxonomy' 	=> 'issues',
					'field' 		=> 'slug',
					'terms' 		=> $term_number
				),
			),
		);

		$loop = new WP_Query( $args );

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

		die();
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

		if ( $loop->have_posts() ) {
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
}
