---
name: zipoulou-flipbox-divi5
description: Use this skill when an AI agent needs to insert, configure, edit, or delete a Zipoulou FlipBox module inside a WordPress page built with Divi 5 — programmatically via WP-CLI, REST API, or direct post_content manipulation. Covers the Gutenberg-style block markup, every attribute (6 presets, 6 animation types, 3 triggers, 4 layouts, 3 sizing modes), containment rules, responsive variants, common recipes, and pitfalls. Trigger this skill when the user asks to add/edit/remove a flipbox on a Divi 5 WordPress site, or generate flipbox content from data.
---

# Zipoulou FlipBox for Divi 5 — AI Agent Skill

This skill documents how an autonomous agent should insert, configure, and maintain Zipoulou FlipBox blocks on a WordPress site that runs the Divi 5 theme.

Repository: https://github.com/zipoulou/zipoulou-flipbox-for-divi-5

---

## 1. Prerequisites (verify before any block operation)

```bash
# Divi 5.x theme must be active
wp theme list --status=active --field=name   # → "Divi"
wp theme get Divi --field=version             # → 5.x.x

# Plugin must be installed and active
wp plugin list --name=tangible-modules-for-divi5 --field=status   # → "active"

# Block must be registered
wp eval 'echo in_array("tangible/flipbox", array_keys(WP_Block_Type_Registry::get_instance()->get_all_registered())) ? "ok" : "missing";'
```

If any check fails, stop and report — do not attempt to insert the block.

Note: The plugin's folder is `tangible-modules-for-divi5` and the block slug is `tangible/flipbox` (legacy internal names kept for backward compatibility with existing saved content). The user-facing display name is "Zipoulou FlipBox for Divi 5".

---

## 2. Post metadata requirements

For Divi 5 to render the block on the front-end, the target post must have:

```bash
wp post meta update <POST_ID> _et_pb_use_builder on
wp post meta update <POST_ID> _et_pb_built_for_post_type page   # or post, product, etc.
```

The post content must be wrapped in the Divi placeholder and standard structure:

```html
<!-- wp:divi/placeholder -->
<!-- wp:divi/section {"builderVersion":"5.2.0"} -->
<!-- wp:divi/row {"builderVersion":"5.2.0"} -->
<!-- wp:divi/column {"builderVersion":"5.2.0"} -->
  <!-- wp:tangible/flipbox {...attrs...} /-->
<!-- /wp:divi/column -->
<!-- /wp:divi/row -->
<!-- /wp:divi/section -->
<!-- /wp:divi/placeholder -->
```

A bare flipbox at post_content root will not render.

---

## 3. Block markup — canonical template

The flipbox is a **self-closing block** — `<!-- wp:tangible/flipbox {...} /-->` with a trailing `/`. All content lives in attributes, never as block children.

Full-featured example (expand attrs you need, drop the rest):

```html
<!-- wp:tangible/flipbox {"flipbox":{"innerContent":{"desktop":{"value":{"trigger":"hover","type":"flip","direction":"right","duration":"600ms","autoInterval":"4s","preset":"classic","layout":"content","sizeMode":"minHeight","aspectRatio":"4/3","minHeight":"320px","fixedHeight":"320px"}}}},"frontMedia":{"innerContent":{"desktop":{"value":{"useIcon":"on","icon":"\u0026#x21;||divi||400"}}},"advanced":{"fit":{"desktop":{"value":"cover"}}}},"frontSubtitle":{"innerContent":{"desktop":{"value":"HOVER ME"}}},"frontTitle":{"innerContent":{"desktop":{"value":"Front title"}}},"frontContent":{"innerContent":{"desktop":{"value":"\u003cp\u003eFront body text.\u003c/p\u003e"}}},"backSubtitle":{"innerContent":{"desktop":{"value":"LEARN MORE"}}},"backTitle":{"innerContent":{"desktop":{"value":"Back title"}}},"backContent":{"innerContent":{"desktop":{"value":"\u003cp\u003eBack body text.\u003c/p\u003e"}}},"backButton":{"innerContent":{"desktop":{"value":{"text":"Learn more","url":"https://example.com","target":"off"}}}},"builderVersion":"5.2.0"} /-->
```

All attributes are optional. Defaults are applied both server-side (PHP render) and in the VB (edit component) when an attribute is missing.

---

## 4. Attribute reference

### 4.1 `flipbox.innerContent` — behavior & appearance

