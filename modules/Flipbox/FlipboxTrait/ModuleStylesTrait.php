<?php
/**
 * @package TangibleModules\Modules\Flipbox
 */

declare(strict_types=1);

namespace TangibleModules\Modules\Flipbox\FlipboxTrait;

defined('ABSPATH') || exit;

use ET\Builder\FrontEnd\Module\Style;
use ET\Builder\Packages\Module\Options\Css\CssStyle;
use TangibleModules\Modules\Flipbox\Flipbox;

trait ModuleStylesTrait
{
    use CustomCssTrait;

    public static function module_styles($args): void
    {
        $attrs    = $args['attrs'] ?? [];
        $elements = $args['elements'];
        $settings = $args['settings'] ?? [];

        Style::add([
            'id'            => $args['id'],
            'name'          => $args['name'],
            'orderIndex'    => $args['orderIndex'],
            'storeInstance' => $args['storeInstance'],
            'styles'        => [
                $elements->style([
                    'attrName'   => 'module',
                    'styleProps' => [
                        'disabledOn'     => [
                            'disabledModuleVisibility' => $settings['disabledModuleVisibility'] ?? null,
                        ],
                        'advancedStyles' => [
                            [
                                'componentName' => 'divi/text',
                                'props'         => [
                                    'selector' => "{$args['orderClass']} .tmd5_flipbox__inner",
                                    'attr'     => $attrs['module']['advanced']['text'] ?? [],
                                ],
                            ],
                        ],
                    ],
                ]),

                $elements->style(['attrName' => 'frontTitle']),
                $elements->style(['attrName' => 'frontContent']),
                $elements->style(['attrName' => 'backTitle']),
                $elements->style(['attrName' => 'backContent']),

                CssStyle::style([
                    'selector'  => $args['orderClass'],
                    'attr'      => $attrs['css'] ?? [],
                    'cssFields' => Flipbox::custom_css(),
                ]),
            ],
        ]);
    }
}
