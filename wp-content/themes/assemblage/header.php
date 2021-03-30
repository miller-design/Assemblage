<!DOCTYPE html>
<!--

Designed by Joe Small
https://cargocollective.com/joesmall
Developed By Jack Miller
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
	<?php $headerClass = '';
	if(is_singular('journal')) {
		if(get_field('have_black_background', get_the_id()) === false && get_field('spotlight_style', get_the_id()) === 'name-only') {
			$headerClass = 'white-bg';
		} else if(get_field('have_black_background', get_the_id()) === true && get_field('spotlight_style', get_the_id()) === 'name-only') {
			$headerClass = 'black-bg';
		} else if(get_field('journal_header') === 'full-screen' || get_field('journal_header',  get_the_id()) === 'video' && get_field('background_colour', get_the_id())[0]['colours']['label'] === 'Black') {
			// want to keep header white
			$headerClass = '';
		} else {
			$headerClass = 'dark-state';
		}
	} else {
		$headerClass = 'dark-state';
	}?>

	<body <?php body_class([$headerClass]); ?> g-component="BaseTheme"><?php

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

		if(is_singular('journal')) {

			ProgressBar::add_options([
				"page_header"		=> get_the_title()
			])->render();

		}

		BurgerMenu::add_options([
			"nav"							=> get_field('main_menu', 'options'),
			"seconday_links"	=> $burger_tertiary_pages,
			"social_links" 		=> $burger_social_links,
		])->render(); ?>

		<main class="[ l-Main ]">
			<!-- content -->
