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

		$social_links = [
			[
				"link" => get_field('instagram_url', 'options'),
				"link_text" => 'In',
			],
			[
				"link" => get_field('twitter_url', 'options'),
				"link_text" => 'Tw',
			],
			[
				"link" => get_field('facebook_url', 'options'),
				"link_text" => 'Fb',
			],
		]; ?>

		<header><?php

			$options = [
				"social_links"		=> $social_links,
				"copyright_text"	=> '©' . date('Y') . ' Assemblage',
			];

			Burger::add_options()->render();
			BurgerMenu::add_options($options)->render(); ?>
		</header>


		<main class="[ l-Main ]">
			<!-- content -->
