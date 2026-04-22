# Rapport — Zipoulou FlipBox v0.7.7

**Date** : 2026-04-22
**Cible** : https://portfolio.nicolasgalzy.fr/maison-valette/
**Branche** : `claude/charming-curran-e933b6`
**Session** : correctifs mobile (stacking + tactile)

---

## Problèmes signalés

1. **Rendu mobile cassé** — sur iPhone, les 3 flipbox (Cassoulet / Truffe / Foie gras) s'affichent côte à côte dans des colonnes de ~90 px de large au lieu de s'empiler verticalement.
2. **Flip tactile buggé** — sur mobile, la carte se retourne au premier tap mais ne revient pas à son état initial (bug « sticky :hover »).

---

## Diagnostic (via `dev-browser` en viewport iPhone 390×844)

### Problème 1 — colonnes qui ne stackent pas

Les colonnes Divi portent bien la classe `et_flex_column_24_24_phone` (= largeur 100 % sur phone) et la media query `@media (max-width: 767px)` matche bien à 390 px. **Mais** la largeur calculée reste `90 px` par colonne.

Cause racine confirmée par test dans le navigateur :

- Le row Divi (`.et_pb_row.et_flex_row`) reste en `flex-direction: row` à tous les breakpoints pour cette page.
- Les colonnes ont `flex: 0 1 auto` et toutes trois veulent 100 % de largeur.
- `flex-shrink: 1` les compresse donc à 1/3 chacune = `~90 px` dans le row de 303 px.

Ajouter `width: 100% !important` sur les colonnes seul **ne suffit pas** — il faut aussi basculer le row en `flex-direction: column` pour déclencher l'empilement vertical.

### Problème 2 — hover tactile sticky

Le CSS du module avait deux règles qui font flipper la carte :
```css
.tmd5_flipbox:hover .tmd5_flipbox__inner[data-tmd-trigger='hover']
.tmd5_flipbox:focus-within .tmd5_flipbox__inner[data-tmd-trigger='hover']
```

Sur mobile, un tap active `:hover` (parce que Safari iOS simule un hover au premier contact). La carte se retourne. Mais pour « dé-hoverer », il faut taper **ailleurs** sur la page — les utilisateurs s'attendent à taper la carte pour revenir, ce qui ne marche pas.

---

## Correctifs appliqués (v0.7.7)

### Fichier : `src/components/flipbox/module.scss`

**1. Mixin `tmd-flipped` — garde `@media (hover: hover) and (pointer: fine)`**

Avant :
```scss
.tmd5_flipbox:hover .tmd5_flipbox__inner[data-tmd-trigger='hover']...,
.tmd5_flipbox:focus-within .tmd5_flipbox__inner[data-tmd-trigger='hover']...,
.tmd5_flipbox__inner[data-tmd-trigger='click'].is-flipped,
.tmd5_flipbox__inner[data-tmd-trigger='auto'].is-flipped { @content; }
```

Après :
```scss
// Runtime class — trigger-agnostic (cover click/auto/touch-fallback-on-hover)
.tmd5_flipbox__inner[data-tmd-type='X'].is-flipped { @content; }

// Pure CSS hover — uniquement sur appareils avec vrai hover
@media (hover: hover) and (pointer: fine) {
  .tmd5_flipbox:hover .tmd5_flipbox__inner[data-tmd-trigger='hover']...,
  .tmd5_flipbox:focus-within ... { @content; }
}
```

Effet :
- Desktop : comportement hover identique (CSS pur, zéro JS)
- Tactile : la règle `:hover` n'est plus jamais active, donc plus de « sticky »
- Le runtime `.is-flipped` ajoutée en JS fonctionne maintenant même sur un flipbox dont `data-tmd-trigger='hover'`

**2. Nouvelle règle de stacking mobile (fin de fichier)**

```scss
@media (max-width: 767px) {
  .et_pb_row:has(> .et_pb_column > .tmd5_flipbox) {
    flex-direction: column !important;
  }
  .et_pb_row:has(> .et_pb_column > .tmd5_flipbox) > .et_pb_column {
    width: 100% !important;
  }
}
```

