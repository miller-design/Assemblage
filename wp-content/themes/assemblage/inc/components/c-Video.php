<?php

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Video Component Class.
 *
 * @class       Video
 * @version     1.0.0
 */

class Video {

	// setup
	private $options;

	public function __construct($custom_options){

		SiteBase::insert_component_css(Self::class);

		$default_options = array(
			"video_url" 				=> '',
			"autoplay"  				=> false,
			"echo"							=> true,
			"classes" 					=> '',
		);

		$this->options = $default_options;
		$this->options = array_merge($default_options, $custom_options);

	}

	public static function add_options($custom_options = array()){
		return new self($custom_options);
	}

	public function render() {

		$output = '';
		$autoplay_var = ($this->options['autoplay'] === true) ? 'js-autoplay' : '';

		$output .= '<section class="[ c-Video ] ' . $this->options['classes'] . '" g-component="Video">';
			$output .= '<div class="[ c-Video__wrap ]">';
				$output .= '<video id="myVid_' . uniqid() . '" preload="auto" class="[ video-js vjs-custom ] ' . $autoplay_var . '" g-ref="videoPlayer">';
					$output .= '<source src="' . $this->options['video_url'] . '#t=0.2" type="video/mp4">';
				$output .= '</video>';
				$output .= '<svg g-ref="playIcon" class="[ c-Video__playIcon ]" role="img"><use xlink:href="' . get_template_directory_uri() . '/dist/sprite.svg#play-icon"></use></svg>';
			$output .= '</div>';
		$output .= '</section>';

		if($this->options['echo'] == true) {
			echo $output;
		} else {
			return $output;
		}
	}
}
