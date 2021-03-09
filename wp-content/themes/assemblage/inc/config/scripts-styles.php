<?php

/* ==========================================================
	Scripts and Styles
	@description:   Enqueue scripts and styles to wp_head
=========================================================== */

function site_scripts_styles_function() {

	// Replace jQuery version
	wp_deregister_script('jquery');
	wp_register_script('jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js', array(), '1', true);
	wp_enqueue_script('jquery');

	/**
	 * Enqueue scripts and styles.
	 * Loads bundled frontend CSS.
	 */
	wp_enqueue_style( 'site_styles', get_stylesheet_directory_uri() . '/dist/main.css' );
	wp_enqueue_script( 'site_scripts', get_template_directory_uri() . '/dist/main-bundle.js', array(), null, true );

	$scriptvars = array(
		'ajaxurl' => admin_url('admin-ajax.php'),
		'nonce' => wp_create_nonce('assemblage'),
		'template_directory' => get_bloginfo('template_directory'),
	);
	wp_localize_script('site_scripts', 'assemblage', $scriptvars);

}

add_action('wp_enqueue_scripts', 'site_scripts_styles_function');
