<?php

/* =====================================
@description: Add slug to body class
====================================== */

function six_add_slug_body_class($classes) {

	global $wp;
	$request = $wp->request;

	if ($request && $request != "") {

		$numberlessUri = preg_replace('/[0-9]+/', '', $request);
		$classes[] = sanitize_title_with_dashes($numberlessUri);

	}

	return $classes;
}

add_filter('body_class', 'six_add_slug_body_class');
