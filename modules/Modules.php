<?php
/**
 * Register all Tangible modules with the Divi 5 dependency tree.
 *
 * @package TangibleModules
 */

declare(strict_types=1);

namespace TangibleModules\Modules;

defined('ABSPATH') || exit;

use TangibleModules\Modules\Flipbox\Flipbox;

add_action(
    'divi_module_library_modules_dependency_tree',
    static function ($dependency_tree): void {
        $dependency_tree->add_dependency(new Flipbox());
    }
);
