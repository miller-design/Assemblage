<?php

get_header();

$term_name = get_queried_object()->name;
$term_post_count = get_queried_object()->count;
$post_count = '16';

if($_GET['page']) {
	$paged = $_GET['page'];
} else {
	$paged = 1;
}

$args = array(
	'post_type' 			=> 'journal',
	'post_status' 		=> 'publish',
	"posts_per_page"	=> $post_count * $paged,
	'paged' => $paged,
	'tax_query' 	=> array(
		array(
			'taxonomy' 	=> 'tags',
			'field' 		=> 'slug',
			'terms' 		=> get_queried_object()->slug,
		),
	),
);

$loop = new WP_Query( $args ); ?>

	<div class="[ l-SectionHeader l-SectionHeader--large l-SectionHeader--top ]">
		<p><?= $term_name ?><sup><?= $term_post_count ?></sup></p>
	</div>
	<div class="[ l-4col ]"
	g-component="AjaxLoadMore"
	g-options='{
		"ajaxCall":"load_more_posts",
		"postsPerPage": "<?= $post_count; ?>",
		"paged": "<?= $paged; ?>",
		"maxPages": "<?= $loop->max_num_pages; ?>",
		"termSlug": "<?= get_queried_object()->slug; ?>"}'
		>
		<div class="[ l-4col__inner ]" g-ref="contentArea"><?php
			if ($loop->have_posts()):
				while ($loop->have_posts()) : $loop->the_post();

					echo '<div class="[ l-4col__item ]">';
						$options = [
							"image" 		=> get_field('featured_image_portrait', get_the_id()),
							"header" 		=> get_the_title(get_the_id()),
							"text" 			=> mb_strimwidth(get_field('article_excerpt', get_the_id()), 0, 100, "..."),
							"link" 			=> get_permalink(get_the_id()),
							"issue"			=> Journal::get_post_term(get_the_id(), 'issues')[0],
							"tax"				=> Journal::get_post_term(get_the_id(), 'topic')[0],
							"read_time"	=> Journal::estimated_reading_time(get_the_id(), true),
						];

						PostCard::add_options($options)->render();
					echo '</div>';

				endwhile;
			endif;?>
		</div>
	</div><?php

get_footer();
