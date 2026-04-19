<?php
/**
 * Tangible Flipbox module.
 *
 * @package TangibleModules\Modules\Flipbox
 */

declare(strict_types=1);

namespace TangibleModules\Modules\Flipbox;

defined('ABSPATH') || exit;

use ET\Builder\Framework\DependencyManagement\Interfaces\DependencyInterface;
use ET\Builder\Packages\ModuleLibrary\ModuleRegistration;

class Flipbox implements DependencyInterface
{
    use FlipboxTrait\RenderCallbackTrait;
    use FlipboxTrait\ModuleClassnamesTrait;
    use FlipboxTrait\ModuleStylesTrait;
    use FlipboxTrait\ModuleScriptDataTrait;

    public function load(): void
    {
        $module_json_folder_path = TMD5_JSON_PATH . 'flipbox/';

        add_action(
            'init',
            static function () use ($module_json_folder_path): void {
                ModuleRegistration::register_module(
                    $module_json_folder_path,
                    [
                        'render_callback' => [self::class, 'render_callback'],
                    ]
                );
            }
        );
    }
}
