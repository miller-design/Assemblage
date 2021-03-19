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
		add_filter('pre_get_document_title', 'Journal::change_taxonomy_title');
		add_action('pre_get_posts', 'Journal::limit_posts_per_page');
	}

	public static function set_up_post_type() {

		$args = array(
			'labels' => array(
				'name' => 'Journal',
				'singular_name' => 'Journal',
			),
			'public' => true,
			'has_archive' => true,
			'rewrite' => array('slug' => 'journal'),
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
	}


	public static function change_taxonomy_title($title) {
    if (is_tax('issues')) {
      // return  'Assemblage Issue';
    }
    return $title;
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
				// loop through all nested text blocks
				foreach($blocks as $block) {
					// add blocks to the content variable
					$content .= $block['text_area'];
				}
			}

			$word_count = str_word_count(strip_tags($content));
			$read_time = ceil($word_count / 250);

			$suffix = ($short_hand === true) ? 'min read' : 'minute read time';

			return '<span class="read-time">' . $read_time . ' ' . $suffix . '</span>';
		}
	}


	public static function get_post_topic($post_id) {

		$topic_tax = wp_get_object_terms($post_id, 'topic');
		$output = '';

		if (!empty($topic_tax)) {

			foreach ($topic_tax as $topic) {

				$output .= $topic->name;

			}

			return $output;
		}
	}


	public static function get_post_term($post_id, $tax) {

		$issues_tax = wp_get_object_terms($post_id, $tax);

		$output = [
			"link" => '',
			"name" => '',
		];

		if (!empty($issues_tax)) {

			foreach ($issues_tax as $issue) {

				$output['link'] = get_term_link($issue);
				$output['name'] = $issue->name;

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
	 	Social Media Share Links
	================================================================ */

	public static function get_next_story($postID) {

		$options = [
			"image" 	=> get_field('featured_image_portrait', $postID),
			"header" 	=> get_the_title($postID),
			"text" 		=> mb_strimwidth(get_field('article_excerpt', $postID), 0, 100, "..."),
			"link" 		=> get_permalink($postID),
			"issue"		=> Self::get_post_term(get_the_id(), 'issues'),
			"tax"			=> Self::get_post_term(get_the_id(), 'topic'),
		];

		NextPost::add_options($options)->render();

	}
}
