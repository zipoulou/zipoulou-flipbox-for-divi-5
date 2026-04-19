<?php
/**
 * @package TangibleModules\Divi5
 */

declare(strict_types=1);

namespace TangibleModules\Divi5\Modules;

defined('ABSPATH') || exit;

final class ModuleRegistry
{
    /**
     * Liste des modules fournis par la suite.
     * Chaque entrée = [slug, FQCN de la classe de module, chemin PHP].
     *
     * @var array<int, array{slug: string, class: class-string, path: string}>
     */
    private const MODULES = [
        [
            'slug'  => 'tmd5_flipbox',
            'class' => Flipbox\Flipbox::class,
            'path'  => 'includes/Modules/Flipbox/Flipbox.php',
        ],
    ];

    public static function init(): void
    {
        // TODO: Hook officiel Divi 5 d'enregistrement de modules à confirmer
        // avec la doc Elegant Themes. Placeholder sur `init` pour le moment.
        add_action('init', [self::class, 'register_modules'], 20);
    }

    public static function register_modules(): void
    {
        foreach (self::MODULES as $module) {
            $full_path = TMD5_PLUGIN_DIR . $module['path'];
            if (!is_readable($full_path)) {
                continue;
            }
            require_once $full_path;

            if (class_exists($module['class'])) {
                new $module['class']();
            }
        }
    }
}
