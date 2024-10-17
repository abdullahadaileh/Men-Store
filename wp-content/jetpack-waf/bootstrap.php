<?php
define( 'DISABLE_JETPACK_WAF', false );
if ( defined( 'DISABLE_JETPACK_WAF' ) && DISABLE_JETPACK_WAF ) return;
define( 'JETPACK_WAF_MODE', 'silent' );
define( 'JETPACK_WAF_SHARE_DATA', false );
define( 'JETPACK_WAF_SHARE_DEBUG_DATA', false );
define( 'JETPACK_WAF_DIR', 'D:\\xampp2\\htdocs\\wordPress\\ecommerce/wp-content/jetpack-waf' );
define( 'JETPACK_WAF_WPCONFIG', 'D:\\xampp2\\htdocs\\wordPress\\ecommerce/wp-content/../wp-config.php' );
require_once 'D:\\xampp2\\htdocs\\wordPress\\ecommerce\\wp-content\\plugins\\jetpack/vendor/autoload.php';
Automattic\Jetpack\Waf\Waf_Runner::initialize();
