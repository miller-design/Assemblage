<?php

/* =============================================================
	Debugging
	@description: Debug an array
	$item string/array
	$die boolean Should we kill PHP after showing the debug data?
	$vardump boolean
=============================================================== */
function d($item, $die = true, $vardump = false) {

	echo '<div style="background-color: #DA4624; color: #E1D041; padding: 10px; font-weight: bold;">';

	if ($die) {
		die('<pre>' . ($vardump ? var_dump($item) : print_r($item, true)) . '</pre>');
	} else {
		echo '<pre>';
		($vardump ? var_dump($item) : print_r($item));
		echo '</pre>';
	}

	echo'</div>';
}
