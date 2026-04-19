<?php
/**
 * @package TangibleModules\Modules\Flipbox
 */

declare(strict_types=1);

namespace TangibleModules\Modules\Flipbox\FlipboxTrait;

defined('ABSPATH') || exit;

use ET\Builder\Packages\Module\Layout\Components\MultiView\MultiViewScriptData;
use ET\Builder\Packages\Module\Options\Element\ElementScriptData;

trait ModuleScriptDataTrait
{
    public static function module_script_data($args): void
    {
        $id             = $args['id'] ?? '';
        $name           = $args['name'] ?? '';
        $selector       = $args['selector'] ?? '';
        $attrs          = $args['attrs'] ?? [];
        $store_instance = $args['storeInstance'] ?? null;

        $module_decoration_attrs = $attrs['module']['decoration'] ?? [];

        ElementScriptData::set([
            'id'            => $id,
            'selector'      => $selector,
            'attrs'         => array_merge(
                $module_decoration_attrs,
                [
                    'link' => $attrs['module']['advanced']['link'] ?? [],
                ]
            ),
            'storeInstance' => $store_instance,
        ]);

        MultiViewScriptData::set([
            'id'            => $id,
            'name'          => $name,
            'hoverSelector' => $selector,
            'setContent'    => [
                [
                    'selector'      => $selector . ' .tmd5_flipbox__front-subtitle',
                    'data'          => $attrs['frontSubtitle']['innerContent'] ?? [],
                    'valueResolver' => static fn($value) => $value ?? '',
                ],
                [
                    'selector'      => $selector . ' .tmd5_flipbox__front-title',
                    'data'          => $attrs['frontTitle']['innerContent'] ?? [],
                    'valueResolver' => static fn($value) => $value ?? '',
                ],
                [
                    'selector'      => $selector . ' .tmd5_flipbox__front-content',
                    'data'          => $attrs['frontContent']['innerContent'] ?? [],
                    'valueResolver' => static fn($value) => $value ?? '',
                    'sanitizer'     => 'et_core_esc_previously',
                ],
                [
                    'selector'      => $selector . ' .tmd5_flipbox__back-subtitle',
                    'data'          => $attrs['backSubtitle']['innerContent'] ?? [],
                    'valueResolver' => static fn($value) => $value ?? '',
                ],
                [
                    'selector'      => $selector . ' .tmd5_flipbox__back-title',
                    'data'          => $attrs['backTitle']['innerContent'] ?? [],
                    'valueResolver' => static fn($value) => $value ?? '',
                ],
                [
                    'selector'      => $selector . ' .tmd5_flipbox__back-content',
                    'data'          => $attrs['backContent']['innerContent'] ?? [],
                    'valueResolver' => static fn($value) => $value ?? '',
                    'sanitizer'     => 'et_core_esc_previously',
                ],
            ],
        ]);
    }
}
