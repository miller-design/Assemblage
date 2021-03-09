<?php

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Autoloader.
 *
 * @class       Six\Autoloader
 * @version     1.0.0
 */

class Autoloader {

	/**
	 * Path to the includes directory.
	 *
	 * @var string
	 */
	private $include_path = '';

	/**
	 * The Constructor.
	 */
	public function __construct() {

		if (function_exists("__autoload")) {
			spl_autoload_register("__autoload");
		}

		spl_autoload_register(array($this, 'autoload'));

		$this->inc_classes_path = untrailingslashit(get_template_directory()) . '/inc/classes/';

		$this->inc_components_path = untrailingslashit(get_template_directory()) . '/inc/components/';

	}

	/**
	 * Take a class name and turn it into a file name.
	 *
	 * @param  string $class
	 * @return string
	 */
	private function get_file_name_from_class($class, $type) {

		switch ($type) {
			case 'class':
				$prefix = 'class-';
				break;

			case 'component':
				$prefix = 'c-';
				break;

			default:
				$prefix = null;
				break;
		}

		return $prefix . str_replace(array('_', 'six-'), array('-', ''), $class) . '.php';
	}

	/**
	 * Include a class file.
	 *
	 * @param  string $path
	 * @return bool successful or not
	 */
	private function load_file($path) {

		if ($path && is_readable($path)) {
			include_once $path;
			return true;
		}

		return false;
	}

	/**
	 * Auto-load classes on demand to reduce memory consumption.
	 *
	 * @param string $class
	 */
	public function autoload($class) {

		//$class = strtolower( $class );

		// build a filename based on the class being a 'class' type class
		$classFilename = $this->get_file_name_from_class($class, 'class');

		// build a filename based on the class being a 'component' type class
		$componentFilename = $this->get_file_name_from_class($class, 'component');

		// try loading the file, assuming it's in the 'class' folder
		$this->load_file($this->inc_classes_path . $classFilename);

		// try loading the file, assuming it's in the 'components' folder
		$this->load_file($this->inc_components_path . $componentFilename);

	}
}

new Autoloader();
