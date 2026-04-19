# Changelog

All notable changes to Zipoulou FlipBox for Divi 5 are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/) · Versioning: [Semantic](https://semver.org/).

---

## [0.7.3] — 2026-04-20

### Changed
- **Showcase preset card edges** — added 1 px soft border (`rgba(15,23,42,0.08)`) and stronger drop shadow (`0 10px 28px -10px rgba(26,54,93,0.22)`) directly on `.tmd5_flipbox__front` and `.tmd5_flipbox__back`, so each card reads as a distinct tile rather than blending into the page background. Border-radius matched at 18 px on both faces.

---

## [0.7.2] — 2026-04-20

### Added
- **8th visual preset: `showcase`** — front = large image (flex: 1) + white caption panel below with centered italic title + uppercase caption; back = same avatar chip style as `gallery`. Pair with `layout: content` + `sizeMode: minHeight` (e.g. 440px). Intended for product card / artisan showcase rows.

---

## [0.7.1] — 2026-04-20

### Fixed
- **SCSS mixin nesting bug** — `@tmd-flipped($type)` was emitting doubled selectors like `.tmd5_flipbox .tmd5_flipbox:hover .tmd5_flipbox__inner[...]` because it was `@included` inside the parent `.tmd5_flipbox { ... }` block, causing SCSS to prefix the mixin's selectors. Wrapped the mixin body in `@at-root` so the generated rules stay at root level. Now hover/click/auto trigger the flip transform correctly on all animation types.

### Added
- **New visual preset: `gallery`** — front shows only the image (`layout: mediaOnly` pairing), back reveals a circular emoji chip (built from `backSubtitle`) + title + description on a dark (#7a2222) card background. Intended for 3-column product / artisan showcases.
- **New aspect ratio option: `10/11`** — slightly portrait (for near-square product cards).

---

## [0.7.0] — 2026-04-20

### Added
- **6 visual presets** controlled via `flipbox.innerContent.preset` : `classic` (default), `minimal`, `badge`, `stats`, `profile`, `split`.
- Each preset is a curated CSS bundle (backgrounds, typography, icon shape, spacing) in `src/components/flipbox/presets.scss` — fully overridable via Design panel.
- `data-tmd-preset` attribute emitted on `.tmd5_flipbox__inner` by both VB edit and server render.

---

## [0.6.0] — 2026-04-20

### Added
- **6 animation types** via `flipbox.innerContent.type`:
  - `flip` (default, 3D rotation — uses direction)
  - `slide` (2D translate — uses direction)
  - `fade` (opacity cross-fade)
  - `zoomIn` (back grows from 0.7× to 1×)
  - `zoomOut` (back shrinks from 1.3× to 1×)
  - `blur` (filter blur 20 px + opacity)
- **`auto` trigger** with configurable `autoInterval` (1–20 s) — auto-flip pauses on hover/focus for readability.
- MutationObserver in `frontend.ts` for interval cleanup on DOM removal.

### Changed
- SCSS refactored with `@tmd-flipped($type)` mixin (DRY hover + click.is-flipped + auto.is-flipped).
- Non-3D types flatten the `transform-style` and set `backface-visibility: visible` on child faces.

---

## [0.5.2] — 2026-04-19

### Changed
- **Rebranding** from "Tangible Modules for Divi 5" to **Zipoulou FlipBox for Divi 5** (plugin display name, module title, descriptions).
- Internal technical identifiers preserved — saved blocks continue to work without migration.

---

## [0.5.1] — 2026-04-19

### Fixed
- Scroll wheel getting absorbed over flipboxes on some browsers (Chromium + trackpad). Removed baseline `will-change: transform` and `translateZ(0)` that created a permanent compositing layer. GPU promotion now happens just-in-time (hover, focus-within, `.is-flipped` only).

---

## [0.5.0] — 2026-04-19

### Added
- **Size modes**: minimum height (default) / aspect ratio / fixed height.
- **Aspect ratio presets**: 1:1, 4:3, 3:2, 16:9, 2:1.
- **Layout modes**: content (default) / text-only / media-only / image-cover (full-bleed background with gradient overlay).
- **Image fit** (front media): cover / contain via `object-fit`.
- `loading="lazy"` on `<img>` tags for Core Web Vitals.
- `will-change: transform` + `translateZ(0)` for GPU acceleration (rolled back in 0.5.1 — see above).

---

## [0.4.6] — 2026-04-19

### Fixed
- Long text / images could overflow the tile. Added `overflow: hidden` on front/back faces, `overflow-wrap: anywhere` + `word-break: break-word` on text elements, `max-width: 100%` on all direct children and injected media.

---

## [0.4.5] — 2026-04-19

### Fixed
- **Fatal error** `UnexpectedValueException: Expected a string value, but a array value was given` when rendering flipboxes with a configured icon. Root cause: `$elements->render(['attrName' => 'frontMedia'])` triggered Divi's MultiView auto-pipeline which expected `innerContent.value` to be a string, but our icon/image attribute has a structured object. Switched to manual `HTMLUtility::render` for frontMedia.

---

## [0.4.4] — 2026-04-19

### Fixed
- Removed `backButton` from `MultiViewScriptData::setContent` (same root cause as 0.4.5, different symptom).

---

## [0.4.3] — 2026-04-19

### Fixed
- Content panel accordions: front / back now render as separate groups ("Front Side" / "Back Side") instead of all items falling into Divi's auto "Text" group. Replaced `groupName` with `groupSlug` on item references to point at custom `settings.groups` keys.

---

## [0.4.2] — 2026-04-19

### Fixed
- Back-side text color inheritance bug — back-side elements now forced to white via SCSS regardless of the module-wide Divi text-color setting.

---

## [0.4.1] — 2026-04-19

### Fixed
- Front-side text was invisible (white on light background). The default `module.advanced.text.color = "dark"` in Divi actually means "dark mode" (i.e. white text for dark backgrounds). Removed the module-wide default.

---

## [0.4.0] — 2026-04-19

### Added
- **Module SVG icon** registered in Divi icon library (two overlapping cards).

---

## [0.3.0] — 2026-04-19

### Added
- Animation **trigger** select: hover / click.
- Animation **direction** select: right / left / up / down (full 3D rotation on X or Y axis).
- Animation **duration** range: 100–2000 ms.
- **Frontend runtime** (`src/frontend.ts`) for click trigger: vanilla JS, `aria-pressed` + `tabindex` + keyboard activation, `MutationObserver` for AJAX-loaded content. Not enqueued inside the Visual Builder.

---

## [0.2.0] — 2026-04-19

### Added
- **frontMedia** attribute with icon/image toggle (Divi Blurb pattern).
- **frontSubtitle** / **backSubtitle** (H4 by default).
- **backButton** with text, URL, target inner fields.
- Dedicated content panel groups: Front Icon/Image, Front Side, Back Side, Back Button.

---

## [0.1.0] — 2026-04-19

### Added
- Initial scaffold of the plugin.
- Single flipbox module `tangible/flipbox` with front/back title + rich-text content.
- 3D flip animation on hover/focus-within, respecting `prefers-reduced-motion`.
- Webpack + TypeScript + SCSS build pipeline.
- `deploy.sh` for SSH-based deployment to O2SWITCH.
