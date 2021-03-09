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
			"nav"								=> '',
			"secondary_nav"			=> '',
			"search"						=> '',
			"burger_nav_social"	=> '',
			"classes"						=> '',
		);

		$this->options = $defaultOptions;
		$this->options = array_merge($defaultOptions, $customOptions);


		$this->options['nav'] = Self::build_list(Self::get_admin_menu('header_menu'), 'c-TopNav__menu');
		$this->options['secondary_nav'] = Self::build_list(Self::get_admin_menu('header_secondary_menu'), 'c-TopNav__sub-menu');
		$this->options['search'] = '<p class="[ c-TopNav__search ]"><span>Search</span><svg role="img" class="[ c-TopNav__search-icon ]"><use xlink:href="' . get_template_directory_uri() . '/dist/sprite.svg#search"></use></svg></p>';
	}

	public static function add_options($customOptions = array()){
		return new self($customOptions);
	}

	private static function get_admin_menu($menu) {

		$main_menu = wp_nav_menu(array(
			'theme_location' => $menu,
			'items_wrap' => '%3$s',
			'container' => false,
			'echo' => false,
			'fallback_cb' => false,
		));

		return $main_menu;
	}

	private function build_list($links, $class) {

		$output = null;

		$output .= '<ul class="[ ' . $class . ' ]">';
			$output .= $links;
		$output .= '</ul>';

		return $output;

	}


	public function render(){ ?>

		<div class="[ c-TopNav ]" g-component="TopNav">
			<nav class="[ c-TopNav__inner ]">
				<div class="[ c-TopNav__left ]"><?php
					echo Burger::add_options()->render();
					$options = [
						"social_links"		=> $this->options['burger_nav_social'],
						"copyright_text"	=> '©' . date('Y') . ' HP + Partners',
					];
					BurgerMenu::add_options($options)->render();
					echo $this->options["nav"]; ?>
				</div>
				<div class="[ c-TopNav__center ]">
					<a class="[ c-TopNav__logo ]" href="/">
						<svg role="img"><use xlink:href="<?=get_template_directory_uri();?>/dist/sprite.svg#hp-partners-logo"></use></svg>
					</a>
				</div>
				<div class="[ c-TopNav__right ]">
					<?php echo $this->options['secondary_nav']; ?>
					<?php echo $this->options['search']; ?>
				</div>
			</nav>
		</div><?php
	}
}
