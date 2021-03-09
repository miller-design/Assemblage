<?php

/* =============================================================
	Images
	@description: Add Image sizes and thumbnail support
=============================================================== */
add_theme_support( 'post-thumbnails' );

// small
add_image_size('small', 400, 9999);

// medium
update_option('medium_size_w', 800);
update_option('medium_size_h', 9999);

// medium_large
update_option('medium_large_size_w', 1000);
update_option('medium_large_size_h', 9999);

// large
update_option('large_size_w', 1800);
update_option('large_size_h', 9999);

// xlarge
add_image_size('xlarge', 2500, 9999);


// make these sizes available in Wordpress admin
add_filter( 'image_size_names_choose', 'custom_img_sizes' );

function custom_img_sizes( $sizes ) {
	return array_merge( $sizes, array(
		'small' => __('Small'),
		'xlarge' => __('Extra Large'),
	) );
}

