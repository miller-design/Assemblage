<?php
/* ==========================================================
  Actions to make WPAdmin more streamlined
=========================================================== */

/*  =============================
	Move Yoast to bottom
============================= */

add_filter( 'wpseo_metabox_prio', 'six_yoast_to_bottom');

function six_yoast_to_bottom() {

	return 'low';

}

/* =============================
  Admin Configuration
============================== */

function remove_dashboard_widgets(){
	remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal'); // Recent Comments
	remove_meta_box('dashboard_incoming_links', 'dashboard', 'normal');  // Incoming Links
	remove_meta_box('dashboard_plugins', 'dashboard', 'normal');   // Plugins
	remove_meta_box('dashboard_quick_press', 'dashboard', 'side');  // Quick Press
	remove_meta_box('dashboard_recent_drafts', 'dashboard', 'side');  // Recent Drafts
	remove_meta_box('dashboard_primary', 'dashboard', 'side');   // WordPress blog
	remove_meta_box('dashboard_secondary', 'dashboard', 'side');   // Other WordPress News
}

add_action('wp_dashboard_setup', 'remove_dashboard_widgets');