Effet :
- Tout row Divi 5 qui contient au moins un flipbox voit ses colonnes empilées verticalement <768 px, quelle que soit la config page.
- Utilise `:has()` (scope limité : un flipbox est nécessaire pour déclencher la règle — pas d'impact sur les autres rows du site).
- `:has()` est supporté depuis Safari 15.4, Chrome 105, Firefox 121. Sur un navigateur plus ancien la règle est ignorée silencieusement (pas de régression).

### Fichier : `src/frontend.ts`

Ajout d'une détection tactile et fallback click auto sur les flipbox en trigger hover :

```ts
function isTouchOnly(): boolean {
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

function initFlipbox(el) {
  const trigger = el.getAttribute('data-tmd-trigger') ?? 'hover';
  if (trigger === 'click') initClick(el);
  if (trigger === 'auto')  initAuto(el);
  if (trigger === 'hover' && isTouchOnly()) initClick(el);  // ← nouveau
}
```

Effet :
- Sur un iPhone / Android / tablette tactile pure, un tap sur une flipbox en hover-trigger toggle `.is-flipped` → retourne la carte (gestion clavier `Enter`/`Space` + `role="button"` + `aria-pressed` incluse via `initClick`).
- Sur un PC avec écran tactile ET souris, matchMedia renvoie `hover: hover` (l'input primaire étant la souris) → comportement hover pur, aucun JS ajouté.

---

## Classes / sélecteurs CSS touchés

| Classe / sélecteur | Status | Impact |
|---|---|---|
| `.tmd5_flipbox` | inchangé | — |
| `.tmd5_flipbox__inner` | inchangé | — |
| `.tmd5_flipbox:hover` | **gardé sous `@media (hover: hover) and (pointer: fine)`** | N'agit plus sur mobile tactile |
| `.tmd5_flipbox__inner.is-flipped` | **élargi** : match tout trigger (était limité à click/auto) | Permet le fallback tactile sans CSS extra |
| `.et_pb_row:has(> .et_pb_column > .tmd5_flipbox)` | **nouveau** (phone only) | Force `flex-direction: column` |
| `.et_pb_row:has(...) > .et_pb_column` | **nouveau** (phone only) | Force `width: 100%` |

Aucune classe Divi n'a été renommée. Les nouvelles règles ciblent Divi via `.et_pb_row` / `.et_pb_column` sous la contrainte `:has(... .tmd5_flipbox)` — l'impact est borné au périmètre du module.

---

## Tests réalisés

**Outil** : `dev-browser --connect http://localhost:9222` (Chrome lancé en mode debug)
**Viewport émulé** : 390 × 844 (iPhone 14 Pro)
**URL testée** : https://portfolio.nicolasgalzy.fr/maison-valette/

### Avant correctif (capture `maison-iphone-before.png`)
- Row width : 303 px, 3 colonnes de 90 px côte à côte
- Textes tronqués sur 3 lignes par carte
- Flip : premier tap fonctionne, tap suivant sur la même carte n'inverse pas

### Après correctif (capture `after-stack.png`)
- Row width : 303 px, 3 colonnes de 303 px empilées verticalement (`flex-direction: column` appliqué)
- Chaque carte occupe toute la largeur
- Flip : un tap retourne, un second tap revient (via `.is-flipped` toggle)

---

## Déploiement

Déployé sur `portfolio.nicolasgalzy.fr` via `./deploy.sh` :
- `npm run build` → bundles webpack dans `scripts/` + styles compilés dans `styles/`
- `npm run zip` → archive
- `pscp` upload sur o2switch `sc1garo0613.universe.wf`
- `plink` unzip sur `/home/sc1garo0613/portfolio.nicolasgalzy.fr/wp-content/plugins/tangible-modules-for-divi5/`

---

## Ce qui N'A PAS été touché

- La configuration de la page Divi `maison-valette` (pas d'accès WP admin depuis cette session). Le correctif module rend l'affichage correct sans que l'utilisateur ait à modifier la page.
- Le code PHP de rendu serveur (`modules/Flipbox/Flipbox.php`, `FlipboxTrait/*`).
- Les 8 presets visuels (`presets.scss`).
- Les defaults de module (`module-default-render-attributes.json`).

---

## Reste à faire / recommandations

1. **Vérifier sur d'autres pages** utilisant le module (au-delà de `maison-valette`) que le stacking mobile et le tap fonctionnent. Candidates : toute page du portfolio où un row contient plusieurs flipbox.
2. **Option config page (facultatif)** — dans le Visual Builder Divi, tu peux aussi configurer le row pour qu'il stack nativement : Row settings → Design → Sizing → chercher l'option de stacking columns on phone. Le correctif module rend cette étape optionnelle.
3. **Sur navigateur ancien** (Safari <15.4, Chrome <105), `:has()` n'existe pas → le stacking ne se déclenche pas. Pour couvrir aussi ces navigateurs, il faudrait émettre un attribut de marqueur PHP côté row (plus lourd) ; à voir selon tes stats analytics.
