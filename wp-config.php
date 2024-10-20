<?php
/** Enable W3 Total Cache */
define('WP_CACHE', true); // Added by W3 Total Cache

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'ecommerce' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '<_w8R8CasThe[k<P(S,S)BGK_>(|7+*KX),@$^8HN#+Ynea!T.dqjZ6K%GEKnex?' );
define( 'SECURE_AUTH_KEY',  '&P~%l-/oB:lEX802[.Bo1L~SDPUm_A|~u5,2E6taE<j>7NS ~k3(1Bj,WF`wEmW-' );
define( 'LOGGED_IN_KEY',    'No;}C#.p+a)I2j4iE{.Cb6y`66qV/5[qtr;RVh5A1=KCUQZ/UU=6%8l,vbyyIr8x' );
define( 'NONCE_KEY',        'E-CxwzK{#,O{UJz}W`+Z&!<*8Pk]`*Y1}c5*1y=Te$ce=;r[*HeUFK@)g u/H:iH' );
define( 'AUTH_SALT',        'z^_IP4:8Ib7gLm~*h4<:u#v6i|[f]?]4r+1%|D1V!Q,v5rp5_t,W50/X|G5xM7{O' );
define( 'SECURE_AUTH_SALT', '*chO?z2a%:!JL)KCh3@L|#m7uM9&PW5^SLq:}}TNJ01)TAeM&&A.=WYcn)DS}Nv)' );
define( 'LOGGED_IN_SALT',   '$0.Vy!r8>vfwv:lY,%8MC6pC~VD]Am ~I$`k_{f[EzK#HXKY0j4%;yv-#8q;_tR&' );
define( 'NONCE_SALT',       'p)42EtWy*p91>Y*8PixrVMOQ~Ke!?WrUy)/q(r^;w[==QTO3UhE,*gL ZX6=RRod' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
