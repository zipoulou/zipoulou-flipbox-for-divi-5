<?php
/**
 * Plugin Name:       Zipoulou FlipBox for Divi 5
 * Plugin URI:        https://github.com/zipoulou/zipoulou-flipbox-for-divi-5
 * Description:       Module FlipBox exclusivement conçu pour Divi 5.
 * Version:           0.7.3
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Nicolas Galzy
 * Author URI:        https://nicolasgalzy.fr
 * Text Domain:       tangible-modules-divi5
 * Domain Path:       /languages
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package TangibleModules
 */

declare(strict_types=1);

defined('ABSPATH') || exit;

define('TMD5_VERSION', '0.7.3');
define('TMD5_FILE', __FILE__);
define('TMD5_PATH', plugin_dir_path(__FILE__));
define('TMD5_URL', plugin_dir_url(__FILE__));
define('TMD5_JSON_PATH', TMD5_PATH . 'modules-json/');

/**
 * PSR-4 autoloader (évite la dépendance à composer install côté user).
 */
spl_autoload_register(static function (string $class): void {
    $prefix = 'TangibleModules\\Modules\\';
    if (strncmp($class, $prefix, strlen($prefix)) !== 0) {
        return;
    }
    $relative = substr($class, strlen($prefix));
    $file     = TMD5_PATH . 'modules/' . str_replace('\\', '/', $relative) . '.php';
    if (is_readable($file)) {
        require_once $file;
    }
});

require_once TMD5_PATH . 'modules/Modules.php';

/**
 * Enqueue VB bundle (JS + CSS) when Divi 5 VB is active.
 */
add_action('divi_visual_builder_assets_before_enqueue_scripts', static function (): void {
    if (!function_exists('et_builder_d5_enabled') || !et_builder_d5_enabled()) {
        return;
    }
    if (!function_exists('et_core_is_fb_enabled') || !et_core_is_fb_enabled()) {
        return;
    }

    \ET\Builder\VisualBuilder\Assets\PackageBuildManager::register_package_build([
        'name'    => 'tangible-modules-divi5-vb-script',
        'version' => TMD5_VERSION,
        'script'  => [
            'src'                => TMD5_URL . 'scripts/bundle.js',
            'deps'               => ['divi-module-library', 'divi-vendor-wp-hooks'],
            'enqueue_top_window' => false,
            'enqueue_app_window' => true,
        ],
    ]);

    \ET\Builder\VisualBuilder\Assets\PackageBuildManager::register_package_build([
        'name'    => 'tangible-modules-divi5-vb-style',
        'version' => TMD5_VERSION,
        'style'   => [
            'src'                => TMD5_URL . 'styles/vb-bundle.css',
            'deps'               => [],
            'enqueue_top_window' => false,
            'enqueue_app_window' => true,
        ],
    ]);
});

/**
 * Enqueue frontend stylesheet + runtime JS on every page.
 * Skipped when Divi Visual Builder is active.
 */
add_action('wp_enqueue_scripts', static function (): void {
    if (function_exists('et_core_is_fb_enabled') && et_core_is_fb_enabled()) {
        return;
    }

    $css_path = TMD5_PATH . 'styles/bundle.css';
    if (file_exists($css_path)) {
        wp_enqueue_style(
            'tangible-modules-divi5-frontend',
            TMD5_URL . 'styles/bundle.css',
            [],
            TMD5_VERSION
        );
    }

    $js_path = TMD5_PATH . 'scripts/frontend.js';
    if (file_exists($js_path)) {
        wp_enqueue_script(
            'tangible-modules-divi5-frontend',
            TMD5_URL . 'scripts/frontend.js',
            [],
            TMD5_VERSION,
            true
        );
    }
});
