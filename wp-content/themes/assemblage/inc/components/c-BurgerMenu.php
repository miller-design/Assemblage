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
			"seconday_links"	=> '',
			"social_links" 		=> '',
			"classes"					=> '',
		);

		$this->options = $defaultOptions;
		$this->options = array_merge($defaultOptions, $customOptions);


		$this->options['nav'] = Self::build_main_menu($this->options['nav']);

		if($this->options['seconday_links']) {
			$this->options['seconday_links'] = Self::build_sub_menu($this->options['seconday_links']);
		}

		if($this->options['social_links']) {
			$this->options['social_links'] = Self::build_sub_menu($this->options['social_links']);
		}
	}

	public static function add_options($customOptions = array()){
		return new self($customOptions);
	}

	private function build_main_menu($links) {

		$output = null;
		$i = 1;

		$output .= '<ul class="[ c-BurgerMenu__main ]">';
			foreach ($links as $link) {

				if(get_the_title($link) === 'Issue') {
					$title = get_the_title($link) . ' ' . get_term(get_field('set_active_issue', 'options'))->name;
					$active_issue_acf_id = get_term(get_field('set_active_issue', 'options'))->taxonomy . '_' . get_field('set_active_issue', 'options');
					$image = get_field('featured_image', $active_issue_acf_id);
					$url = wp_get_attachment_image_src($image, 'large_size_w' )[0];
				} else {
					$title = get_the_title($link);
					$url = wp_get_attachment_image_src( get_post_thumbnail_id($link), 'large_size_w' )[0];
				}
				$animation_number = '0.' . $i;
				$animation_var = ((1000 * $animation_number) + 300) . 'ms';

				$output .= '<li class="[ c-BurgerMenu__main-item ]" g-ref="hoverLinks" data-img-src="' . $url . '" style="--animation-delay: ' . $animation_var . ';">';
					$output .= '<a href="' . get_permalink($link) . '">' . $title . '</a>';
				$output .= '</li>';
				$i++;
			}

			$output .= '<li class="[ c-BurgerMenu__main-item ]" style="--animation-delay: ' . $animation_var . ';">';
				$output .= '<a href="https://www.assemblageworld.com/" target="_blank" rel="noopener">World</a>';
			$output .= '</li>';
		$output .= '</ul>';

		return $output;
	}

	private function build_sub_menu($links) {

		$output = null;

		$output .= '<ul class="[ c-BurgerMenu__secondary ]">';
			foreach ($links as $link) {
				if(!empty($link['link'])) {
					$output .= '<li class="[ c-BurgerMenu__secondary-item ]">';
						$output .= '<a href="' . $link['link'] . '">' . $link['link_text'] . '</a>';
					$output .= '</li>';
				}
			}
		$output .= '</ul>';

		return $output;

	}

	public function render(){ ?>

		<nav class="[ c-BurgerMenu ]" g-component="BurgerMenu">
			<div class="[ c-BurgerNav__links ]">
				<div class="[ c-BurgerNav__top ]">
					<?= $this->options["nav"]; ?>
				</div>
				<div class="[ c-BurgerNav__bottom ]">
					<?= $this->options["seconday_links"]; ?>
					<?= $this->options["social_links"]; ?>
				</div>
			</div>
			<div class="[ c-BurgerMenu__image-area ]" g-ref="imageArea"></div>
		</nav><?php
	}
}
