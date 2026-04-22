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

// autoReturnMs > 0 schedules an automatic un-flip `autoReturnMs` milliseconds
// after the tile is flipped to the back side — matches the "peek" intent
// that hover gives on desktop when there's no mouseleave equivalent (touch).
// Interacting with the card again while it's flipped cancels the pending
// return (user is reading); flipping back manually also cancels it.
function initClick(el: HTMLElement, autoReturnMs: number = 0): void {
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
  if (!el.hasAttribute('role'))     el.setAttribute('role', 'button');
  updatePressed(el);

  let autoReturnTimer: number | null = null;
  const clearAutoReturn = (): void => {
    if (autoReturnTimer !== null) {
      window.clearTimeout(autoReturnTimer);
      autoReturnTimer = null;
    }
  };
  const scheduleAutoReturn = (): void => {
    if (autoReturnMs <= 0) return;
    clearAutoReturn();
    autoReturnTimer = window.setTimeout(() => {
      el.classList.remove(FLIPPED_CLASS);
      updatePressed(el);
      autoReturnTimer = null;
    }, autoReturnMs);
  };

  const toggle = (): void => {
    const wasFlipped = el.classList.contains(FLIPPED_CLASS);
    el.classList.toggle(FLIPPED_CLASS);
    updatePressed(el);
    if (!wasFlipped) scheduleAutoReturn();
    else clearAutoReturn();
  };

  el.addEventListener('click', (event: MouseEvent): void => {
    const target = event.target as HTMLElement | null;
    if (target && target.closest('.tmd5_flipbox__back-button')) return;
    toggle();
  });

  el.addEventListener('keydown', (event: KeyboardEvent): void => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const target = event.target as HTMLElement | null;
    if (target && target.closest('.tmd5_flipbox__back-button')) return;
    event.preventDefault();
    toggle();
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

// Wobble hint — two trigger sources:
//   1) IntersectionObserver: fires once per session on first viewport entry
//   2) mouseenter (hover-capable devices only): fires on every hover so the
//      user gets a consistent "this rotates" cue each time they interact.
// Animation is 900ms; `animationend` removes the class so it can replay.
// Skipped under prefers-reduced-motion and when the card is currently flipped.
const WOBBLE_CLASS = 'tmd-wobble';
const WOBBLE_DONE_ATTR = 'data-tmd-wobble-done';
let wobbleObserver: IntersectionObserver | null = null;

function playWobble(el: HTMLElement): void {
  if (el.classList.contains(WOBBLE_CLASS)) return;
  if (el.classList.contains('is-flipped')) return;
  el.classList.add(WOBBLE_CLASS);
}

function getWobbleObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') return null;
  if (wobbleObserver) return wobbleObserver;
  wobbleObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target as HTMLElement;
      if (el.getAttribute(WOBBLE_DONE_ATTR) === '1') continue;
      el.setAttribute(WOBBLE_DONE_ATTR, '1');
      playWobble(el);
      wobbleObserver!.unobserve(el);
    }
  }, { threshold: 0.35 });
  return wobbleObserver;
}

function initWobble(el: HTMLElement, trigger: string): void {
  if (el.getAttribute('data-tmd-wobble') !== '1') return;
  const reduce = typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  // Self-cleanup on animationend so the class can be re-added for replays.
  el.addEventListener('animationend', (ev) => {
    if ((ev as AnimationEvent).animationName === 'tmd5-wobble') {
      el.classList.remove(WOBBLE_CLASS);
    }
  });

  const observer = getWobbleObserver();
  if (observer) observer.observe(el);

  // Mouse-driven replay on every hover is useful for click/auto triggers
  // (no other hover feedback on those). For trigger='hover', skip it —
  // the hover already drives the full flip via CSS, and layering the
  // wobble keyframes on top produces a visible snap when the animation
  // ends and the transition jumps to its target value.
  const hoverCapable = typeof window.matchMedia === 'function'
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (hoverCapable && trigger !== 'hover') {
    el.addEventListener('mouseenter', () => playWobble(el));
  }
}

function initFlipbox(el: HTMLElement): void {
  if (el.getAttribute(INIT_ATTR) === '1') return;
  el.setAttribute(INIT_ATTR, '1');

  const trigger = el.getAttribute('data-tmd-trigger') ?? 'hover';
  if (trigger === 'click')  initClick(el);
  if (trigger === 'auto')   initAuto(el);
  // Touch fallback: on hover-triggered flipboxes, promote to plain
  // click-toggle on touch-only devices. No auto-return — a second tap
  // flips back. (Earlier versions auto-returned after 3.5 s to emulate
  // mouseleave, but the surprise motion was reported as confusing.)
  if (trigger === 'hover' && isTouchOnly()) initClick(el);

  initWobble(el, trigger);
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
