<?php

acf_add_options_page(array(
	'page_title' => 'Site Options',
	'menu_title' => 'Site Options',
	'menu_slug' => 'site-options',
	'capability' => 'edit_posts',
	'redirect' => false,
	'icon_url' => 'dashicons-admin-tools'
));
