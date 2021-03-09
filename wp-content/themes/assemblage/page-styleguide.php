<?php get_header(); ?>

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<div class="sg-type" data-title="H1 Fakt Pro: Normal">
			<h1 class="h1">Exhibitions</h1>
		</div>

		<div class="sg-type" data-title="H2 Fakt Pro: Normal">
			<h2 class="h2">Pieter Hugo</h2>
		</div>

		<div class="sg-type" data-title="H3 Fakt Pro: Normal">
			<h3 class="h3">Artworks</h3>
		</div>

		<div class="sg-type" data-title="H4 Fakt Pro: Normal">
			<h4 class="h4">Sebastião Salgado</h4>
		</div>

		<div class="sg-type" data-title="P1 Fakt Pro: Normal">
			<p class="p1">Cig Harvey</p>
		</div>

		<div class="sg-type" data-title="P2 Fakt Pro: Normal">
			<p class="p1-blond">A photographer whose practice seeks to find the magical in everyday life.</p>
		</div>

		<div class="sg-type" data-title="P3 Fakt Pro: Normal">
			<p class="p2">This Artwork Changed My Life: “Knowing The Way”</p>
		</div>

		<div class="sg-type" data-title="P4 Fakt Pro: Normal">
			<p class="p2-blond">Miss Portland’s Diner, 2010</p>
		</div>

		<div class="sg-type" data-title="P5 Fakt Pro: Normal">
			<p class="p3">DANIEL GORDON Miss Portland's Diner, Sadie</p>
		</div>

		<div class="sg-type" data-title="P6 Fakt Pro: Normal">
			<p class="p3-blond">Painting, Photography, Sculpture</p>
		</div>

		<div class="sg-type" data-title="P7 Fakt Pro: Normal">
			<p class="p4">By continuing to use this site you consent with our cookie policy. You can read more here.</p>
		</div>

		<div class="sg-type" data-title="P8 Fakt Pro: Normal">
			<p class="p5">Interview</p>
		</div>

		<div class="sg-type" data-title="Body Text">
			<p>Lorem ipsum dolor sit amet, <strong>consectetur</strong> adipiscing elit. Maecenas tristique neque id risus hendrerit, eget vestibulum nunc finibus. Aliquam est nulla, bibendum ut eros at, dictum euismod est. Mauris sodales magna sed sollicitudin molestie. Quisque mauris nisi, placerat a sem id, condimentum vestibulum tortor.</p>
			<br>
			<p><strong>Pellentesque</strong> non dolor sagittis, viverra <strong>dolor</strong> quis, facilisis purus. Etiam eget urna vel ligula rutrum elementum. Nam non neque id nunc fringilla tincidunt. Etiam vel dui mi.</p>
		</div>

		<div class="sg-element" data-title="Button - Square">
			<button class="button-square">Enquire</button>
		</div>

		<div class="sg-element" data-title="Button - Round">
			<button class="button-round">
				<svg role="img"><use xlink:href="<?= get_template_directory_uri(); ?>/dist/sprite.svg#arrow"></use></svg>
				View Artist
			</button>
		</div>

		<div class="sg-element" data-title="Tag">
			<button class="button-tag">Painting</button>
			<button class="button-tag">Surrealism</button>
			<button class="button-tag">News</button>
		</div>

		<div class="sg-element" data-title="Featured Tag">
			<button class="button-tag-large">Photography</button>
			<button class="button-tag-large">Art</button>
			<button class="button-tag-large">Collage</button>
		</div>

		<div class="sg-element" data-title="Contact Form">
			<?php Forms::output_contact_form(); ?>
		</div>
		

		<div class="sg-element" data-title="WYSIWYG content">
			<article class="wysiwyg">
				<?php the_content(); ?>
			</article>
		</div>

	<?php endwhile; endif; ?>


<?php get_footer(); ?>
