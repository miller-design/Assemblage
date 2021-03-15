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

		$default_options = array(
			"video_url" 				=> '',
			"autoplay"  				=> false,
			"classes" 					=> '',
			"echo"							=> false
		);

		$this->options = $default_options;
		$this->options = array_merge($default_options, $custom_options);

	}

	public static function addOptions($custom_options = array()){
		return new self($custom_options);
	}

	public function render() {

		$output = '';

		$output .= '<section class="[ c-Video ] ' . $this->options['classes'] . '" g-component="Video">';
			$output .= '<div class="[ c-Video__wrap ]">';
				$output .= '<video id="myVid_' . uniqid() . '" playsinline preload="auto" muted="video" class="[ video-js vjs-custom ] js-autoplay">';
					$output .= '<source src="' . $this->options['video_url'] . '#t=0.5" type="video/mp4">';
				$output .= '</video>';
			$output .= '</div>';
		$output .= '</section>';

		if($this->options['echo'] == true) {
			echo $output;
		} else {
			return $output;
		}
	}
}
