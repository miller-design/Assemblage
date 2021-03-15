<div class="l-ShareButtons">
    <ul class="l-ShareButtons__list">
        <li><a class="share-pinterest" href="https://pinterest.com/pin/create/button/?url=<?php echo $url; ?>&description=<?php echo $title; ?>&media=<?php echo $media; ?>" target="_blank" rel="noopener"><svg role="img"><use xlink:href="<?=get_template_directory_uri(); ?>/dist/sprite.svg#pinterest"></use></svg></a></li>
        <li><a class="share-twitter" href="https://twitter.com/intent/tweet?text=<?php echo $title; ?>&amp;url=<?php echo $url; ?>&amp;via=Assemblage" target="_blank" rel="noopener"><svg role="img"><use xlink:href="<?=get_template_directory_uri(); ?>/dist/sprite.svg#twitter"></use></svg></a></li>
        <li><a class="share-facebook" href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $url; ?>" target="_blank" rel="noopener"><svg role="img"><use xlink:href="<?=get_template_directory_uri(); ?>/dist/sprite.svg#facebook"></use></svg></a></li>
    </ul>
</div>
