<?php

if ( ! defined( 'ABSPATH' ) ) exit;

class SmartPen {

	/**
	 * The single instance of SmartPen.
	 * @var 	object
	 * @access  private
	 * @since 	1.0.0
	 */
	private static $_instance = null;

	/**
	 * Settings class object
	 * @var     object
	 * @access  public
	 * @since   1.0.0
	 */
	public $settings = null;

	/**
	 * The version number.
	 * @var     string
	 * @access  public
	 * @since   1.0.0
	 */
	public $_version;

	/**
	 * The token.
	 * @var     string
	 * @access  public
	 * @since   1.0.0
	 */
	public $_token;

	/**
	 * The main plugin file.
	 * @var     string
	 * @access  public
	 * @since   1.0.0
	 */
	public $file;

	/**
	 * The main plugin directory.
	 * @var     string
	 * @access  public
	 * @since   1.0.0
	 */
	public $dir;

	/**
	 * The plugin assets directory.
	 * @var     string
	 * @access  public
	 * @since   1.0.0
	 */
	public $assets_dir;

	/**
	 * The plugin assets URL.
	 * @var     string
	 * @access  public
	 * @since   1.0.0
	 */
	public $assets_url;

	/**
	 * Suffix for Javascripts.
	 * @var     string
	 * @access  public
	 * @since   1.0.0
	 */
	public $script_suffix;

	public $medium_editor_url;

