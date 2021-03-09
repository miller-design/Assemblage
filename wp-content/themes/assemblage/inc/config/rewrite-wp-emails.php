<?php
/* ==========================================================
  Force WP system emails to come
	from a custom email address
=========================================================== */

function custom_sender_email($original_email_address) {

  return 'no-reply@' . $_SERVER['HTTP_HOST'];
}

function custom_sender_name($original_email_from) {

  return get_bloginfo('name');
}

add_filter('wp_mail_from', 'custom_sender_email');
add_filter('wp_mail_from_name', 'custom_sender_name');
