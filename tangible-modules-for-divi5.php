<?php
/**
 * Plugin Name:       Tangible Modules for Divi 5
 * Plugin URI:        https://nicolasgalzy.fr
 * Description:       Suite de modules avancés exclusivement conçus pour Divi 5.
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Nicolas Galzy
 * Author URI:        https://nicolasgalzy.fr
 * Text Domain:       tangible-modules-divi5
 * Domain Path:       /languages
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package TangibleModules\Divi5
 */

declare(strict_types=1);

defined('ABSPATH') || exit;

define('TMD5_VERSION', '0.1.0');
define('TMD5_PLUGIN_FILE', __FILE__);
define('TMD5_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('TMD5_PLUGIN_URL', plugin_dir_url(__FILE__));
define('TMD5_MIN_DIVI_VERSION', '5.0.0');

require_once TMD5_PLUGIN_DIR . 'includes/Plugin.php';

add_action('plugins_loaded', static function (): void {
    \TangibleModules\Divi5\Plugin::instance()->boot();
}, 20);
