# Theme Readme Doc

## Table of Contents

* [Known Issues/To-Do](#known-issues-to-do)
* [Quick Start](#quick-start)
* [Autoloader](#autoloader)
* [Dependencies](#dependencies)
* [Release History/Changelog](#release-history/changelog)
* [Working with Javascript](#working-with-javascript)
* [Working with PHP](#working-with-php)
* [SCSS Conventions](#scss-conventions)
* [UI Components 101](#ui-components-101)
* [A quick BEM 101 for noobs](#a-quick-bem-101-for-noobs)
* [Debugging](#debugging)

## Known Issues/To-Do

No issues spotted so far


## Quick Start

Setup using Webpack and NPM.

* Run `npm install` or `npm i` to set up webpack and project dependancies
* Open up `webpack.config.js` and change `proxy: 'https://base.local'` to the domain you installed Wordpress on. (Around line 84)
* Run `npm run dev` to watch for JS and SCSS changes.

The `npm run dev` command runs Sass watch, BrowserSync, Babel with ES6 bundling . It does not run JS concatenation, this is completed on `npm run build` task.


### Deployment

?

----


## Dependencies

* [GIA](https://github.com/giantcz/gia) - Minimalistic JavaScript framework used in base theme
* [Lazysizes](https://github.com/aFarkas/lazysizes) - Lazyloading for responsive images
* [Include Media](https://github.com/eduardoboucas/include-media) - media breakpoint plugin used for Scss and js breakpoints


## Release History/Changelog

* 1.0.0 Base Theme Has Been Created 



## Autoloader

All php files added to the `inc/classes` and `inc/components` folders will be autoloaded providing you each file is formatted correctly.

### For the classes folder

1. Match the file name with the class name and add the `class-` prefix.
2. Use TitleCase for class names.
3. Don't use _ underscores _ in class names, they get converted to dashes by the autoloader when it searches for the file and will likely break.

Eg. Class name = `ExampleClass` File name = `class-ExampleClass.php`

### For the components folder

Use components to modularise your code and make it portable and reusable. `c-SampleComponent.php` makes for a simple starting point.

1. Match the file name with the component name and add the `c-` prefix.
2. Use TitleCase for component names.
3. Don't use _ underscores _ in component names, they get converted to dashes by the autoloader when it searches for the file and will likely break.

Eg. Component name = `SampleComponent` File name = `c-SampleComponent.php`

[More info on components here](#ui-components-101).


### For the `inc/config` folder

This folder is for configuring Wordpress.

Any PHP files you place in here will be auto included on every page.

Think of this folder as cleaner way of dumping random PHP into your `functions.php`

Every Actions or Filter Hook should be dropped in the config folder as separate file for clarity.

* To enque scripts/styles edit `inc/scripts-styles.php`


----


## Working with Javascript

Custom Javascript files should be placed within the `src/js/` folder.

Javascript should be written using ES6 Modules pattern. See `c-MyExample.js` for a simple example of how this works.

Babel is used for web browsers that don't support ES6.

Include/call your module from `src/index.js`.

Please don't add your code directly to `index.js`. Your project will become workable and other devs will hate you.


#### Adding plugins to your project

Install plugins with NPM and add the plugin to the relevent js file.

For example after installing video js you can import the plugin in to your c-video.js file like so `import videojs from 'video.js'`. Then when `npm run build` is used this will ensure all the relevent files get compiled in to `frontend-bundle.js` file

----


## Working with PHP

All your custom PHP should live in `inc/classes` and `inc/components`.

Your templates should be left as clean as possible. Simply used for calling PHP in `components` and `classes`.

You should create classes in `inc/classes` when you need to write advanced PHP that extends Wordpress. Or if you need to heaviliy customise a plugin using hooks (such as WooCommerce).

`inc/components` is for more front-end related PHP, but can still contain a fair amount of logic when required. The rules for writing compoents is more strict but easy and intuitive when you get the hang of it...


## SCSS Conventions

We have agreed to write our SCSS using the ceonventions in this article:
http://bradfrost.com/blog/post/css-architecture-for-design-systems/


## UI Components 101

Where possible we write code using reusable components to control layout and content.

Over time websites get out of control and become difficult to maintain which makes development a slow and miserable experience.

Stick to the component logic and your site will get better over time, not worse.

Working with components is easy but requires a basic understanding of how they are set up and managed.

### The basic setup
 A typical component has the following files:


    ├── assets
    │   ├── css
    │   │   └── scss
    │   │       └── components
    │   │           └── _c-SampleComponent.scss
    │   └── js
    │      └── src
    │          └── c-SampleComponent.js
    └── inc
         └── components
            └── c-SampleComponent.php



 `c-SampleComponent.php` is the main component file that contains the logic and HTML.

 `src/scss/components/_c-SampleComponent.scss` is the SCSS for the component.

 `src/js/c-SampleComponent.js` is the Javascript for the component.

 Both the SCSS and the JS should be scoped to the component so it doesn't affect the rest of the site in any way.

 For CSS:

 ```
.c-SampleComponent{
  background: red;
}
 ```

 For JS you will be using the gia framwork so you would need to define `g-component="SampleComponent"`

 Simple components may not require javascript. But you should always have a a PHP file and SCSS partial.

 The key principal is that everything is named the same and has a lowercase 'c-' to denote it's belongs to a component. This groups the code together, even though the files are scattered around the site. The benefits of this modularity are obvious:

* Code is easy to find and extend.
* You can remove all trace of redundant code when the project moves on.
* Components can be painlessly shared between projects with minimal modification.


### Calling a component

 Within a template file you simply call your component like so...

```
$options = array(
  "title" => 'lol'
);
SampleComponent::add_options($options)->render();
```

Call a component without custom options, just using defaults...

```
SampleComponent::add_options()->render();
```

### c-Component.php

Components are created with default options that will be used if you don't supply your own values with `add_options()`.

When you create your component add the required default content and modifier flags to alter the component.

It's important to comment on each option to help other developers understand how the component can be modified.

```
$defaultOptions = array(
  "title"     => 'default title' // this appears in the tab
  "haslink"   => true // by default it will link to post
  "classes"   => "" // see SCSS file for modifier classes
);
```
The `render()` method is where the HTML is displayed. This part should be kept as dumb as possible for readability. Try and split your logic out using other methods.

If you find yourself adding `get_field()` or `the_content()` in the component you're doing it wrong! These should be supplied to the `$options` array. Eg.

```
$options = array(
  'title'             =>  get_the_title(),
  'footerButtonText'  =>  get_field('footer_button_text'),
  'link'              =>  'http://google.com',
  'linksArray'        =>  $myArray,
);
```

The above example shows a component receiving data from:

* Advanced Custom Fields
* Wordpress core function
* Hard coded value
* Custom array

This shows how a component can be used anywhere within your theme regardless of the datasource.


### _c-Component.scss

The rules for writing component SASS are quite simple.

Your `c-Component.php` should always output the component name as a class on the outer element (usually a DIV):

```
<div class="[ c-Component ]">
```
You can now wrap your entire SCSS partial in the component class name. This is the main thing to remember. Don't let your component CSS affect other parts of the site.

```
.c-Component{
  //main component SASS
  background-color: red;
}
```

More complicated components will probably use additional classes to modify the layout. These are assigned to the component array.
Eg.

```
$options = array(
  'title'     =>  'Brian Potter',
  'link'      =>  'https://en.wikipedia.org/wiki/Phoenix_Nights',
  'class'     =>  'c-Component--class-modifier'
);
```

Your `c-Component.php` output should then look something like this:

```
<div class="[ c-Component c-Component--class-modifier ]">
```

If you have any class modifiers write them below your main component code, BEM style (and comment on what they do):

```
.c-Component{
  //main component SASS
  background-color: red;
}

.c-Component--class-modifier{
  //component variation SASS
  background-color: yellow;
}
```

In some cases you may need to apply some page specific variations to your component. Most of the time this should be applied a modifier as mentioned above. However that isn't always suitable. Maybe your homepage layout needs extra margin below your component. It's unlikely you would want to reuse this CSS on another page so a modifier would be overkill and add unnecessary cruft.

In this case a better option would be to use page specificity Eg.

```
body.home .c-Component{
  //home page specific component SASS
  background-color: blue;
}
```

And where would you put this SASS?

**At the end of the component partial. Not in the page partial.**

This keeps the modularity of the component and you'll always be able to see what's going on with your component CSS since it's always in one place.

If a component is removed from the project it becomes easy to remove all traces of it's SCSS.

> In a perfect world, if everything is built with components you won't have any page specific SASS partials.

### c-Component.js

If your component needs javascript, refer to `c-Example.js` file to see how to use gia in your project.


### Using components with ACF

Advanced Custom Fields and Components go together like pancakes and syrup. You will find that your template files become littered with the same component calls. Eg.

```
$options = array(
  'title'  =>  get_field('article_title'),
  'image'  =>  get_field('article_image'),
);
CallToAction::add_options($options)->render();
```

In the above example the ACF fields are applied to several templates across the site. So each template file has the same repeated component call. This is messy and not DRY.

A lot of search and replacing will be need if a ACF field name changes or new ones are added?

A nice enhancement is to use the `add_acf` method. Eg.

```
SampleComponent::add_acf($page-id)->render();
```

This would replace the previous call on your templates and just pass the page ID to the component. Inside the component's `add_acf` method you would map your ACF fields. Eg.

```
public static function add_acf($acfItem) {

  $acfOptions = array(
    "title" => get_field('title', $page-id),
    "image" => get_field('image', $page-id)
  );

  return new self($acfOptions);
}
```

This works particularly well when used with the [ACF - Component Field](https://acf-component-field.gummi.io/).


## A quick BEM 101 for noobs

BEM stands for “Block Element Modifier”. We try and use it throughout our projects, although old habits die hard!

In it's simplest form. It goes a little something like this...

* _Block_ is the primary component block, such as `.card` or `.btn`
* _Element_ is a child of the primary block, such as `.card__title`
* _Modifier_ is a variation of a component style, such as `.alert--error`


## Debugging

Add the following to `wp_config.php` to generate a log file of Wordpress/PHP errors.

```
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
```

The log is saved here `wp-content/debug.log`.

### Don't use var_dump!

Use `d($post)` instead.

It's quicker and prettier.
