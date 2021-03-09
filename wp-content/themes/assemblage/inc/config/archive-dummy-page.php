<?php

/* ============================================================
    Get page object for events archive (dummy page for ACF)
============================================================ */

function archive_page_info() {

    global $post;

    // if it's a page after all - just reurn the ID
    if ($post->post_type == 'page') {
        return $post;
    }

    // Get object of the current CPT
    $postTypeInfo = get_post_type_object( $post->post_type );

    // Lookup the slug defined in the rewrite rules for the CPT
    $path = $postTypeInfo->rewrite['slug'];

    // Check the slug isn't invalid ie. events/%event-type% for the rewrite rules, and correct
    if (strpos($path, '%') !== FALSE) {
        $path = strstr($path, '%', true);
    }

    // Create an object of the CPT's archive page by looking it up using it's path set in WP admin Pages section
    $archivePage = get_page_by_path($path);

    return $archivePage;
}