	/**
	 * Constructor function.
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */
	public function __construct ( $file = '', $version = '1.0.0' ) {
		$this->_version = $version;
		$this->_token = 'smartpen';

		// Load plugin environment variables
		$this->file = $file;
		$this->dir = dirname( $this->file );
		$this->assets_dir = trailingslashit( $this->dir ) . 'assets';
		$this->assets_url = esc_url( trailingslashit( plugins_url( '/assets/', $this->file ) ) );
		$this->medium_editor_url = esc_url( trailingslashit( plugins_url( '/medium-editor/', $this->file ) ) );

		$this->script_suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		register_activation_hook( $this->file, array( $this, 'install' ) );

		// Load frontend JS & CSS
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ), 10 );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 10 );

		// Load admin JS & CSS
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_scripts' ), 10, 1 );
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_styles' ), 10, 1 );

		// Load API for generic admin functions
		if ( is_admin() ) {
			$this->admin = new SmartPen_Admin_API();
		}

		// Handle localisation
		$this->load_plugin_textdomain();
		add_action( 'init', array( $this, 'load_localisation' ), 0 );
	} // End __construct ()

	/**
	 * Wrapper function to register a new post type
	 * @param  string $post_type   Post type name
	 * @param  string $plural      Post type item plural name
	 * @param  string $single      Post type item single name
	 * @param  string $description Description of post type
	 * @return object              Post type class object
	 */
	public function register_post_type ( $post_type = '', $plural = '', $single = '', $description = '', $options = array() ) {

		if ( ! $post_type || ! $plural || ! $single ) return;

		$post_type = new SmartPen_Post_Type( $post_type, $plural, $single, $description, $options );

		return $post_type;
	}

	/**
	 * Wrapper function to register a new taxonomy
	 * @param  string $taxonomy   Taxonomy name
	 * @param  string $plural     Taxonomy single name
	 * @param  string $single     Taxonomy plural name
	 * @param  array  $post_types Post types to which this taxonomy applies
	 * @return object             Taxonomy class object
	 */
	public function register_taxonomy ( $taxonomy = '', $plural = '', $single = '', $post_types = array(), $taxonomy_args = array() ) {

		if ( ! $taxonomy || ! $plural || ! $single ) return;

		$taxonomy = new SmartPen_Taxonomy( $taxonomy, $plural, $single, $post_types, $taxonomy_args );

		return $taxonomy;
	}

	/**
	 * Load frontend CSS.
	 * @access  public
	 * @since   1.0.0
	 * @return void
	 */
	public function enqueue_styles () {
		wp_register_style( $this->_token . '-frontend', esc_url( $this->assets_url ) . 'css/frontend.css', array(), $this->_version );
		wp_enqueue_style( $this->_token . '-frontend' );

		$this->enqueue_medium_editor_files();

	} // End enqueue_styles ()

	/**
	* Load medium-editor styles
	* @access public
	* @since 1.0.0
	* @return void
	*/
	public function enqueue_medium_editor_files() {
	    if(!$this->can_edit())
	        return;
		// load css
		wp_register_style( $this->_token . '-medium-css', esc_url( $this->medium_editor_url ) . 'dist/css/medium-editor.min.css', array(), $this->_version );
		wp_register_style( $this->_token . '-medium-theme', esc_url( $this->medium_editor_url ) . 'dist/css/themes/default.min.css', array(), $this->_version);
		wp_register_style( $this->_token . '-medium-insert-frontend', esc_url( $this->medium_editor_url ) . 'extensions/insert-plugin/dist/css/medium-editor-insert-plugin-frontend.min.css', array(), $this->_version);
		wp_register_style( $this->_token . '-medium-insert', esc_url( $this->medium_editor_url ) . 'extensions/insert-plugin/dist/css/medium-editor-insert-plugin.min.css', array(), $this->_version);
		wp_register_style( $this->_token . '-medium-custom', esc_url( $this->medium_editor_url ) . 'main.css', array(), $this->_version);
        
		wp_enqueue_style( $this->_token . '-medium-css' );
		wp_enqueue_style( $this->_token . '-medium-theme' );
		wp_enqueue_style( $this->_token . '-medium-insert-frontend' );
		wp_enqueue_style( $this->_token . '-medium-insert' );
		wp_enqueue_style( $this->_token . '-medium-custom' );



		// load scripts
		wp_register_script( $this->_token . '-medium-js', esc_url( $this->medium_editor_url ) . 'dist/js/medium-editor.min.js', array(), $this->_version );
        wp_register_script( $this->_token . '-medium-insert-plugin-handlebars', esc_url( $this->medium_editor_url ) . 'extensions/insert-plugin/bower_components/handlebars/handlebars.runtime.min.js', array(), $this->_version );
        wp_register_script( $this->_token . '-medium-insert-plugin-sortable', esc_url( $this->medium_editor_url ) . 'extensions/insert-plugin/bower_components/jquery-sortable/source/js/jquery-sortable-min.js', array(), $this->_version );
        wp_register_script( $this->_token . '-medium-insert-plugin-query', esc_url( $this->medium_editor_url ) . 'extensions/insert-plugin/bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget.js', array(), $this->_version );
        wp_register_script( $this->_token . '-medium-insert-plugin-iframe', esc_url( $this->medium_editor_url ) . 'extensions/insert-plugin/bower_components/blueimp-file-upload/js/jquery.iframe-transport.js', array(), $this->_version );
        wp_register_script( $this->_token . '-medium-insert-plugin-fileupload', esc_url( $this->medium_editor_url ) . 'extensions/insert-plugin/bower_components/blueimp-file-upload/js/jquery.fileupload.js', array(), $this->_version );
        wp_register_script( $this->_token . '-medium-insert-plugin', esc_url( $this->medium_editor_url ) . 'extensions/insert-plugin/dist/js/medium-editor-insert-plugin.min.js', array(), $this->_version );
        wp_register_script( $this->_token . '-medium-autolist-plugin', esc_url( $this->medium_editor_url ) . 'extensions/autolist/dist/autolist.min.js', array(), $this->_version );
        wp_register_script( $this->_token . '-medium-custom-js', esc_url( $this->medium_editor_url ) . 'main.js', array(), $this->_version );

        $translation_array = array(
                'nonce' => wp_create_nonce( 'wp_rest' )
        );
        wp_localize_script( $this->_token . '-medium-custom-js', 'smartpen_object', $translation_array );


		wp_enqueue_script( $this->_token . '-medium-js' );
		wp_enqueue_script( $this->_token . '-medium-insert-plugin-handlebars' );
		wp_enqueue_script( $this->_token . '-medium-insert-plugin-sortable' );
		wp_enqueue_script( $this->_token . '-medium-insert-plugin-query' );
		wp_enqueue_script( $this->_token . '-medium-insert-plugin-iframe' );
		wp_enqueue_script( $this->_token . '-medium-insert-plugin-fileupload' );
		wp_enqueue_script( $this->_token . '-medium-insert-plugin' );
		wp_enqueue_script( $this->_token . '-medium-autolist-plugin' );
        wp_enqueue_script( $this->_token . '-medium-custom-js' );
	}

	/**
	* Determines if the current user can edit the current post
	* @access public
	* @since 1.0.0
	* @return boolean
	*/
	public function can_edit() {
	    // non logged-in users cannot edit and only the posts can be edited
	    if( !is_user_logged_in() || !is_single() )
	        return false;

        $post = get_post();
        $user = wp_get_current_user();

        // any author can edit their post
	    if( $user->ID == $post->post_author)
	        return true;

	    // an editor or admin can edit any post
	    $allowed_roles = array('editor', 'administrator');
        if( array_intersect($allowed_roles, $user->roles) )
            return true;

        return false;
	}

	/**
	 * Load frontend Javascript.
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */
	public function enqueue_scripts () {
		wp_register_script( $this->_token . '-frontend', esc_url( $this->assets_url ) . 'js/frontend' . $this->script_suffix . '.js', array( 'jquery' ), $this->_version );
		wp_enqueue_script( $this->_token . '-frontend' );
	} // End enqueue_scripts ()

	/**
	 * Load admin CSS.
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */
	public function admin_enqueue_styles ( $hook = '' ) {
		wp_register_style( $this->_token . '-admin', esc_url( $this->assets_url ) . 'css/admin.css', array(), $this->_version );
		wp_enqueue_style( $this->_token . '-admin' );
	} // End admin_enqueue_styles ()

	/**
	 * Load admin Javascript.
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */
	public function admin_enqueue_scripts ( $hook = '' ) {
		wp_register_script( $this->_token . '-admin', esc_url( $this->assets_url ) . 'js/admin' . $this->script_suffix . '.js', array( 'jquery' ), $this->_version );
		wp_enqueue_script( $this->_token . '-admin' );
	} // End admin_enqueue_scripts ()

	/**
	 * Load plugin localisation
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */
	public function load_localisation () {
		load_plugin_textdomain( 'smartpen', false, dirname( plugin_basename( $this->file ) ) . '/lang/' );
	} // End load_localisation ()

	/**
	 * Load plugin textdomain
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */
	public function load_plugin_textdomain () {
	    $domain = 'smartpen';

	    $locale = apply_filters( 'plugin_locale', get_locale(), $domain );

	    load_textdomain( $domain, WP_LANG_DIR . '/' . $domain . '/' . $domain . '-' . $locale . '.mo' );
	    load_plugin_textdomain( $domain, false, dirname( plugin_basename( $this->file ) ) . '/lang/' );
	} // End load_plugin_textdomain ()

	/**
	 * Main SmartPen Instance
	 *
	 * Ensures only one instance of SmartPen is loaded or can be loaded.
	 *
	 * @since 1.0.0
	 * @static
	 * @see SmartPen()
	 * @return Main SmartPen instance
	 */
	public static function instance ( $file = '', $version = '1.0.0' ) {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self( $file, $version );
		}
		return self::$_instance;
	} // End instance ()

	/**
	 * Cloning is forbidden.
	 *
	 * @since 1.0.0
	 */
	public function __clone () {
		_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?' ), $this->_version );
	} // End __clone ()

	/**
	 * Unserializing instances of this class is forbidden.
	 *
	 * @since 1.0.0
	 */
	public function __wakeup () {
		_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?' ), $this->_version );
	} // End __wakeup ()

	/**
	 * Installation. Runs on activation.
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */
	public function install () {
		$this->_log_version_number();
	} // End install ()

	/**
	 * Log the plugin version number.
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */
	private function _log_version_number () {
		update_option( $this->_token . '_version', $this->_version );
	} // End _log_version_number ()

}
