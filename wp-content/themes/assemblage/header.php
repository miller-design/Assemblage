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

	<body <?php body_class('dark-state'); ?> g-component="BaseTheme"><?php

		$burger_tertiary_pages = [
			[
				"link" => '#',
				"link_text" => 'Contact',
			],
			[
				"link" => '#',
				"link_text" => 'Privacy Policy',
			],
			[
				"link" => '#',
				"link_text" => 'Terms & Conditions',
			],
		];

		$burger_social_links = [
			[
				"link" => get_field('facebook_url', 'options'),
				"link_text" => 'Facebook',
			],
			[
				"link" => get_field('twitter_url', 'options'),
				"link_text" => 'Twitter',
			],
			[
				"link" => get_field('instagram_url', 'options'),
				"link_text" => 'Instagram',
			],
		];

		TopNav::add_options([
			"nav"	=> get_field('main_menu', 'options'),
		])->render();

		BurgerMenu::add_options([
			"nav"							=> get_field('main_menu', 'options'),
			"seconday_links"	=> $burger_tertiary_pages,
			"social_links" 		=> $burger_social_links,
		])->render(); ?>

		<main class="[ l-Main ]">
			<!-- content -->
