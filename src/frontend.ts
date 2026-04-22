/**
 * Zipoulou FlipBox — frontend runtime.
 *
 * Handles:
 *   - click trigger (toggle on click + keyboard activation)
 *   - auto trigger (setInterval flip)
 *
 * Hover trigger is pure CSS and needs no JS.
 */

const INNER_SELECTOR = '.tmd5_flipbox__inner';
const FLIPPED_CLASS  = 'is-flipped';
const INIT_ATTR      = 'data-tmd-ready';
const TIMER_ATTR     = 'data-tmd-timer';

function updatePressed(el: HTMLElement): void {
  el.setAttribute(
    'aria-pressed',
    el.classList.contains(FLIPPED_CLASS) ? 'true' : 'false'
  );
}

function parseIntervalMs(raw: string | null): number {
  if (!raw) return 4000;
  const match = raw.match(/^(\d+(?:\.\d+)?)(ms|s)?$/);
  if (!match) return 4000;
  const value = parseFloat(match[1]);
  const unit  = match[2] ?? 's';
  return unit === 'ms' ? value : value * 1000;
}

function initClick(el: HTMLElement): void {
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
  if (!el.hasAttribute('role'))     el.setAttribute('role', 'button');
  updatePressed(el);

  el.addEventListener('click', (event: MouseEvent): void => {
    const target = event.target as HTMLElement | null;
    if (target && target.closest('.tmd5_flipbox__back-button')) return;
    el.classList.toggle(FLIPPED_CLASS);
    updatePressed(el);
  });

  el.addEventListener('keydown', (event: KeyboardEvent): void => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const target = event.target as HTMLElement | null;
    if (target && target.closest('.tmd5_flipbox__back-button')) return;
    event.preventDefault();
    el.classList.toggle(FLIPPED_CLASS);
    updatePressed(el);
  });
}

function initAuto(el: HTMLElement): void {
  // Respect user's motion preferences — no automatic state changes if reduced.
  const reduceMotion = typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    return;
  }

  const intervalRaw = el.getAttribute('data-tmd-auto-interval');
  const ms = Math.max(300, parseIntervalMs(intervalRaw));

  // Pause cycling when the user hovers or focuses (give them time to read).
  let paused = false;
  const pause  = () => { paused = true; };
  const resume = () => { paused = false; };
  el.addEventListener('mouseenter', pause);
  el.addEventListener('mouseleave', resume);
  el.addEventListener('focusin',   pause);
  el.addEventListener('focusout',  resume);

  const timerId = window.setInterval(() => {
    // Defensive: bail if the node is no longer in the document (SPA / AJAX
    // transitions can detach an ancestor without our cleanup observer seeing it).
    if (!document.contains(el)) {
      window.clearInterval(timerId);
      return;
    }
    if (paused) return;
    el.classList.toggle(FLIPPED_CLASS);
  }, ms);

  el.setAttribute(TIMER_ATTR, String(timerId));

  // Belt-and-braces: watch the whole document for the node being removed from any depth.
  const cleanupObserver = new MutationObserver(() => {
    if (!document.contains(el)) {
      window.clearInterval(timerId);
      cleanupObserver.disconnect();
    }
  });
  cleanupObserver.observe(document.body, { childList: true, subtree: true });
}

// Detect a touch-primary device (no hover + coarse pointer). Used to fall
// back to click behaviour for hover-triggered flipboxes, since `:hover` is
// sticky on touch (first tap latches hover, can't be cleared by tapping the
// card itself). Dual-input devices (laptop + touchscreen) report
// `hover: hover` as their primary input and take the pure-CSS hover path.
function isTouchOnly(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

function initFlipbox(el: HTMLElement): void {
  if (el.getAttribute(INIT_ATTR) === '1') return;
  el.setAttribute(INIT_ATTR, '1');

  const trigger = el.getAttribute('data-tmd-trigger') ?? 'hover';
  if (trigger === 'click')  initClick(el);
  if (trigger === 'auto')   initAuto(el);
  // Touch fallback: on hover-triggered flipboxes, promote to click on
  // touch-only devices. CSS mixin already handles `.is-flipped` for any
  // trigger, so toggling the class is enough.
  if (trigger === 'hover' && isTouchOnly()) initClick(el);
}

function boot(): void {
  document.querySelectorAll<HTMLElement>(INNER_SELECTOR).forEach(initFlipbox);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

// Initialise dynamically injected flipboxes (AJAX page transitions etc.).
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    mutation.addedNodes.forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      if (node.matches(INNER_SELECTOR)) initFlipbox(node);
      node.querySelectorAll<HTMLElement>(INNER_SELECTOR).forEach(initFlipbox);
    });
  }
});

if (document.body) {
  observer.observe(document.body, { childList: true, subtree: true });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true, subtree: true });
  });
}
