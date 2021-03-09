<?php

/* =============================================================================
	remove the default Posts post type from admin menus, we have a CPT for news
============================================================================== */

function remove_default_post_type() {

	remove_menu_page( 'edit.php' );
}
add_action( 'admin_menu', 'remove_default_post_type' );


function remove_default_post_type_menu_bar( $wp_admin_bar ) {

	$wp_admin_bar->remove_node( 'new-post' );
}
add_action( 'admin_bar_menu', 'remove_default_post_type_menu_bar', 999 );


function remove_draft_widget(){

	remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
}
add_action( 'wp_dashboard_setup', 'remove_draft_widget', 999 );
