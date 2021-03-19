<!DOCTYPE html>
<!--

Designed by Joe Small
https://cargocollective.com/joesmall
Developed By Miller Design
https://jackmiller.design/

-->
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">

	<head>
		<meta charset="utf-8" />
		<title><?php wp_title(); ?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
		<?php wp_head(); ?>
	</head>

	<body <?php body_class('dark-state'); ?> g-component="BaseTheme">

		<?= TopNav::add_options([
			"nav"	=> get_field('main_menu', 'options'),
		])->render(); ?>

		<main class="[ l-Main ]">
			<!-- content -->
