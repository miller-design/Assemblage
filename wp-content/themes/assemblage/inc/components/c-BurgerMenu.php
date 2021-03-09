<?php

if (!defined('ABSPATH')) exit;

/**
 * BurgerMenu Component Class
 * Includes a custome nav walker at bottom of file for portability
 *
 * @class       BurgerMenu
 * @version     1.0.0
 */

class BurgerMenu {

	// setup
	private $options;

	public function __construct($customOptions){

		SiteBase::insert_component_css(Self::class);

		$defaultOptions = array(
			"nav"							=> '',
			"social_links"		=> '',
			"copyright_text"	=> '',
			"classes"					=> '',
		);

		$this->options = $defaultOptions;
		$this->options = array_merge($defaultOptions, $customOptions);


		$this->options['nav'] = Self::build_main_menu(Self::get_admin_menu('header_menu'));
		$this->options['social_links'] = Self::create_social_list($this->options['social_links']);
		$this->options['copyright_text'] = '<p class="[ c-BurgerMenu__copwrite ]">' . $this->options['copyright_text'] . '</p>';
	}

	public static function add_options($customOptions = array()){
		return new self($customOptions);
	}

	private static function get_admin_menu($menu) {

		$main_menu = wp_nav_menu(array(
			'theme_location' => $menu,
			'menu' => 'Header Menu',
			'items_wrap' => '%3$s',
			'container' => false,
			'echo' => false,
			'fallback_cb' => false
		));

		return $main_menu;
	}

	private function build_main_menu($links) {

		$output = null;

		$output .= '<ul class="[ c-BurgerMenu__menu ]">';
			$output .= $links;
		$output .= '</ul>';

		return $output;

	}

	private function create_social_list($data) {

		$output = null;
		$i = 1;

		$output .= '<ul class="[ c-BurgerMenu__social-links ]">';
			foreach($data as $item) {

				$slash = ($i < count($data)) ? ' /' : '';

				$output .= '<li class="[ c-BurgerMenu__social-link ]">';
					$output .= '<a target="_blank" rel="noopener" href="' . $item['link'] . '">';
						$output .= $item['link_text'] . $slash;
					$output .= '</a>';
				$output .= '</li>';

				$i++;
			}
		$output .= '</ul>';

		return $output;
	}


	public function render(){ ?>

		<nav class="[ c-BurgerMenu ]" g-component="BurgerMenu">
			<div class="[ c-BurgerMenu__inner ]">
				<div class="[ c-BurgerMenu__nav ]">
					<?php echo $this->options["nav"]; ?>
				</div>
				<div class="[ c-BurgerMenu__bottom-section ]">
					<?php echo $this->options["copyright_text"]; ?>
					<?php echo $this->options["social_links"]; ?>
				</div>
			</div>
		</nav><?php
	}
}

