<?php get_header();

	if(get_field('journal_header')) {

		$caption = '';
		if(get_field('read_time', get_the_id())) {
			$caption = get_field('read_time', get_the_id());
		} else {
			$caption = Journal::estimated_reading_time(get_the_id(), true);
		}

		$options = [
			"header_text" 		=> get_the_title(get_the_id()),
			"excerpt" 				=> get_field('article_excerpt', get_the_id()),
			"issue_number"		=> Journal::get_post_term(get_the_id(), 'issues')[0],
			"term"						=> Journal::get_post_term(get_the_id(), 'topic')[0],
			"read_time"				=> $caption,
			"header_type"			=> get_field('journal_header', get_the_id()),
			"type_style"			=> get_field('typography_style', get_the_id())
		];

		if(get_field('journal_header') === 'half-screen-v1' || get_field('journal_header') === 'half-screen-v2') {
			$options["additional_text"] = get_field('header_blocks');
			$options["image"] = get_field('featured_image_square', get_the_id());
			$options["flip_layout"] = get_field('flip_layout_direction');
			$options["classes"] = (get_field('have_white_background') === true) ? ' c-ArticleSplitHeader--white-bg ' : '';
			ArticleSplitHeader::add_options($options)->render();
		} else if(get_field('journal_header') === 'full-screen' || get_field('journal_header') === 'video') {
			$options["background_colour"] = get_field('background_colour')[0]['colours'];
			$options["image"] = get_field('featured_image', get_the_id());
			$options["video_src"] = get_field('video_src', get_the_id());
			$options['text_alignment'] = get_field('text_align', get_the_id());
			ArticleHeader::add_options($options)->render();
		} else if(get_field('journal_header') === 'interview') {
			$options["image"] = get_field('featured_image_portrait', get_the_id());
			$options["header_style"] = get_field('spotlight_style', get_the_id());
			$options["first_name"] = get_field('first_name', get_the_id());
			$options["last_name"] = get_field('last_name', get_the_id());

			if(get_field('have_black_background') === true && get_field('spotlight_style', get_the_id()) === 'name-only') {
				$options["background_colour"] = [
					"label" => 'Black',
					"value" => "#1d1d1b",
				];
			} else if(get_field('have_black_background', get_the_id()) === false && get_field('spotlight_style', get_the_id()) === 'name-only') {

			} else {
				$options["background_colour"] = get_field('background_colour')[0]['colours'];

			}
			InterviewHeader::add_options($options)->render();

		} else if(get_field('journal_header') === 'audio') {
			$options["image"] = get_field('featured_image_portrait', get_the_id());
			$options["background_colour"] = get_field('background_colour')[0]['colours'];
			$options["audio"] = get_field('audio_src', get_the_id());
			$options["external_links"] = get_field('audio_provider_links', get_the_id());

			AudioHeader::add_options($options)->render();
		}

	} ?>

	<article class="[ l-JournalSingle ]"><?php

		// Check value exists.
		if( have_rows('modules', get_the_id())):

			// checking for the last block so we can out put the share list and term values
			// needs to be done inside the row, so check for if row index is equal to total count
			$end_block = end(get_field('modules', get_the_id()));
			$block_total_count = count(get_field('modules', get_the_id()));
			$end_block_name = $end_block['acf_fc_layout'];
			$end_block_alignment = $end_block['block_alignment'];
			if(empty($end_block_alignment)) {
				$end_block_alignment = 'full';
			}

			// Loop through rows.
			while ( have_rows('modules', get_the_id()) ) : the_row();
					// Case: Paragraph Block.
					if( get_row_layout() == 'paragraph_blocks' ):

						// d($end_block_name === 'paragraph_blocks', 0);
						$side_bar_options = get_sub_field('side_bar_options');
						$block_alignment = (get_sub_field('block_alignment') === 'right') ? 'l-ParagraphBlocks--right' : 'l-ParagraphBlocks--left';
						$credit_list = get_field('credit_list');
						$caption_download = get_sub_field('captions_and_downloads');
						$quote_text = get_sub_field('quote_text');
						$image = LazyImage::get_image(get_sub_field('image'), 'l-ParagraphBlocks__sidebar-image');
						$blocks = get_sub_field('blocks');
						$sidebar_class = (empty($side_bar_options)) ? 'no-content' : '';
						$block_alignment .= (!empty(get_field('header_blocks'))) ? ' l-ParagraphBlocks--indent-first' : ''; ?>

						<div class="[ l-ParagraphBlocks <?= $block_alignment; ?> ]">
							<div class="[ l-ParagraphBlocks__inner ]">
								<div class="[ l-ParagraphBlocks__col-left <?= $sidebar_class; ?> ]"><?php
									if($side_bar_options === 'v1') {
										// article details
										$caption = '';
										if(get_field('read_time', get_the_id())) {
											$caption = get_field('read_time', get_the_id());
										} else {
											$caption = Journal::estimated_reading_time(get_the_id(), true);
										}
										$issue_number = Journal::get_post_term(get_the_id(), 'issues')[0];
										$read_time = $caption;

										echo '<div class="[ l-ParagraphBlocks__article-details ]">';
											echo '<div class="[ l-ParagraphBlocks__article-details-wrap ]">';
												echo '<p class="[ l-ParagraphBlocks__details-text ]">Issue ' . $issue_number['name'] . '&nbsp;&nbsp;<span class="dot"></span>&nbsp;&nbsp;' . $read_time . '</p>';
												echo '<ul>';
													foreach($credit_list as $credit) {
														echo '<li class="[ l-ParagraphBlocks__credit-list ]">';
															Credit::add_acf($credit['credit'][0])->render();
														echo '</li>';
													}
												echo '</ul>';
											echo '</div>';
											Journal::share_buttons(get_the_id());
										echo '</div>';

									} else if($side_bar_options === 'v2') {
										// caption and download
										echo '<div class="[ l-ParagraphBlocks__downloads-wrap ]">';
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
										echo '<p class="[ l-ParagraphBlocks__sidebar-quote ]"><q>' . $quote_text . '</q></p>';
									} ?>
								</div>
								<div class="[ l-ParagraphBlocks__col-right ]"><?php
									foreach($blocks as $block) {

										if($block['acf_fc_layout'] === 'paragraph') {

											$sign_off = '';

											if($block['add_sign_off_block']) {
												$sign_off = '<p class="[ no-indent ]">' . $block['sign_off_block'] . '</p>';
											}

											echo '<div class="[ l-ParagraphBlocks__text-block ]">' . $block['text_area'] . $sign_off . '</div>';

										} else if($block['acf_fc_layout'] === 'large_text') {

											$quote_open = ($block['quote'] === true) ? '<q>' : '';
											$quote_close = ($block['quote'] === true) ? '</q>' : '';
											$classes = ($block['align_text_center'] === true) ? 'l-ParagraphBlocks--text-center ' : '';

											echo '<p class="[ l-ParagraphBlocks__large-text ' . $classes . ']">' . $quote_open . $block['text_area'] . $quote_close .'</p>';

										} else if($block['acf_fc_layout'] === 'interview_paragraph') {

											echo '<div class="[ l-ParagraphBlocks__interview-block ]"><span class="[ l-ParagraphBlocks__interview-initials ]">' . $block['initials'] . '</span> ' . $block['text_area'] . '</div>';

										} else if($block['acf_fc_layout'] === 'image') {

											echo '<div class="[ l-ParagraphBlocks__image-block ]">';
												echo LazyImage::get_image($block['image'], [50, 100], 'l-ParagraphBlocks__image', true, false);
												echo '<p class="[ l-ParagraphBlocks__image-caption ]">' . $block['caption'] . '</p>';
											echo '</div>';

										}
									} ?>
								</div>
							</div>
							<?php if(get_row_index() === $block_total_count) {
								Journal::add_article_end_section(get_the_id(), $end_block_alignment);
							} ?>
						</div><?php

					// Case: Large Text Block.
					elseif( get_row_layout() == 'large_text_block' ):
						$large_text = get_sub_field('text_area');
						echo '<div class="[ l-LargeStatement ]">';
							echo '<div class="[ l-LargeStatement__inner ]">';
								echo '<p class="[ l-LargeStatement__text ]">' . $large_text . '</p>';
							echo '</div>';
						echo '</div>';
						if(get_row_index() === $block_total_count) {
							Journal::add_article_end_section(get_the_id(), $end_block_alignment);
						} ?><?php


					// Case: Large Quote Block.
					elseif( get_row_layout() == 'large_quote_block' ):
						$quote = get_sub_field('text');
						echo '<div class="[ l-LargeQuote ]">';
							echo '<div class="[ l-LargeQuote__inner ]">';
								echo '<p class="[ l-LargeQuote__text ]"><q>' . $quote . '</q></p>';
							echo '</div>';
						echo '</div>';
						if(get_row_index() === $block_total_count) {
							Journal::add_article_end_section(get_the_id(), $end_block_alignment);
						} ?><?php


					// Case: Full Width Image Block.
					elseif( get_row_layout() == 'full_width_image_block' ):
						$image = get_sub_field('image')[0];
						FeaturedImage::add_acf($image)->render();
						if(get_row_index() === $block_total_count) {
							Journal::add_article_end_section(get_the_id(), $end_block_alignment);
						} ?><?php

					// Case: Double Image Block.
					elseif( get_row_layout() == 'double_image_block' ):
						$images = get_sub_field('images')[0];
						TwoUpImages::add_acf($images)->render();
						if(get_row_index() === $block_total_count) {
							Journal::add_article_end_section(get_the_id(), $end_block_alignment);
						} ?><?php

					elseif( get_row_layout() == 'image_slider' ):
						$images = get_sub_field('slider')[0];
						ImageSlider::add_acf($images)->render();
						if(get_row_index() === $block_total_count) {
							Journal::add_article_end_section(get_the_id(), $end_block_alignment);
						} ?><?php

						// Case: Discovery Layout Block.
					elseif( get_row_layout() == 'discovery_block' ):
						$discovery_layout = get_sub_field('discovery_layout');
						$discovery_items = get_sub_field('discoveries');
						$discovery_class = ($discovery_layout === 'list') ? 'l-Discoveries--list' : 'l-Discoveries--grid';
						$dicovery_section = (get_row_index() === 1) ? 'first-on-page' : '';
						$i = 1;
						// if($discovery_layout === 'list')
						echo '<div class="[ l-Discoveries ' . $discovery_class . ' ' . $dicovery_section . ' ]">';
							if(!empty($discovery_items)) {
								echo '<ul class="[ l-Discoveries__items ]">';
									foreach($discovery_items as $discover) {
										echo '<li class="[ l-Discoveries__item ]">';
											echo '<div class="[ l-Discoveries__item-top ]">';
												$leading_digit = ($discovery_layout === 'list' && $i <= 9) ? '0' : '';
												echo '<p class="[ l-Discoveries__item-name ]"><span>'. $leading_digit . $i  . '</span>' . $discover['title'] . '</p>';
												echo '<div class="[ l-Discoveries__item-image-wrap ]">';
													echo LazyImage::get_image($discover['image'], [20, 30, 50],'l-Discoveries__item-image');
												echo '</div>';
											echo '</div>';
											echo '<div class="[ l-Discoveries__item-bottom ]">';
												echo '<div class="[ l-Discoveries__item-text ]">' . $discover['content'] . '</div>';
												echo '<p class="[ l-Discoveries__item-link ]">' . $discover['label'] . ' <a href="' . $discover['link'] . '">' . $discover['link_text'] . '</a></p>';
											echo '</div>';
										echo '</li>';
										$i++;
									}
								echo '</ul>';
							}
						echo '</div>';

						if(get_row_index() === $block_total_count) {
							Journal::add_article_end_section(get_the_id(), $end_block_alignment);
						} ?><?php



					endif;
			// End loop.
			endwhile;
		endif; ?>

		<div class="[ l-JournalSingle__next ]">
			<?php Journal::get_next_story(); ?>
		</div>
	</article>

<?php get_footer(); ?>