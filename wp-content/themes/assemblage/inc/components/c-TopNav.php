<?php

if (!defined('ABSPATH')) exit;

/**
 * TopNav Component Class
 *
 * @class       TopNav
 * @version     1.0.0
 */

class TopNav {

	// setup
	private $options;

	public function __construct($customOptions){

		SiteBase::insert_component_css(Self::class);

		$defaultOptions = array(
			"nav"					=> '',
			"burger_nav"	=> '',
			"classes"			=> '',
		);

		$this->options = $defaultOptions;
		$this->options = array_merge($defaultOptions, $customOptions);

		$this->options['nav'] = Self::build_menu_bar($this->options['nav']);

	}

	public static function add_options($customOptions = array()){
		return new self($customOptions);
	}

	private function build_menu_bar($links) {

		$output = null;

		$output .= '<ul class="[ c-TopNav__menu ]">';
			foreach ($links as $link) {
				$output .= '<li class="[ c-TopNav__menu-item ]">';
					$output .= '<a href="' . get_permalink($link) . '">' . get_the_title($link) . '</a>';
				$output .= '</li>';
			}
		$output .= '</ul>';

		return $output;

	}

	public function render(){ ?>

		<header class="[ c-TopNav ]" g-component="TopNav">
			<nav class="[ c-TopNav__inner ]">
				<div class="[ c-TopNav__left ]">
					<?= $this->options["nav"]; ?>
				</div>
				<div class="[ c-TopNav__center ]">
					<a class="[ c-TopNav__logo ]" href="/">
						Assemblage Views
					</a>
				</div>
				<div class="[ c-TopNav__right ]">
					<?= Burger::add_options()->render(); ?>
				</div>
			</nav>
		</header><?php
	}
}
