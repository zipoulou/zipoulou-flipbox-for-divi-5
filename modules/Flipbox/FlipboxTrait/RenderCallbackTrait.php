<?php
/**
 * @package TangibleModules\Modules\Flipbox
 */

declare(strict_types=1);

namespace TangibleModules\Modules\Flipbox\FlipboxTrait;

defined('ABSPATH') || exit;

use ET\Builder\Packages\Module\Module;
use ET\Builder\Framework\Utility\HTMLUtility;
use ET\Builder\FrontEnd\BlockParser\BlockParserStore;
use ET\Builder\Packages\Module\Options\Element\ElementComponents;
use TangibleModules\Modules\Flipbox\Flipbox;

trait RenderCallbackTrait
{
    /**
     * Server-side render of the Flipbox module.
     *
     * @param array    $attrs    Block attributes.
     * @param string   $content  Block content.
     * @param \WP_Block $block   Parsed block.
     * @param object   $elements ModuleElements instance.
     *
     * @return string
     */
    public static function render_callback($attrs, $content, $block, $elements): string
    {
        $front_title   = $elements->render(['attrName' => 'frontTitle']);
        $front_content = $elements->render(['attrName' => 'frontContent']);
        $back_title    = $elements->render(['attrName' => 'backTitle']);
        $back_content  = $elements->render(['attrName' => 'backContent']);

        $front = HTMLUtility::render([
            'tag'               => 'div',
            'attributes'        => ['class' => 'tmd5_flipbox__front'],
            'childrenSanitizer' => 'et_core_esc_previously',
            'children'          => $front_title . $front_content,
        ]);

        $back = HTMLUtility::render([
            'tag'               => 'div',
            'attributes'        => ['class' => 'tmd5_flipbox__back'],
            'childrenSanitizer' => 'et_core_esc_previously',
            'children'          => $back_title . $back_content,
        ]);

        $inner = HTMLUtility::render([
            'tag'               => 'div',
            'attributes'        => ['class' => 'tmd5_flipbox__inner'],
            'childrenSanitizer' => 'et_core_esc_previously',
            'children'          => $front . $back,
        ]);

        $parent       = BlockParserStore::get_parent(
            $block->parsed_block['id'],
            $block->parsed_block['storeInstance']
        );
        $parent_attrs = $parent->attrs ?? [];

        return Module::render([
            'orderIndex'          => $block->parsed_block['orderIndex'],
            'storeInstance'       => $block->parsed_block['storeInstance'],
            'attrs'               => $attrs,
            'elements'            => $elements,
            'id'                  => $block->parsed_block['id'],
            'name'                => $block->block_type->name,
            'moduleCategory'      => $block->block_type->category,
            'classnamesFunction'  => [Flipbox::class, 'module_classnames'],
            'stylesComponent'     => [Flipbox::class, 'module_styles'],
            'scriptDataComponent' => [Flipbox::class, 'module_script_data'],
            'parentAttrs'         => $parent_attrs,
            'parentId'            => $parent->id ?? '',
            'parentName'          => $parent->blockName ?? '',
            'children'            => [
                ElementComponents::component([
                    'attrs'         => $attrs['module']['decoration'] ?? [],
                    'id'            => $block->parsed_block['id'],
                    'orderIndex'    => $block->parsed_block['orderIndex'],
                    'storeInstance' => $block->parsed_block['storeInstance'],
                ]),
                $inner,
            ],
        ]);
    }
}
