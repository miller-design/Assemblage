<?php

/* ================================================================================
	Disables pinterest link that appears on images when you hover over them
================================================================================= */

function disable_pin_on_images( $attr, $attachment ) {

	$attr['data-pin-nopin'] = 'nopin';

	return $attr;
}

add_filter( 'wp_get_attachment_image_attributes', 'disable_pin_on_images', 10, 2 );
