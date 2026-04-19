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
    public static function render_callback($attrs, $content, $block, $elements): string
    {
        $media_inner  = $attrs['frontMedia']['innerContent']['desktop']['value'] ?? [];
        $use_icon     = ($media_inner['useIcon'] ?? 'off') === 'on';
        $has_icon     = !empty($media_inner['icon']);
        $has_image    = !empty($media_inner['src']);

        $media_html = '';
        if ($use_icon && $has_icon) {
            $media_html = $elements->render([
                'attrName'     => 'frontMedia',
                'tagName'      => 'span',
                'skipChildren' => true,
                'className'    => 'et-pb-icon',
            ]);
        } elseif (!$use_icon && $has_image) {
            $media_html = $elements->render([
                'attrName'    => 'frontMedia',
                'elementType' => 'image',
            ]);
        }

        $media_wrapper = '';
        if ($media_html) {
            $media_wrapper = HTMLUtility::render([
                'tag'               => 'div',
                'attributes'        => ['class' => 'tmd5_flipbox__front-media'],
                'childrenSanitizer' => 'et_core_esc_previously',
                'children'          => $media_html,
            ]);
        }

        $front_subtitle = $elements->render(['attrName' => 'frontSubtitle']);
        $front_title    = $elements->render(['attrName' => 'frontTitle']);
        $front_content  = $elements->render(['attrName' => 'frontContent']);

        $front = HTMLUtility::render([
            'tag'               => 'div',
            'attributes'        => ['class' => 'tmd5_flipbox__front'],
            'childrenSanitizer' => 'et_core_esc_previously',
            'children'          => $media_wrapper . $front_subtitle . $front_title . $front_content,
        ]);

        $back_subtitle = $elements->render(['attrName' => 'backSubtitle']);
        $back_title    = $elements->render(['attrName' => 'backTitle']);
        $back_content  = $elements->render(['attrName' => 'backContent']);

        $button_html  = '';
        $button_inner = $attrs['backButton']['innerContent']['desktop']['value'] ?? [];
        $button_text  = trim((string) ($button_inner['text'] ?? ''));
        if ($button_text !== '') {
            $button_url    = $button_inner['url'] ?? '#';
            $button_target = ($button_inner['target'] ?? 'off') === 'on' ? '_blank' : '';

            $button_attrs = [
                'class' => 'tmd5_flipbox__back-button',
                'href'  => esc_url($button_url),
            ];
            if ($button_target) {
                $button_attrs['target'] = $button_target;
                $button_attrs['rel']    = 'noopener noreferrer';
            }

            $button_html = HTMLUtility::render([
                'tag'               => 'a',
                'attributes'        => $button_attrs,
                'childrenSanitizer' => 'esc_html',
                'children'          => $button_text,
            ]);
        }

        $back = HTMLUtility::render([
            'tag'               => 'div',
            'attributes'        => ['class' => 'tmd5_flipbox__back'],
            'childrenSanitizer' => 'et_core_esc_previously',
            'children'          => $back_subtitle . $back_title . $back_content . $button_html,
        ]);

        $flipbox_settings = $attrs['flipbox']['innerContent']['desktop']['value'] ?? [];
        $trigger          = $flipbox_settings['trigger'] ?? 'hover';
        $direction        = $flipbox_settings['direction'] ?? 'right';
        $duration         = $flipbox_settings['duration'] ?? '600ms';

        $inner = HTMLUtility::render([
            'tag'               => 'div',
            'attributes'        => [
                'class'              => 'tmd5_flipbox__inner',
                'data-tmd-trigger'   => $trigger,
                'data-tmd-direction' => $direction,
                'style'              => sprintf('--tmd-duration:%s', esc_attr($duration)),
            ],
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
