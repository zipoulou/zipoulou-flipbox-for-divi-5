/**
 * Tangible Flipbox — frontend runtime.
 *
 * Handles click trigger toggling and keyboard activation.
 * Hover trigger is pure CSS and needs no JS.
 */

const INNER_SELECTOR = '.tmd5_flipbox__inner';
const FLIPPED_CLASS  = 'is-flipped';
const INIT_ATTR      = 'data-tmd-ready';

function updatePressed(el: HTMLElement): void {
  el.setAttribute(
    'aria-pressed',
    el.classList.contains(FLIPPED_CLASS) ? 'true' : 'false'
  );
}

function initFlipbox(el: HTMLElement): void {
  if (el.getAttribute(INIT_ATTR) === '1') {
    return;
  }
  el.setAttribute(INIT_ATTR, '1');

  const trigger = el.getAttribute('data-tmd-trigger') ?? 'hover';
  if (trigger !== 'click') {
    return;
  }

  if (!el.hasAttribute('tabindex')) {
    el.setAttribute('tabindex', '0');
  }
  if (!el.hasAttribute('role')) {
    el.setAttribute('role', 'button');
  }
  updatePressed(el);

  el.addEventListener('click', (event: MouseEvent): void => {
    const target = event.target as HTMLElement | null;
    if (target && target.closest('.tmd5_flipbox__back-button')) {
      return;
    }
    el.classList.toggle(FLIPPED_CLASS);
    updatePressed(el);
  });

  el.addEventListener('keydown', (event: KeyboardEvent): void => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    const target = event.target as HTMLElement | null;
    if (target && target.closest('.tmd5_flipbox__back-button')) {
      return;
    }
    event.preventDefault();
    el.classList.toggle(FLIPPED_CLASS);
    updatePressed(el);
  });
}

function boot(): void {
  document.querySelectorAll<HTMLElement>(INNER_SELECTOR).forEach(initFlipbox);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

const observer = new MutationObserver((mutations: MutationRecord[]): void => {
  for (const mutation of mutations) {
    mutation.addedNodes.forEach((node: Node): void => {
      if (!(node instanceof HTMLElement)) {
        return;
      }
      if (node.matches(INNER_SELECTOR)) {
        initFlipbox(node);
      }
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
