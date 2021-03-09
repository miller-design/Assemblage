<?php

if (!defined('ABSPATH')) {
    exit;
}

/**
 * LazyImage Class.
 * uses https://github.com/aFarkas/lazysizes
 *
 * @class       LazyImage
 * @version     2.0.0
 */

class LazyImage {

	public static function init() {

		if (!is_admin()) {
			add_filter('wp_get_attachment_image_attributes', array(__CLASS__, 'self::lazy_load_images_setup'), 20, 3);
		}

	}

	
	public static function get_image($img_id, $widths = 100, $class = null, $intrinsic = true, $flickity_lazy_load = false) {

		// different widths for each size device
		if (is_array($widths)) {

			$desktop_width = $widths[0];

			if (isset($widths[1])) {
				$tablet_width = $widths[1];
			} else {
				$tablet_width = $widths[0];
			}

			if (isset($widths[2])) {
				$mobile_width = $widths[2];
			} else {
				$mobile_width = 100;
			}

				// If $widths is an integer, use same $width value for Desktop and Mobile and make Mobile 100vw
		} else {
			$desktop_width = $widths;
			$tablet_width = $widths;
			$mobile_width = 100;
		}

		// build responsive image sizes
		$img_sizes = '(min-width: 1200px) ' . $desktop_width . 'vw, (min-width: 760px) ' . $tablet_width . 'vw, ' . $mobile_width . 'vw';

		// get ALT tag
		$img_alt = get_post_meta($img_id, '_wp_attachment_image_alt', true);

		// this could be any image size with correct ratio and can suitable for a
		// fallback img if respoinsive images/Javascript is not supported (nothing too big/small)
		$img_size = 'l';

		// get SRC for no responsive images fallbacks
		$img_src = wp_get_attachment_image_url($img_id, $img_size);

		// get markup for no js fallback
		$img_fallback = '<noscript><img src="' . esc_attr($img_src) . '" alt="' . esc_attr($img_alt) . '"></noscript>';

		// get responsive SRCSET
		// set to to get all possible image sizes
		$img_srcset = wp_get_attachment_image_srcset($img_id, 'full');

		// Find out if we need to add $class to the IMG or the 'intrincsic-image' wrapper
		if ($intrinsic) {
			$wrapper_class = $class;
			$img_class = null;
		} else {
			$img_class = $class;
		}

		// FINALLY! Build IMG el
		if ($flickity_lazy_load) {
			// If we need the Flicky lazyload...
			$img_element = '<img data-flickity-lazyload-src="' . esc_attr($img_src) . '"  data-flickity-lazyload-srcset="' . esc_attr($img_srcset) . '" data-sizes="' . $img_sizes . '" alt="' . esc_attr($img_alt) . '" class="' . $img_class . '">';
		} else {
			// standard lazy load...
			$img_element = '<img data-src="' . esc_attr($img_src) . '"  data-srcset="' . esc_attr($img_srcset) . '" data-sizes="' . $img_sizes . '" alt="' . esc_attr($img_alt) . '" class="lazy lazyload ' . $img_class . '">';
		}

		// add the 'intrinsic-image' wrapper div if rqd
		if ($intrinsic) {
			// figure out aspect ratio for intrinsic-image wrapper
			$img_data = wp_get_attachment_image_src($img_id, $img_size);
			$aspect_percentage = $img_data[2] / $img_data[1] * 100;

			return sprintf('<div class="%s intrinsic-image" style="padding-bottom: %s%%;">%s %s</div>', $wrapper_class, $aspect_percentage, $img_fallback, $img_element);

		} else {
			// or just output the IMG tag
			return $img_element;
		}
	}

	/* get_picture_elelemt. */
	public static function get_picture_element($img_ids, $breakpoints, $class = null) {

		// Error checking
		if(!is_array($img_ids) || !is_array($breakpoints) ){
			d('Error: get_picture_element() requires a valid array');
			return;
		}

		if(count($img_ids) < 2 ){
			d('Error: get_picture_element() requires there to always be at least 2 images');
			return;
		}

		if(count($breakpoints) != (count($img_ids) - 1) ){
			d('Error: get_picture_element() requires there to always be one less breakpoint than image');
			return;
		}

		$count = 0;
		$array_length = count($img_ids) - 1; // minus 1 as the array length also needs to count from 0
		$source = "";

		foreach ($img_ids as $imgid) {

			if($count < $array_length) {
				$mq = 'media="(min-width:' . $breakpoints[$count] . 'px)"';
			} else {
				$mq = "";
			}

			$source .= '<source ' . $mq . ' data-srcset="' . esc_attr( wp_get_attachment_image_srcset($img_ids[$count], 'xlarge')) . '" data-sizes="' . esc_attr( wp_get_attachment_image_sizes($img_ids[$count], 'xlarge')) . '" />';

			$count++;
		}

		$fallback_src = esc_attr( wp_get_attachment_image_url($img_ids[0], 'large'));

		$img_alt = get_post_meta( $img_ids[0], '_wp_attachment_image_alt', true );

		return '<picture>' . $source . '<img alt="' . esc_attr( $img_alt ) . '" data-src="' . $fallback_src . '" class="lazyload ' . $class . '" /></picture>';

	}


	/* Setup lazy load images. */
	public static function lazy_load_images_setup($attr, $attachment, $size) {

		//return $attr;
		if (isset($attr['src'])) {
			$data_src = $attr['src'];
			unset($attr['src']);
			$attr['data-src'] = $data_src;
		}

		if (isset($attr['sizes'])) {
			$data_sizes = $attr['sizes'];
			unset($attr['sizes']);
			$attr['data-sizes'] = $data_sizes;
		}

		if (isset($attr['srcset'])) {
			$data_srcset = $attr['srcset'];
			unset($attr['srcset']);
			$attr['data-srcset'] = $data_srcset;

			unset($attr['src']);
		}

		$imgData = get_post($attachment->ID);

		$attr['data-caption'] = $imgData->post_excerpt;
		$attr['class'] .= ' lazy lazyload';

		return $attr;

	}

}

new LazyImage();
