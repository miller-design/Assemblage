<?php

add_action('admin_head', 'six_wpadmin_styles');

function six_wpadmin_styles(){

    echo '<style>

        .article-header-icons input,
        .article-images-icons input {
            visibility: hidden;
        }
        .article-header-icons input + img,
        .article-images-icons input + img {
            display: block;
            opacity: 0.2;
            width: 120px;
        }
        .article-header-icons input:checked + img,
        .article-images-icons input:checked + img {
            opacity: 1;
        }

    </style>';
}