| subName | Values | Default | Purpose |
|---|---|---|---|
| `preset` | `classic` \| `minimal` \| `badge` \| `stats` \| `profile` \| `split` \| `gallery` \| `showcase` | `classic` | Curated visual bundle (backgrounds, typography, icon shape) |
| `trigger` | `hover` \| `click` \| `auto` | `hover` | How the flip is triggered |
| `type` | `flip` \| `slide` \| `fade` \| `zoomIn` \| `zoomOut` \| `blur` | `flip` | Animation style |
| `direction` | `right` \| `left` \| `up` \| `down` | `right` | Applies only to `flip` and `slide` |
| `duration` | CSS time (`100ms`-`2000ms`) | `600ms` | Animation duration |
| `autoInterval` | CSS time (`1s`-`20s`) | `4s` | Pause between auto flips — applies only when `trigger=auto` |
| `layout` | `content` \| `textOnly` \| `mediaOnly` \| `imageCover` | `content` | Front-side structural layout |
| `sizeMode` | `minHeight` \| `aspect` \| `fixed` | `minHeight` | How the tile height is determined |
| `aspectRatio` | `1/1` \| `10/11` \| `4/3` \| `3/2` \| `16/9` \| `2/1` | `4/3` | Applies only when `sizeMode=aspect` |
| `minHeight` | CSS length (px) | `320px` | Applies only when `sizeMode=minHeight` |
| `fixedHeight` | CSS length (px) | `320px` | Applies only when `sizeMode=fixed` |

### 4.2 `frontMedia.innerContent` — icon or image on front

```json
"frontMedia":{"innerContent":{"desktop":{"value":{
  "useIcon":"on",                                  // "on" = icon, "off" = image
  "icon":"\u0026#x21;||divi||400",                 // Divi icon: "&#xHEX;||family||weight" — escape & as \u0026 in JSON
  "src":"https://site.com/wp-content/uploads/photo.jpg",
  "id":42,                                         // WP attachment ID (optional but useful)
  "alt":"Accessible description",
  "titleText":"Image title"
}}}}
```

### 4.3 `frontMedia.advanced` — front media styling

| subName | Values | Default |
|---|---|---|
| `color` | hex / rgba | — (only affects icon) |
| `fit` | `cover` \| `contain` | `cover` (only affects image) |

### 4.4 Text attributes — subtitle / title / content (front + back)

```json
"frontSubtitle":{"innerContent":{"desktop":{"value":"KICKER"}}},
"frontTitle":{"innerContent":{"desktop":{"value":"Plain text heading"}}},
"frontContent":{"innerContent":{"desktop":{"value":"\u003cp\u003eHTML-escaped rich text\u003c/p\u003e"}}}
```

- `*Subtitle` and `*Title` → plain text (render as H4 / H3 by default, heading level configurable via Design panel)
- `*Content` → rich text (HTML must be Unicode-escaped in JSON: `<p>` → `\u003cp\u003e`, `</p>` → `\u003c/p\u003e`)

Same shape for `backSubtitle`, `backTitle`, `backContent`.

### 4.5 `backButton.innerContent.desktop.value`

```json
{
  "text": "Learn more",                 // empty string = no button rendered
  "url":  "https://example.com",
  "target": "off"                        // "on" = opens in new tab with rel="noopener noreferrer"
}
```

### 4.6 Responsive variants

Any `innerContent` can have per-device values. Tablet / phone fall back to desktop if not set.

```json
"frontSubtitle":{"innerContent":{
  "desktop":{"value":"Desktop copy"},
  "tablet": {"value":"Tablet copy"},
  "phone":  {"value":"Mobile copy"}
}}
```

### 4.7 Design panel attributes (optional, affect visual tuning)

Each element (`frontTitle`, `backTitle`, etc.) accepts a `decoration` sub-object with standard Divi style groups:

```json
"frontTitle":{
  "innerContent":{"desktop":{"value":"Title"}},
  "decoration":{
    "font":{"font":{"desktop":{"value":{
      "headingLevel":"h2",
      "family":"Montserrat",
      "weight":"700",
      "size":"28px",
      "color":"#1A365D",
      "lineHeight":"1.2em",
      "letterSpacing":"0.02em",
      "textAlign":"center"
    }}}}
  }
}
```

Module-level (`module.decoration` / `module.advanced`) supports the full Divi standard set: `background`, `sizing`, `spacing`, `border`, `boxShadow`, `filters`, `transform`, `animation`, `overflow`, `disabledOn`, `transition`, `position`, `zIndex`, `scroll`, `sticky`, plus `link`, `text`, `htmlAttributes`.

---

## 5. Recipes (copy-paste starting points)

### Feature card (default)
```json
{"preset":"classic","type":"flip","direction":"right","trigger":"hover"}
```

