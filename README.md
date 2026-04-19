<div align="center">

# Zipoulou FlipBox for Divi 5

**Accessible, responsive flipbox module with 6 animation types, 6 visual presets, 4 layout modes and 3 sizing modes — built natively for Divi 5.**
**Module flipbox accessible et responsive avec 6 types d'animation, 6 presets visuels, 4 modes de layout et 3 modes de taille — conçu nativement pour Divi 5.**

[![Divi 5.0+](https://img.shields.io/badge/Divi-5.0%2B-8300e9)](https://elegantthemes.com/divi)
[![PHP 8.1+](https://img.shields.io/badge/PHP-8.1%2B-777bb4)](https://www.php.net/)
[![Node 18+](https://img.shields.io/badge/Node-18%2B-3c873a)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-GPL--2.0--or--later-blue)](https://www.gnu.org/licenses/gpl-2.0.html)

</div>

---

## Table of Contents / Sommaire

- [🇬🇧 English](#-english)
  - [Highlights](#highlights)
  - [Installation](#installation)
  - [Quick Start](#quick-start)
  - [Complete Attribute Reference](#complete-attribute-reference)
  - [Visual Presets](#visual-presets)
  - [Animation Catalog](#animation-catalog)
  - [Layouts & Sizing](#layouts--sizing)
  - [Accessibility](#accessibility)
  - [Recipes](#recipes)
  - [Architecture](#architecture)
  - [Development & Deployment](#development--deployment)
  - [Roadmap](#roadmap)
- [🇫🇷 Français](#-français)
  - [Points forts](#points-forts)
  - [Installation (FR)](#installation-fr)
  - [Démarrage rapide](#démarrage-rapide)
  - [Référence complète des attributs](#référence-complète-des-attributs)
  - [Presets visuels](#presets-visuels)
  - [Catalogue d'animations](#catalogue-danimations)
  - [Layouts & tailles](#layouts--tailles)
  - [Accessibilité](#accessibilité)
  - [Recettes](#recettes)
  - [Architecture (FR)](#architecture-fr)
  - [Développement & déploiement](#développement--déploiement)
  - [Feuille de route](#feuille-de-route)

---

# 🇬🇧 English

## Highlights

- **Native Divi 5 Block API** (React/TypeScript, no jQuery, no shortcode layer)
- **6 animation types** — 3D flip, slide, fade, zoom-in, zoom-out, blur
- **3 triggers** — hover, click (toggle + keyboard), automatic interval
- **6 visual presets** — classic, minimal, badge, stats, profile, split
- **4 layout modes** — standard content / text only / media only / image cover (full-bleed background + overlay)
- **3 sizing modes** — minimum height, aspect ratio, fixed height
- **Per-device responsive** — most attributes have desktop / tablet / phone variants
- **Full a11y** — `prefers-reduced-motion`, keyboard activation, `aria-pressed`, `role="button"`, focus-visible outline
- **Performance** — GPU compositing only during interaction, `loading="lazy"` images, no runtime on pages without flipboxes
- **No external dependencies** — pure CSS animations, tiny vanilla JS (~1 KB) only for click/auto triggers

## Installation

### From release zip (recommended)

1. Download the latest zip from [GitHub Releases](https://github.com/zipoulou/zipoulou-flipbox-for-divi-5/releases) (or `npm run zip` yourself from a clone)
2. **WP Admin → Plugins → Add New → Upload Plugin**, pick the zip, Install Now
3. Activate in **Plugins → Installed Plugins**
4. Requires the **Divi 5.0+** theme active (the plugin does nothing gracefully on Divi 4)

### From source (development / contributing)

```bash
git clone https://github.com/zipoulou/zipoulou-flipbox-for-divi-5.git
cd zipoulou-flipbox-for-divi-5
npm install
npm run build
```

Then symlink or copy the resulting folder into `wp-content/plugins/` on your WordPress install.

## Quick Start

In the Divi 5 Visual Builder:

1. Open a page, click **Insert Module** inside any column
2. Search **Zipoulou FlipBox** and insert it
3. Configure through the **Content** panel:
   - **Flipbox Settings** (preset, animation type, direction, trigger, duration, layout, sizing)
   - **Front Icon / Image** (toggle icon/image + pick asset)
   - **Front Side** (subtitle, title, body)
   - **Back Side** (subtitle, title, body)
   - **Back Button** (text, URL, new-tab toggle)
4. Fine-tune via **Design** panel (typography, colors, borders, shadow, spacing) and **Advanced** (custom CSS, visibility).

## Complete Attribute Reference

All tables show the attribute `subName` inside `flipbox.innerContent`, `frontMedia.innerContent`, etc.

### Flipbox Settings (`flipbox.innerContent`)

| Attribute | Component | Values | Default | Responsive |
|---|---|---|---|---|
| `preset` | select | `classic` · `minimal` · `badge` · `stats` · `profile` · `split` | `classic` | ✓ |
| `trigger` | select | `hover` · `click` · `auto` | `hover` | — |
| `type` | select | `flip` · `slide` · `fade` · `zoomIn` · `zoomOut` · `blur` | `flip` | — |
| `direction` | select | `right` · `left` · `up` · `down` | `right` | — |
| `duration` | range (ms) | 100 → 2000 | `600ms` | — |
| `autoInterval` | range (s) | 1 → 20 | `4s` | — |
| `layout` | select | `content` · `textOnly` · `mediaOnly` · `imageCover` | `content` | ✓ |
| `sizeMode` | select | `minHeight` · `aspect` · `fixed` | `minHeight` | ✓ |
| `aspectRatio` | select | `1/1` · `4/3` · `3/2` · `16/9` · `2/1` | `4/3` | ✓ |
| `minHeight` | range (px) | 100 → 800 | `320px` | ✓ |
| `fixedHeight` | range (px) | 100 → 800 | `320px` | ✓ |

### Front Icon / Image (`frontMedia.innerContent`)

| Attribute | Component | Description |
|---|---|---|
| `useIcon` | toggle | `on` → show Divi icon · `off` → show uploaded image |
| `icon` | Divi icon picker | Any glyph from Divi's icon library |
| `src` | image uploader | Image asset (alt / id / title auto-synced from media library) |

Design panel (`frontMedia.advanced`):

| Attribute | Component | Values | Default | Responsive |
|---|---|---|---|---|
| `color` | color picker | any hex/rgba | — | ✓ |
| `fit` | select | `cover` · `contain` | `cover` | ✓ |

### Front / Back Text (`frontSubtitle`, `frontTitle`, `frontContent`, `backSubtitle`, `backTitle`, `backContent`)

| Attribute | Shape | Notes |
|---|---|---|
| `*.innerContent` | plain text / rich text | Subtitle/Title use plain text + heading level (H1–H6); Content uses rich text |
| `*.decoration.font` | Divi font group | Family, weight, size, color, letter-spacing, line-height |

Titles default to H3, subtitles to H4 — all overridable in Design panel.

### Back Button (`backButton.innerContent`)

| Attribute | Component | Description |
|---|---|---|
| `text` | text | Button label — if empty, no button is rendered |
| `url` | text (URL) | Destination |
| `target` | toggle | `on` → `target="_blank"` + `rel="noopener noreferrer"` |

### Module-level (Divi standard, via `module.advanced` / `module.decoration`)

- `link` (whole-module link)
- `text` (module-wide text color mode)
- `htmlAttributes` (ID / classes)
- `background`, `sizing`, `spacing`, `border`, `boxShadow`, `filters`, `transform`, `animation`, `overflow`, `disabledOn`, `transition`, `position`, `zIndex`, `scroll`, `sticky`

## Visual Presets

Each preset is a curated bundle of CSS overriding backgrounds, typography, icon shape, spacing. The preset does not block fine-tuning: you can still override any field via the Design panel.

| Preset | Look | Best for |
|---|---|---|
| `classic` | Icon top-left, title, content, button at bottom, left-aligned | Feature cards, service listings |
| `minimal` | No media, centered, thin borders, refined typography | Call-outs, key points, editorial |
| `badge` | Colored rounded-square icon + left accent stripe | SaaS features, pricing tiers |
| `stats` | Huge gradient number as "title", kicker subtitle, centered | KPIs, impact metrics, counters |
| `profile` | 120 px circular avatar, centered, name + role + bio | Team members, testimonials |
| `split` | 50/50 grid — media left, text right (front only) | Portfolio, case studies |

## Animation Catalog

| `type` | Uses `direction` | Visual effect |
|---|---|---|
| `flip` | ✓ | 3D rotation on X or Y axis with perspective |
| `slide` | ✓ | Front translates out, back translates in from the opposite side |
| `fade` | — | Front fades out while back fades in |
| `zoomIn` | — | Back grows from 0.7× to 1× while front scales up to 1.3× and fades |
| `zoomOut` | — | Back shrinks from 1.3× to 1× while front scales to 0.7× and fades |
| `blur` | — | Front blurs (20 px) and fades as back un-blurs and fades in |

**Directions** (applies to `flip` + `slide`):

- `right` — rotateY(+180°) / translateX(+100% → 0)
- `left` — rotateY(-180°) / translateX(-100% → 0)
- `up` — rotateX(+180°) / translateY(+100% → 0)
- `down` — rotateX(-180°) / translateY(-100% → 0)

**Triggers**:

- `hover` — pure CSS, `:hover` + `:focus-within` on the outer `.tmd5_flipbox`
- `click` — JS toggles `.is-flipped` on `.tmd5_flipbox__inner`; back-button clicks are ignored so the CTA link works
- `auto` — JS `setInterval` toggles `.is-flipped`; paused on hover/focus for readability

## Layouts & Sizing

### Layout modes (`layout`)

| Value | Behavior |
|---|---|
| `content` | Default — media zone (if any) + subtitle + title + content + button stacked vertically |
| `textOnly` | Media zone hidden regardless of icon/image values |
| `mediaOnly` | Text zones hidden — front shows only the icon/image, centered, full size |
| `imageCover` | Image becomes a full-bleed background with a dark gradient overlay; subtitle/title/content overlay in white at the bottom |

### Sizing modes (`sizeMode`)

| Value | Behavior |
|---|---|
| `minHeight` | `min-height: <minHeight>` on inner — grows if content is taller (default) |
| `aspect` | `aspect-ratio: <aspectRatio>` — keeps grid consistency, ignores content overflow (content hidden if too tall) |
| `fixed` | `height: <fixedHeight>` — strict height, content clipped beyond |

All three values are CSS custom properties on `.tmd5_flipbox__inner` — you can override them in your own stylesheet.

## Accessibility

- **Reduced motion** — `@media (prefers-reduced-motion: reduce)` removes all transitions (`!important`) so the flip becomes instant
- **Keyboard** — on `trigger: click`, the inner gets `tabindex="0"` + `role="button"` + `aria-pressed="true|false"`; Enter and Space toggle the flip; focus ring via `:focus-visible`
- **Focus reveal** — on `trigger: hover`, `:focus-within` on outer container also reveals the back side (screen reader + tab users can read it without a mouse)
- **Back button** — clicks on the CTA button are excluded from the flip toggle so the link navigates normally
- **Semantic** — titles render as real heading elements (H1–H6 via `headingLevel`), not styled divs
- **Images** — `loading="lazy"` by default, `alt` passed through from the media library

## Recipes

| Use case | Settings |
|---|---|
| Feature card | `preset: badge, type: flip, direction: right` |
| Team profile | `preset: profile, type: fade, trigger: hover` |
| Stat highlight | `preset: stats, type: zoomIn, trigger: auto, autoInterval: 5s` |
| Image-text case study | `preset: split, type: slide, direction: right` |
| Image gallery card | `layout: imageCover, type: fade, trigger: hover` |
| Auto-rotating banner | `trigger: auto, type: slide, autoInterval: 4s` |
| Click-to-reveal detail | `trigger: click, type: flip, direction: up` |
| Minimal call-out | `preset: minimal, type: fade` |

## Architecture

```
zipoulou-flipbox-for-divi-5/
├── tangible-modules-for-divi5.php    # plugin entry + enqueues + autoloader
├── modules/
│   ├── Modules.php                   # register with divi_module_library_modules_dependency_tree
│   └── Flipbox/
│       ├── Flipbox.php               # main class (implements DependencyInterface)
│       └── FlipboxTrait/
│           ├── RenderCallbackTrait.php
│           ├── ModuleClassnamesTrait.php
│           ├── ModuleStylesTrait.php
│           ├── ModuleScriptDataTrait.php
│           └── CustomCssTrait.php
├── src/
│   ├── index.ts                      # VB entry — registerModule + icon registration
│   ├── frontend.ts                   # frontend runtime (click trigger, auto-flip interval)
│   ├── module-icons.ts               # Divi icon library filter
│   ├── icons/
│   │   ├── index.ts
│   │   └── module-flipbox/index.tsx  # SVG glyph
│   └── components/flipbox/
│       ├── module.json               # attribute schema (source of truth)
│       ├── module-default-render-attributes.json
│       ├── module-default-printed-style-attributes.json
│       ├── types.ts                  # TypeScript types
│       ├── edit.tsx                  # VB edit component
│       ├── styles.tsx                # VB style component
│       ├── module-classnames.ts
│       ├── module-script-data.tsx
│       ├── custom-css.ts
│       ├── placeholder-content.ts
│       ├── module.scss               # frontend + VB styles
│       ├── presets.scss              # 6 visual presets
│       └── style.scss                # VB-only overrides (stacked editing view)
├── webpack.config.js                 # two entries: bundle (VB) + frontend (runtime)
├── gulpfile.js                       # zip task for distribution
├── composer.json                     # PSR-4 autoload (optional, plugin ships with built-in autoloader)
├── deploy.sh                         # build + zip + scp to server + unzip
└── .env.example                      # template for deploy credentials
```

### Data flow

1. **Visual Builder** — user edits attributes → Divi stores them in `flipbox.innerContent`, `frontMedia.innerContent`, etc. following the schema in `module.json`
2. **Edit component** (`edit.tsx`) reads attributes via `getAttrByMode`, emits `data-tmd-*` data-attributes + CSS custom properties on `.tmd5_flipbox__inner`
3. **Front-end render** (`RenderCallbackTrait::render_callback`) mirrors the same logic server-side, emitting identical HTML so no FOUC
4. **SCSS** (`module.scss` + `presets.scss`) uses `[data-tmd-*]` attribute selectors + `var(--tmd-*)` custom properties to style every variant
5. **Frontend JS** (`frontend.ts`) attaches click/auto behaviors only when needed

## Development & Deployment

### Local workflow

```bash
npm run start     # webpack watch — rebuild on save
npm run build     # production build (minified)
npm run zip       # bundle into distributable zip (excludes src/, node_modules, configs)
```

Artifacts land in `scripts/`, `styles/`, `modules-json/` (all gitignored).

### Deploy script

Ships with a `deploy.sh` that uses PuTTY `plink` + `pscp` (Windows) to push to an SSH-accessible WordPress host:

1. Copy `.env.example` → `.env.local` (gitignored)
2. Fill in `O2_HOST`, `O2_PORT`, `O2_USER`, `O2_PASS`, `O2_PLUGIN_DIR`
3. Run `./deploy.sh` — it rebuilds, zips, uploads, unzips remotely
4. On shared hosts with OPcache, flush after deploy (`wp eval 'opcache_reset();'`)

For non-Windows environments, replace `plink`/`pscp` with `ssh`/`scp` (roughly same arguments).

## Roadmap

- **v0.8** — Glassmorphism preset, per-side background controls (independent gradients/images)
- **v0.8** — Multiple buttons on back side, line-clamp option for content truncation
- **v0.9** — Cube animation type (3D 90° rotation in sequence), pusher / door variants
- **v0.9** — Back-side icon / media slot
- **v1.0** — Divi library integration, loopable via WP_Query (show flipbox per post)

See [CHANGELOG.md](CHANGELOG.md) for full history.

## For AI Agents

A complete [SKILL.md](SKILL.md) is provided for AI coding agents (Claude Code, Cursor, etc.). It documents block markup, every attribute, containment rules, procedural workflow (WP-CLI + REST), recipes, and common pitfalls so an agent can programmatically add/edit/remove flipboxes without reading the full codebase.

## License

GPL-2.0-or-later — same as WordPress and Divi. See plugin header.

---

# 🇫🇷 Français

## Points forts

- **Block API native Divi 5** (React/TypeScript, zéro jQuery, zéro shortcode)
- **6 types d'animation** — flip 3D, slide, fade, zoom-in, zoom-out, blur
- **3 triggers** — hover, click (toggle + clavier), intervalle automatique
- **6 presets visuels** — classic, minimal, badge, stats, profile, split
- **4 modes de layout** — contenu standard / texte seul / media seul / image cover (background pleine face + overlay)
- **3 modes de taille** — hauteur minimum, ratio d'aspect, hauteur fixe
- **Responsive par device** — la plupart des attributs ont variantes desktop / tablette / mobile
- **A11y complète** — `prefers-reduced-motion`, activation clavier, `aria-pressed`, `role="button"`, outline focus-visible
- **Performance** — compositing GPU uniquement pendant l'interaction, images en `loading="lazy"`, zéro runtime sur les pages sans flipbox
- **Aucune dépendance externe** — animations CSS pures, JS vanilla minimal (~1 Ko) uniquement pour triggers click/auto

## Installation (FR)

### Depuis un zip (recommandé)

1. Télécharger le zip depuis [GitHub Releases](https://github.com/zipoulou/zipoulou-flipbox-for-divi-5/releases) ou lancer `npm run zip` localement depuis un clone
2. **WP Admin → Extensions → Ajouter → Téléverser une extension**, choisir le zip, Installer maintenant
3. Activer dans **Extensions → Extensions installées**
4. Nécessite le thème **Divi 5.0+** actif (le plugin ne fait rien silencieusement sur Divi 4)

### Depuis les sources (dev / contributions)

```bash
git clone https://github.com/zipoulou/zipoulou-flipbox-for-divi-5.git
cd zipoulou-flipbox-for-divi-5
npm install
npm run build
```

Ensuite symlink ou copier le dossier résultant dans `wp-content/plugins/` de ton WordPress.

## Démarrage rapide

Dans le Visual Builder Divi 5 :

1. Ouvrir une page, cliquer **Insérer un module** dans une colonne
2. Rechercher **Zipoulou FlipBox** et l'insérer
3. Configurer via le panneau **Contenu** :
   - **Flipbox Settings** (preset, type d'animation, direction, trigger, durée, layout, taille)
   - **Front Icon / Image** (toggle icône/image + sélection de l'asset)
   - **Front Side** (sous-titre, titre, corps)
   - **Back Side** (sous-titre, titre, corps)
   - **Back Button** (texte, URL, ouverture nouvel onglet)
4. Affiner via le panneau **Design** (typographie, couleurs, bordures, ombre, espacements) et **Avancé** (CSS custom, visibilité).

## Référence complète des attributs

Voir les tableaux complets dans la section anglaise ci-dessus — les noms techniques des attributs sont identiques (anglais) dans le code, seuls les labels du panneau VB sont traduisibles.

**Résumé** :

- **Flipbox Settings** : `preset`, `trigger`, `type`, `direction`, `duration`, `autoInterval`, `layout`, `sizeMode`, `aspectRatio`, `minHeight`, `fixedHeight`
- **Front Icon / Image** : `useIcon`, `icon`, `src`, `color`, `fit`
- **Textes Front / Back** : `*.innerContent` (plain ou rich text), `*.decoration.font` (police Divi complète)
- **Back Button** : `text`, `url`, `target`
- **Module** : `link`, `text`, `htmlAttributes`, `background`, `sizing`, `spacing`, `border`, `boxShadow`, `filters`, `transform`, `animation`, `overflow`, `disabledOn`, `transition`, `position`, `zIndex`, `scroll`, `sticky`

## Presets visuels

Chaque preset est un pack CSS curé (backgrounds, typographie, forme de l'icône, espacements). Le preset ne bloque rien — on peut toujours surcharger chaque champ via le panneau Design.

| Preset | Style | Idéal pour |
|---|---|---|
| `classic` | Icône en haut à gauche, titre, contenu, bouton en bas, alignement gauche | Cartes features, liste de services |
| `minimal` | Pas de media, centré, bordures fines, typographie raffinée | Encadrés, points clés, éditorial |
| `badge` | Icône dans carré arrondi coloré + liseré accent à gauche | Features SaaS, plans tarifaires |
| `stats` | Grand chiffre dégradé en "titre", kicker en sous-titre, centré | KPIs, métriques d'impact, compteurs |
| `profile` | Avatar circulaire 120 px, centré, nom + rôle + bio | Équipe, témoignages |
| `split` | Grille 50/50 — media à gauche, texte à droite (face avant uniquement) | Portfolio, études de cas |

## Catalogue d'animations

| `type` | Utilise `direction` | Effet visuel |
|---|---|---|
| `flip` | ✓ | Rotation 3D sur axe X ou Y avec perspective |
| `slide` | ✓ | Le front sort, le back entre du côté opposé |
| `fade` | — | Le front fade out pendant que le back fade in |
| `zoomIn` | — | Le back grossit de 0.7× à 1×, le front monte à 1.3× et fade |
| `zoomOut` | — | Le back rétrécit de 1.3× à 1×, le front réduit à 0.7× et fade |
| `blur` | — | Le front se floute (20 px) et fade tandis que le back se dévoile |

**Directions** (s'applique à `flip` + `slide`) :

- `right` — rotateY(+180°) / translateX(+100% → 0)
- `left` — rotateY(-180°) / translateX(-100% → 0)
- `up` — rotateX(+180°) / translateY(+100% → 0)
- `down` — rotateX(-180°) / translateY(-100% → 0)

**Triggers** :

- `hover` — CSS pur, `:hover` + `:focus-within` sur `.tmd5_flipbox`
- `click` — JS bascule `.is-flipped` sur `.tmd5_flipbox__inner` ; les clics sur le bouton back sont ignorés pour que le lien CTA fonctionne
- `auto` — JS `setInterval` bascule `.is-flipped` ; mis en pause sur hover/focus pour laisser le temps de lire

## Layouts & tailles

### Modes de layout (`layout`)

| Valeur | Comportement |
|---|---|
| `content` | Défaut — zone media (si définie) + sous-titre + titre + contenu + bouton empilés verticalement |
| `textOnly` | Zone media cachée même si l'icône ou l'image est définie |
| `mediaOnly` | Zones de texte cachées — le front affiche uniquement l'icône/image, centrée, pleine taille |
| `imageCover` | L'image devient background pleine face avec gradient overlay sombre ; sous-titre/titre/contenu en overlay blanc en bas |

### Modes de taille (`sizeMode`)

| Valeur | Comportement |
|---|---|
| `minHeight` | `min-height: <minHeight>` sur l'inner — grandit si le contenu est plus haut (défaut) |
| `aspect` | `aspect-ratio: <aspectRatio>` — grille régulière, ignore l'overflow (contenu caché si trop long) |
| `fixed` | `height: <fixedHeight>` — hauteur stricte, contenu clippé |

Les trois valeurs sont des CSS custom properties sur `.tmd5_flipbox__inner` — on peut les surcharger dans sa propre feuille de style.

## Accessibilité

- **Reduced motion** — `@media (prefers-reduced-motion: reduce)` désactive toutes les transitions (`!important`), le flip devient instantané
- **Clavier** — sur `trigger: click`, l'inner reçoit `tabindex="0"` + `role="button"` + `aria-pressed="true|false"` ; Enter et Espace basculent le flip ; focus ring via `:focus-visible`
- **Révélation au focus** — sur `trigger: hover`, `:focus-within` sur le conteneur externe révèle aussi la face arrière (utilisateurs lecteur d'écran + tab)
- **Bouton back** — les clics sur le CTA sont exclus du toggle pour que le lien navigue normalement
- **Sémantique** — les titres rendent en vrais éléments de heading (H1–H6 via `headingLevel`), pas en div stylées
- **Images** — `loading="lazy"` par défaut, `alt` hérité de la bibliothèque média

## Recettes

| Cas d'usage | Configuration |
|---|---|
| Card feature | `preset: badge, type: flip, direction: right` |
| Profil équipe | `preset: profile, type: fade, trigger: hover` |
| Statistique mise en avant | `preset: stats, type: zoomIn, trigger: auto, autoInterval: 5s` |
| Étude de cas image + texte | `preset: split, type: slide, direction: right` |
| Card galerie image | `layout: imageCover, type: fade, trigger: hover` |
| Bannière auto-rotative | `trigger: auto, type: slide, autoInterval: 4s` |
| Détail révélé au clic | `trigger: click, type: flip, direction: up` |
| Encadré minimal | `preset: minimal, type: fade` |

## Architecture (FR)

Structure du repo identique à la [section anglaise](#architecture). Résumé du flux de données :

1. **Visual Builder** — l'utilisateur édite les attributs → Divi les stocke dans `flipbox.innerContent`, `frontMedia.innerContent`, etc. selon le schéma de `module.json`
2. **Composant d'édition** (`edit.tsx`) lit les attributs via `getAttrByMode`, émet des attributs `data-tmd-*` + CSS custom properties sur `.tmd5_flipbox__inner`
3. **Rendu front-end** (`RenderCallbackTrait::render_callback`) réplique la logique côté serveur et émet le même HTML (pas de FOUC)
4. **SCSS** (`module.scss` + `presets.scss`) utilise des sélecteurs `[data-tmd-*]` + `var(--tmd-*)` pour styler chaque variante
5. **JS front-end** (`frontend.ts`) attache les comportements click/auto uniquement quand nécessaire

## Développement & déploiement

### Workflow local

```bash
npm run start     # webpack watch — rebuild au save
npm run build     # build production (minifié)
npm run zip       # package en zip distribuable (exclut src/, node_modules, configs)
```

Artefacts dans `scripts/`, `styles/`, `modules-json/` (tous gitignorés).

### Script de deploy

Livré avec un `deploy.sh` qui utilise PuTTY `plink` + `pscp` (Windows) pour pusher vers un WordPress accessible via SSH :

1. Copier `.env.example` → `.env.local` (gitignoré)
2. Renseigner `O2_HOST`, `O2_PORT`, `O2_USER`, `O2_PASS`, `O2_PLUGIN_DIR`
3. Lancer `./deploy.sh` — rebuild + zip + upload + décompression distante
4. Sur hébergements avec OPcache, vider après déploiement (`wp eval 'opcache_reset();'`)

Sur environnement non-Windows, remplacer `plink`/`pscp` par `ssh`/`scp` (arguments similaires).

## Feuille de route

- **v0.8** — Preset glassmorphism, contrôles background par face (dégradés/images indépendants)
- **v0.8** — Plusieurs boutons sur face arrière, option line-clamp pour troncature
- **v0.9** — Animation cube (3D 90° en séquence), variantes pusher / door
- **v0.9** — Slot icône / média sur face arrière
- **v1.0** — Intégration Divi Library, loop via WP_Query (un flipbox par post)

Voir [CHANGELOG.md](CHANGELOG.md) pour l'historique complet.

## Pour les agents IA

Un fichier [SKILL.md](SKILL.md) complet est fourni pour les agents de code IA (Claude Code, Cursor, etc.). Il documente le block markup, chaque attribut, les règles d'imbrication, le workflow procédural (WP-CLI + REST), les recettes, et les pièges fréquents — un agent peut ajouter/modifier/supprimer des flipbox par programmation sans lire tout le codebase.

## Licence

GPL-2.0-or-later — même licence que WordPress et Divi. Voir le header du plugin.
