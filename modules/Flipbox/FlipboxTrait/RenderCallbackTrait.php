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

        $flipbox_settings = $attrs['flipbox']['innerContent']['desktop']['value'] ?? [];
        $layout = $flipbox_settings['layout'] ?? 'content';

        $show_media = $layout !== 'textOnly' && (($use_icon && $has_icon) || (!$use_icon && $has_image));
        $show_text  = $layout !== 'mediaOnly';

        $media_html = '';
        if ($show_media && $use_icon && $has_icon) {
            // Divi icon format: "&#xHEX;||family||weight" — parse and render manually.
            $icon_raw = (string) ($media_inner['icon'] ?? '');
            $parts    = explode('||', $icon_raw);
            $char_ent = $parts[0] ?? '';
            $weight   = $parts[2] ?? '400';
            $icon_color = $attrs['frontMedia']['advanced']['color']['desktop']['value'] ?? '';

            $style_bits = ["font-weight:{$weight}"];
            if ($icon_color) {
                $style_bits[] = 'color:' . esc_attr($icon_color);
            }

            $media_html = HTMLUtility::render([
                'tag'        => 'span',
                'attributes' => [
                    'class'     => 'et-pb-icon',
                    'data-icon' => $char_ent,
                    'style'     => implode(';', $style_bits),
                ],
                'children'          => html_entity_decode($char_ent, ENT_QUOTES | ENT_HTML5, 'UTF-8'),
                'childrenSanitizer' => 'esc_html',
            ]);
        } elseif ($show_media && !$use_icon && $has_image) {
            $src  = (string) ($media_inner['src'] ?? '');
            $alt  = (string) ($media_inner['alt'] ?? '');
            $media_html = HTMLUtility::render([
                'tag'        => 'img',
                'attributes' => [
                    'src'     => esc_url($src),
                    'alt'     => $alt,
                    'loading' => 'lazy',
                ],
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

        $front_subtitle = $show_text ? $elements->render(['attrName' => 'frontSubtitle']) : '';
        $front_title    = $show_text ? $elements->render(['attrName' => 'frontTitle'])    : '';
        $front_content  = $show_text ? $elements->render(['attrName' => 'frontContent'])  : '';

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

        $trigger       = $flipbox_settings['trigger']      ?? 'hover';
        $anim_type     = $flipbox_settings['type']         ?? 'flip';
        $direction     = $flipbox_settings['direction']    ?? 'right';
        $duration      = $flipbox_settings['duration']     ?? '600ms';
        $auto_interval = $flipbox_settings['autoInterval'] ?? '4s';
        $preset        = $flipbox_settings['preset']       ?? 'classic';
        $size_mode     = $flipbox_settings['sizeMode']     ?? 'minHeight';
        $aspect      = $flipbox_settings['aspectRatio'] ?? '4/3';
        $min_height  = $flipbox_settings['minHeight']   ?? '320px';
        $fixed_h     = $flipbox_settings['fixedHeight'] ?? '320px';
        $media_fit   = $attrs['frontMedia']['advanced']['fit']['desktop']['value'] ?? 'cover';
        $media_zoom  = $attrs['frontMedia']['advanced']['zoom']['desktop']['value'] ?? '100%';
        $media_pos   = $attrs['frontMedia']['advanced']['objectPosition']['desktop']['value'] ?? 'center center';

        // Convert "115%" → "1.15" for CSS scale().
        $zoom_scale = '1';
        if (preg_match('/^(\d+(?:\.\d+)?)/', (string) $media_zoom, $m)) {
            $zoom_scale = rtrim(rtrim(number_format((float) $m[1] / 100, 4, '.', ''), '0'), '.');
            if ($zoom_scale === '') {
                $zoom_scale = '1';
            }
        }

        $style_vars = sprintf(
            '--tmd-duration:%s;--tmd-aspect-ratio:%s;--tmd-min-height:%s;--tmd-fixed-height:%s;--tmd-media-fit:%s;--tmd-media-zoom:%s;--tmd-media-position:%s',
            esc_attr($duration),
            esc_attr($aspect),
            esc_attr($min_height),
            esc_attr($fixed_h),
            esc_attr((string) $media_fit),
            esc_attr($zoom_scale),
            esc_attr((string) $media_pos)
        );

        $inner = HTMLUtility::render([
            'tag'               => 'div',
            'attributes'        => [
                'class'                  => 'tmd5_flipbox__inner',
                'data-tmd-trigger'       => $trigger,
                'data-tmd-type'          => $anim_type,
                'data-tmd-direction'     => $direction,
                'data-tmd-preset'        => $preset,
                'data-tmd-layout'        => $layout,
                'data-tmd-size-mode'     => $size_mode,
                'data-tmd-auto-interval' => $auto_interval,
                'style'                  => $style_vars,
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
