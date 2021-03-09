<?php get_header(); ?>

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<article <?php post_class() ?> id="post-<?php the_ID(); ?>">

			<h1><?php the_title(); ?></h1>

		</article>

	<?php endwhile; endif; ?>

<?php get_footer(); ?>