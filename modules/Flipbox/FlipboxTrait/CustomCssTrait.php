<?php
/**
 * @package TangibleModules\Modules\Flipbox
 */

declare(strict_types=1);

namespace TangibleModules\Modules\Flipbox\FlipboxTrait;

defined('ABSPATH') || exit;

trait CustomCssTrait
{
    public static function custom_css()
    {
        return \WP_Block_Type_Registry::get_instance()
            ->get_registered('tangible/flipbox')
            ->customCssFields;
    }
}
