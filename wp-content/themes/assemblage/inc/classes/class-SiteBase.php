<?php
// Place all core Base Theme stuff in here

if (!defined('ABSPATH')) exit;


class SiteBase {

	public static function init() {

		// Automatically load all your theme configuration files from 'config' folder
		SiteBase::include_config_files();
		SiteBase::site_admin_customisations();
	}

	public static function insert_component_css($component){

		$component_css_name = 'c-' . $component;
		if( !wp_style_is($component_css_name, 'registered') ){
			wp_register_style($component_css_name, get_stylesheet_directory_uri() . '/dist/'. $component_css_name .'.css');
		}
		// output previously enqueed styles
		wp_print_styles( $component_css_name);

	}

	/* ================================================================
	 	Include all config files
	================================================================ */
	public static function include_config_files() {
		$loadPath = untrailingslashit(get_template_directory()) . '/inc/config/';

		foreach (glob("{$loadPath}/*.php") as $filename) {
			require_once($filename);
		}
	}


	/* ================================================================
	 	Put svg file inline into template
	 	@param str - $filename
		@return str
	================================================================ */
	public static function put_svg($filename) {
		$path = get_template_directory_uri() . "/assets/img/icons/" . $filename;
		echo file_get_contents($path, true);
	}


	/* ================================================================
		Limit Words
		@description: Limit any text string, and remove punctuation
	================================================================ */
	public static function site_limit_words($string, $word_limit, $ellipsis = "…") {

		$words = explode(" ", $string);
		$count = count($words);

		if ($count <= $word_limit) {
			return $string;
		}

		$implode = implode(" ", array_splice($words, 0, $word_limit));

		if (in_array(substr($implode, -1), array(",", ".", "!", "?", ":", ";"))) {

			$implode = substr_replace($implode, "", -1);
		}

		return $implode . $ellipsis;
	}

	/* ================================================================
		Widow Fix
		@description: Prevents widows.
		$text = string to fix
		$minWords = only apples to strings with more words than this value
	================================================================ */
	public static function widow_fix($text, $minWords = 4) {
		$return = $text;
		$arr = explode(' ', $text);
		if (count($arr) >= $minWords) {
			$arr[count($arr) - 2] .= '&nbsp;' . $arr[count($arr) - 1];
			array_pop($arr);
			$return = implode(' ', $arr);
		}
		return $return;
	}


	/* ================================================================
		Helper for 'acf-image-aspect-ratio-crop' plugin
		Returns the original image id if supplied the cropped image id
		@param int - cropped image id
		@return int - original attachment id
	================================================================ */
	public static function get_original_image_id($cropped_id)	{
		$original_image_id = get_post_meta(
			$cropped_id,
			'acf_image_aspect_ratio_crop_original_image_id',
			true
		);

		if (empty($original_image_id)) {
			return $cropped_id;
		} else {
			return $original_image_id;
		}
	}


	/* ================================================================
	 	six WP Admin area customisations
	================================================================ */
	public static function site_admin_customisations() {

		add_action('admin_bar_menu', function () {
			global $wp_admin_bar;

			$wp_admin_bar->add_menu(array(
				'id' => 'site-logo-admin-bar',
				'parent' => 'top-secondary',
				'title' => 'Assemblage'
			));
		});

		/* Remove Dashboard widgets */
		add_action('wp_dashboard_setup', function () {
			global $wp_meta_boxes;
			unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_comments']);
		});
	}
}