### Call-out with minimal typography
```json
{"preset":"minimal","type":"fade"}
```
No media needed — just set `frontTitle`, `frontContent`, `backTitle`, `backContent`.

### SaaS feature tile
```json
{"preset":"badge","type":"flip","direction":"up"}
```
Icon lands in a colored rounded square automatically.

### Big stat / KPI
```json
{"preset":"stats","type":"zoomIn"}
```
Put the number in `frontTitle.innerContent` (e.g. `"98%"`), the label in `frontSubtitle` (e.g. `"CONVERSION RATE"`).

### Team member profile
```json
{"preset":"profile","type":"fade","trigger":"hover"}
```
Supply `frontMedia.innerContent.desktop.value.src` with the person's photo — becomes a 120 px circle.

### Portfolio / case study
```json
{"preset":"split","type":"slide","direction":"right"}
```
Requires image in `frontMedia.src` (fills left half of the front).

### Gallery card with overlay
```json
{"layout":"imageCover","type":"fade","sizeMode":"aspect","aspectRatio":"16/9","trigger":"hover"}
```
Image becomes full-bleed background with dark gradient overlay; text in white at the bottom.

### Product card with caption — image top + title + hint caption, emoji back (Showcase preset)
```json
{
  "preset":"showcase",
  "layout":"content",
  "sizeMode":"minHeight",
  "minHeight":"440px",
  "type":"flip",
  "direction":"right",
  "duration":"800ms"
}
```
Pair with `frontMedia.innerContent.desktop.value.src` for the image, `frontTitle` for the product name (auto-styled in Contrail One italic blue centered), `frontContent` for a hint like "Survolez ou touchez" (auto-styled small uppercase gray). Back uses the same avatar chip style as `gallery` — set `backSubtitle` to an emoji, `backTitle` + `backContent` for name + description. Card is white with rounded corners and soft shadow (provided by `module.decoration` border-radius + boxShadow).

