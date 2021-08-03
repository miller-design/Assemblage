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

		<link rel="apple-touch-icon" sizes="180x180" href="<?= get_template_directory_uri(); ?>/src/favicon/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="<?= get_template_directory_uri(); ?>/src/favicon/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="<?= get_template_directory_uri(); ?>/src/favicon/favicon-16x16.png">
		<link rel="manifest" href="<?= get_template_directory_uri(); ?>/src/favicon/site.webmanifest">
		<link rel="mask-icon" href="<?= get_template_directory_uri(); ?>/src/favicon/safari-pinned-tab.svg" color="#000000">
		<link rel="shortcut icon" href="<?= get_template_directory_uri(); ?>/src/favicon/favicon.ico">
		<meta name="msapplication-TileColor" content="#ffffff">
		<meta name="msapplication-config" content="<?= get_template_directory_uri(); ?>/src/favicon/browserconfig.xml">
		<meta name="theme-color" content="#ffffff">

		<meta name="twitter:card" content="summary_large_image">
		<meta name="twitter:title" content="Assemblage Views">
		<meta name="twitter:description" content="Assemblage Views is a magazine. We explore what it means to be a responsible global citizen of the 21st century. Together with you, we bring varied perspectives across creative, innovative and evolutionary pursuits to inspire and effect positive change.">
		<meta name="twitter:image" content="<?= get_template_directory_uri(); ?>/src/favicon/AV_meta_card.jpg">
		<meta name="twitter:image:alt" content="Assemblage views cover image">

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
	}

	if(is_front_page() && !isset($_COOKIE['Preloader'])) {
		include get_template_directory() . '/templates/preloader.php';
	}	?>

	<body <?php body_class([$headerClass]); ?> g-component="BaseTheme"><?php

		$burger_tertiary_pages = [
			[
				"link" => get_permalink(get_page_by_path('contact')),
				"link_text" => 'Contact',
			],
			[
				"link" => get_permalink(get_page_by_path('privacy-policy')),
				"link_text" => 'Privacy Policy',
			],
			[
				"link" => get_permalink(get_page_by_path('terms-conditions')),
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
