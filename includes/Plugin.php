<?php
/**
 * @package TangibleModules\Divi5
 */

declare(strict_types=1);

namespace TangibleModules\Divi5;

defined('ABSPATH') || exit;

final class Plugin
{
    private static ?self $instance = null;

    private bool $booted = false;

    public static function instance(): self
    {
        return self::$instance ??= new self();
    }

    public function boot(): void
    {
        if ($this->booted) {
            return;
        }
        $this->booted = true;

        if (!$this->divi5_is_active()) {
            add_action('admin_notices', [$this, 'render_requirements_notice']);
            return;
        }

        require_once TMD5_PLUGIN_DIR . 'includes/Modules/ModuleRegistry.php';
        Modules\ModuleRegistry::init();
    }

    private function divi5_is_active(): bool
    {
        if (!defined('ET_BUILDER_VERSION')) {
            return false;
        }
        return version_compare(ET_BUILDER_VERSION, TMD5_MIN_DIVI_VERSION, '>=');
    }

    public function render_requirements_notice(): void
    {
        $message = esc_html__(
            'Tangible Modules for Divi 5 requires Divi 5.0 or higher to be active.',
            'tangible-modules-divi5'
        );
        printf('<div class="notice notice-error"><p>%s</p></div>', $message);
    }
}
