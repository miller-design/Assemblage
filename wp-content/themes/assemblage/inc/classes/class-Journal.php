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
		add_action('after_setup_theme', 'Journal::block_editor_disable_core_patterns');
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

	public static function block_editor_disable_core_patterns() {
		remove_theme_support( 'core-block-patterns' );
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

	public static function estimated_reading_time() {

		global $post;

		if ( has_blocks( $post->post_content ) ) {
			$blocks = parse_blocks( $post->post_content );
			$content = '';

			foreach ( $blocks as $block) {
				if($block['blockName'] === 'acf/textblock') {
					$content .= $block['attrs']['data']['text_block'];
				}
			}

			$word_count = str_word_count(strip_tags($content));
			$read_time = ceil($word_count / 250);


			if ($read_time == 1) {
				$suffix = 'minute read time';
			} else {
				$suffix = 'minutes read time';
			}

			return '<span class="read-time">' . $read_time . ' ' . $suffix . '</span>';
		}
	}

	public static function get_post_term_links($post_id, $tax) {

		$issues_tax = wp_get_object_terms($post_id, $tax);
		$output = '';

		if (!empty($issues_tax)) {

			foreach ($issues_tax as $issue) {

				$output .= '<a href="' . get_term_link($issue) . '">Issue ' . $issue->name . '</a>';

			}

			return $output;
		}
	}
}
