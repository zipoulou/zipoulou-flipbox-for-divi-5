<?php
/**
 * @package TangibleModules\Modules\Flipbox
 */

declare(strict_types=1);

namespace TangibleModules\Modules\Flipbox\FlipboxTrait;

defined('ABSPATH') || exit;

use ET\Builder\Packages\Module\Options\Text\TextClassnames;

trait ModuleClassnamesTrait
{
    public static function module_classnames($args): void
    {
        $classnames_instance = $args['classnamesInstance'];
        $attrs               = $args['attrs'];

        $text_options_classnames = TextClassnames::text_options_classnames(
            $attrs['module']['advanced']['text'] ?? []
        );

        if ($text_options_classnames) {
            $classnames_instance->add($text_options_classnames, true);
        }
    }
}
