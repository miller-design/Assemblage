<?php

function acf_add_wysiwyg_toolbar($toolbars) {

  $toolbars['Custom'] = array();
  $toolbars['Custom'][1] = array('bold', 'italic', 'underline', 'strikethrough', 'link', 'unlink', 'subscript', 'superscript', 'undo', 'redo', 'removeformat');

  return $toolbars;
}

add_filter('acf/fields/wysiwyg/toolbars', 'acf_add_wysiwyg_toolbar');