### Product gallery — image front, emoji avatar + description back (Gallery preset)
```json
{
  "preset":"gallery",
  "layout":"mediaOnly",
  "sizeMode":"aspect",
  "aspectRatio":"10/11",
  "type":"flip",
  "direction":"right",
  "duration":"800ms"
}
```
Pair with `frontMedia.innerContent.desktop.value.src` for the image, `backSubtitle` for the emoji (becomes a 62 px circular chip), `backTitle` + `backContent` for the product name and description. Designed for 3-column product rows; dark red (#7a2222) back matches brand card patterns.

### Auto-rotating banner
```json
{"trigger":"auto","type":"slide","direction":"right","autoInterval":"5s","sizeMode":"aspect","aspectRatio":"16/9"}
```

### Click-to-reveal detail (FAQ, spoiler)
```json
{"trigger":"click","type":"flip","direction":"up"}
```
Auto-injects `role="button"`, `tabindex="0"`, `aria-pressed` — fully keyboard accessible.

---

## 6. Procedural workflow for an agent

When asked "add a flipbox to page X":

1. **Verify prerequisites** (section 1). Fail fast if anything missing.
2. **Collect inputs** from the user or task context:
   - target post ID or slug
   - front: at least a title; optionally subtitle, content, icon/image
   - back: at least a title and content; optionally subtitle and button (text + URL)
   - visual preset (infer from context if not stated, e.g. "team page" → `profile`, "stats section" → `stats`)
3. **Fetch current post content**:
   ```bash
   wp post get <POST_ID> --field=post_content > /tmp/current.html
   ```
4. **Determine insertion point**:
   - If the post already has `<!-- wp:divi/placeholder -->` structure, insert the flipbox inside an existing `divi/column`, or add a new section+row+column
   - If the post is empty or non-Divi, create the full wrapper (placeholder → section → row → column → flipbox)
5. **Craft the block markup** using template section 3, filling in only the attributes the user asked for (don't over-specify)
6. **Update the post**:
   ```bash
   wp post update <POST_ID> --post_content="$(cat /tmp/current.html)"
   ```
7. **Ensure Divi meta is set** (section 2) if not already
8. **Flush caches if on a production host**:
   ```bash
   wp eval 'opcache_reset();' 2>/dev/null; wp cache flush
   ```
9. **Verify the render** by GETting the post's public URL and grepping for `.tmd5_flipbox`:
   ```bash
   POST_URL=$(wp post get <POST_ID> --field=url)
   curl -s "$POST_URL" | grep -c tmd5_flipbox   # → ≥ 1 means rendered
   ```

For batch generation (e.g. "create team profiles from CSV"):
- Loop over rows, generate one `<!-- wp:tangible/flipbox ... /-->` per row
- Wrap N flipboxes inside a single row (or multiple rows of 2-4 columns) for a grid layout
- Use `flexColumnStructure` on the `divi/row` to control column count

---

## 7. Editing and deletion

### Edit an existing flipbox

1. `wp post get <POST_ID> --field=post_content` → parse
2. Find the `<!-- wp:tangible/flipbox {JSON} /-->` line(s)
3. Parse the JSON, mutate, re-serialize (preserve the trailing `/-->`)
4. `wp post update <POST_ID> --post_content="<new content>"`
5. Flush caches

### Delete a flipbox

Remove the entire `<!-- wp:tangible/flipbox {...} /-->` line from post_content. If the column becomes empty and wasn't desired, remove the wrapping `divi/column` as well.

### List all pages containing a flipbox

```bash
wp post list --post_type=page --fields=ID,post_title --s='tangible/flipbox'
wp post list --post_type=post --fields=ID,post_title --s='tangible/flipbox'
```

---

## 8. Pitfalls

| Pitfall | Symptom | Fix |
|---|---|---|
| Block not self-closing (`--><!-- /wp:... -->` instead of `/-->`) | Block renders empty or breaks parser | Use trailing `/-->` |
| Unescaped HTML in richtext JSON | Invalid JSON, post_update fails | Escape `<` as `\u003c`, `>` as `\u003e`, `&` as `\u0026` |
| Flipbox outside `divi/column` | Nothing renders | Always nest inside placeholder > section > row > column |
| Missing `_et_pb_use_builder` meta | Divi treats post as classic WordPress, blocks not processed | Set meta (section 2) |
| OPcache serving old plugin PHP | New attributes not recognized | `wp eval 'opcache_reset();'` after plugin updates |
| Hover trigger + auto trigger combined | Only `trigger` value wins (it's a single select) | Pick one |
| `direction` with `fade`/`zoomIn`/`zoomOut`/`blur` type | Direction silently ignored | No action needed; direction only affects `flip` and `slide` |
| Adding flipbox to a Divi 4 shortcode page | Renders as `[et_pb_...]` not recognized | Page must be migrated to Divi 5 blocks first |
| Icon with unescaped `&` in JSON | JSON parse error | Use `\u0026#xHEX;||divi||400` |
| Image URL on a different domain | Image loads but may be blocked by CORS/CSP | Prefer media-library-hosted images with `id` set |

---

## 9. Commonly used icon codes (Divi icon library)

Format: `&#xHEX;||divi||400` (escape `&` as `\u0026` in JSON strings).

Some often-needed glyphs:

| Hex | Meaning |
|---|---|
| `&#x21;` | Exclamation / check |
| `&#xe08a;` | Cog / settings |
| `&#xe0e9;` | Info / help |
| `&#xe0a4;` | Star |
| `&#xe027;` | Rocket |
| `&#xe0c0;` | Heart |
| `&#xe023;` | Phone |
| `&#xe02e;` | Email |

For the full set, open the Divi icon picker in the Visual Builder — each icon has a hex code visible in its JSON representation.

---

## 10. REST API alternative

If WP-CLI is not available:

```bash
# Update page content via REST
curl -X POST "https://<SITE>/wp-json/wp/v2/pages/<POST_ID>" \
  -H "Authorization: Basic <base64 user:app-password>" \
  -H "Content-Type: application/json" \
  -d '{"content":"<!-- wp:tangible/flipbox {...} /-->"}'
```

Requires an Application Password (WP admin → Users → Profile → Application Passwords), not the user's login password.

---

## 11. Server-side files (when plugin installed)

```
wp-content/plugins/tangible-modules-for-divi5/
├── tangible-modules-for-divi5.php   # plugin header + enqueues
├── modules/Flipbox/                  # PHP render + traits
├── modules-json/flipbox/             # block metadata (module.json, defaults)
├── scripts/
│   ├── bundle.js                     # VB React bundle
│   └── frontend.js                   # click/auto runtime
└── styles/
    ├── bundle.css                    # frontend styles
    └── vb-bundle.css                 # VB-only styles
```

If any file is missing after install, re-upload or `wp plugin install` again.

---

## 12. When NOT to use this skill

- The WordPress site uses Divi 4 (shortcode API) — this block won't render
- The page uses Gutenberg without Divi — block is registered but won't have the Divi module library context
- The user wants a different flipbox library — direct them there instead of shoehorning this one

---

## 13. Further reading

- README: https://github.com/zipoulou/zipoulou-flipbox-for-divi-5#readme
- CHANGELOG: https://github.com/zipoulou/zipoulou-flipbox-for-divi-5/blob/main/CHANGELOG.md
- Divi 5 dev docs: https://dev.elegantthemes.com/
