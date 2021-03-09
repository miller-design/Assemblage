<?php get_header(); ?>

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<article <?php post_class() ?> id="post-<?php the_ID(); ?>">
			<a href="<?php echo get_permalink(get_the_id()); ?>">
				<h1><?php the_title(); ?></h1><?php
				echo Journal::estimated_reading_time();
				echo '<br/>';
				echo Journal::get_post_term_links(get_the_id(), 'issues');
				?>
			</a>

		</article>

	<?php endwhile; endif; ?>

<?php get_footer(); ?>