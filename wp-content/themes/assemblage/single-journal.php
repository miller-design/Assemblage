<?php get_header(); ?>

	<article class="[ l-JournalSingle ]"><?php

		if(get_field('journal_header')) { ?>
			<div class="[ l-JournalSingle__section ]"><?php
				$options = [
					"image" 					=> get_field('featured_image', get_the_id()),
					"header_text" 		=> get_the_title(get_the_id()),
					"excerpt" 				=> get_field('article_excerpt', get_the_id()),
					"issue_number"		=> Journal::get_post_term(get_the_id(), 'issues'),
					"term"						=> Journal::get_post_term(get_the_id(), 'topic'),
					"read_time"				=> Journal::estimated_reading_time(get_the_id(), true),
					"header_type"			=> get_field('journal_header'),
				];

				if(get_field('journal_header') === 'half-screen-v1' || get_field('journal_header') === 'half-screen-v2' || get_field('journal_header') === 'half-screen-v3') {
					$options["additional_text"] = get_field('header_blocks');
					ArticleSplitHeader::add_options($options)->render();
				} else if(get_field('journal_header') === 'full-screen' || get_field('journal_header') === 'video') {
					ArticleHeader::add_options($options)->render();
				} else if(get_field('journal_header') === 'interview') {
					$options["background_colour"] = get_field('background_colour');
					InterviewHeader::add_options($options)->render();
				} ?>
			</div><?php

		}

		// Check value exists.
		if( have_rows('modules', get_the_id())):
			// Loop through rows.
			while ( have_rows('modules', get_the_id()) ) : the_row();
					// Case: Paragraph Block.
					if( get_row_layout() == 'paragraph_blocks' ):
						$side_bar_options = get_sub_field('side_bar_options');
						$block_alignment = (get_sub_field('block_alignment') === 'right') ? 'l-ParagraphBlocks--right' : 'l-ParagraphBlocks--left';
						$caption_download = get_sub_field('captions_and_downloads');
						$quote_text = get_sub_field('quote_text');
						$image = LazyImage::get_image(get_sub_field('image'), 'l-ParagraphBlocks__sidebar-image');
						$blocks = get_sub_field('blocks');?>

						<div class="[ l-ParagraphBlocks <?= $block_alignment; ?> ]">
							<div class="[ l-ParagraphBlocks__inner ]">
								<div class="[ l-ParagraphBlocks__col-left ]"><?php
									if($side_bar_options === 'v1') {
										// article details
										$issue_number = Journal::get_post_term(get_the_id(), 'issues');
										$read_time = Journal::estimated_reading_time(get_the_id(), true);

										echo '<div class="[ l-ParagraphBlocks__article-details ]">';
											echo '<p class="[ l-ParagraphBlocks__downloads-text ]">Issue ' . $issue_number['name'] . ' • ' . $read_time . '</p>';
										echo '</div>';

									} else if($side_bar_options === 'v2') {
										// caption and download
										echo '<div class="[ l-ParagraphBlocks__downloads ]">';
											echo '<p class="[ l-ParagraphBlocks__downloads-text ]">' . $caption_download['text'] . '</p>';
											if(!empty($caption_download['downloads'])) {
												echo '<ul class="[ l-ParagraphBlocks__downloads ]">';
													foreach($caption_download['downloads'] as $download) {
														echo '<li class="[ l-ParagraphBlocks__download-link ]">';
															echo '<a download href="' . $download['download_file']['url'] . '">Download ' . $download['download_file']['type'] . '<span>' . size_format($download['download_file']['filesize'], 1) . '</span></a>';
														echo '</li>';
													}
												echo '</ul>';
											}
										echo '</div>';

									} else if($side_bar_options === 'v3') {
										// image
										echo $image;
									} else if($side_bar_options === 'v4') {
										// quote
										echo '<p class="[ l-ParagraphBlocks__sidebar-quote ]">' . $quote_text . '</p>';
									} ?>
								</div>
								<div class="[ l-ParagraphBlocks__col-right ]"><?php
									foreach($blocks as $block) {

										if($block['acf_fc_layout'] === 'paragraph') {

											echo '<p class="[ l-ParagraphBlocks__text-block ]">' . $block['text_area'] . '</p>';

										} else if($block['acf_fc_layout'] === 'large_text') {

											$classes = ($block['quote'] === true) ? 'l-ParagraphBlocks--quote ' : '';
											$classes .= ($block['align_text_center'] === true) ? 'l-ParagraphBlocks--text-center ' : '';
											echo '<p class="[ l-ParagraphBlocks__text-block ' . $alignment . ']">' . $block['text_area'] . '</p>';

										} else if($block['acf_fc_layout'] === 'interview_paragraph') {

											echo '<p class="[ l-ParagraphBlocks__interview-block ]"><span class="[ l-ParagraphBlocks__interview-initials ]">' . $block['initials'] . '</span> ' . $block['text_area'] . '</p>';

										}
									} ?>
								</div>
							</div>
						</div><?php

					// Case: Large Text Block.
					elseif( get_row_layout() == 'large_text_block' ):
						$large_text = get_sub_field('text_area');
						echo '<div class="[ l-LargeStatement ]">';
							echo '<div class="[ l-LargeStatement__inner ]">';
								echo '<p class="[ l-LargeStatement__text ]">' . $large_text . '</p>';
							echo '</div>';
						echo '</div>';

					// Case: Large Quote Block.
					elseif( get_row_layout() == 'large_quote_block' ):
						$quote = get_sub_field('file');
						echo '<div class="[ l-LargeQuote ]">';
							echo '<div class="[ l-LargeQuote__inner ]">';
								echo '<p class="[ l-LargeQuote__text ]">' . $quote . '</p>';
							echo '</div>';
						echo '</div>';

					// Case: Full Width Image Block.
					elseif( get_row_layout() == 'full_width_image_block' ):
						$image = get_sub_field('image')[0];
						FeaturedImage::add_acf($image)->render();

					// Case: Double Image Block.
					elseif( get_row_layout() == 'double_image_block' ):
						$images = get_sub_field('images')[0];
						TwoUpImages::add_acf($images)->render();

						// Case: Discovery Layout Block.
					elseif( get_row_layout() == 'discovery_block' ):
						$discovery_layout = get_sub_field('discovery_layout');
						$discovery_items = get_sub_field('discoveries');
						$discovery_class = ($discovery_layout === 'list') ? 'l-Discoveries--list' : 'l-Discoveries--grid';
						$i = 1;

						echo '<div class="[ l-Discoveries ' . $discovery_class . ' ]">';
							echo '<div class="[ l-Discoveries__inner ]">';
								if(!empty($discovery_items)) {
									echo '<ul class="[ l-Discoveries__items ]">';
										foreach($discovery_items as $discover) {
											echo '<li class="[ l-Discoveries__item ]">';
												echo '<div class="[ l-Discoveries__item-top ]">';
													echo '<p class="[ l-Discoveries__item-name ]"><span>' . $i  . '</span>' . $discover['title'] . '</p>';
													echo LazyImage::get_image($discover['image'], [20, 30, 50],'l-Discoveries__item-image');
												echo '</div>';
												echo '<div class="[ l-Discoveries__item-bottom ]">';
													echo '<p class="[ l-Discoveries__item-name ]">' . $discover['content'] . '</p>';
													echo '<p>Shop Now <a href="' . $discover['link']. '">' . $discover['link_text'] . '</a></p>';
												echo '</div>';
											echo '</li>';
											$i++;
										}
									echo '</ul>';
								}
							echo '</div>';
						echo '</div>';

					endif;
			// End loop.
			endwhile;
		endif; ?>


	</article>

<?php get_footer(); ?>