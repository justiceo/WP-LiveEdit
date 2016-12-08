<?php
/*
 * Plugin Name: SmartPen
 * Version: 1.0
 * Plugin URI: http://www.wp-smartpen.com/
 * Description: An easy to use front-end editor for WordPress
 * Author: Justice Ogbonna
 * Author URI: http://www.justiceo.com/
 * Requires at least: 4.0
 * Tested up to: 4.0
 *
 * Text Domain: smartpen
 * Domain Path: /lang/
 *
 * @package WordPress
 * @author Justice Ogbonna
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// Load plugin class files
require_once( 'includes/class-smartpen.php' );
require_once( 'includes/class-smartpen-settings.php' );

// Load plugin libraries
require_once( 'includes/lib/class-smartpen-admin-api.php' );
require_once( 'includes/lib/class-smartpen-post-type.php' );
require_once( 'includes/lib/class-smartpen-taxonomy.php' );

/**
 * Returns the main instance of SmartPen to prevent the need to use globals.
 *
 * @since  1.0.0
 * @return object SmartPen
 */
function SmartPen () {
	$instance = SmartPen::instance( __FILE__, '1.0.0' );

	if ( is_null( $instance->settings ) ) {
		$instance->settings = SmartPen_Settings::instance( $instance );
	}

	return $instance;
}

SmartPen();