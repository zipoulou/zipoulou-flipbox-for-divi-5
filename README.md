<div align="center">

# Zipoulou FlipBox for Divi 5

**A powerful, accessible, responsive flipbox module exclusively built for Divi 5.**
**Un module flipbox puissant, accessible et responsive exclusivement conçu pour Divi 5.**

[![Divi 5.0+](https://img.shields.io/badge/Divi-5.0%2B-8300e9)](https://elegantthemes.com/divi)
[![PHP 8.1+](https://img.shields.io/badge/PHP-8.1%2B-777bb4)](https://www.php.net/)
[![License: GPL-2.0-or-later](https://img.shields.io/badge/License-GPL--2.0--or--later-blue)](https://www.gnu.org/licenses/gpl-2.0.html)

</div>

---

## 🇬🇧 English

### Highlights

Built natively for Divi 5's Block API:

- Native Visual Builder integration (React/TypeScript)
- Per-device responsive controls (desktop / tablet / phone)
- Pure-CSS animation with GPU acceleration on demand
- Full accessibility (`prefers-reduced-motion`, keyboard, `aria-pressed`)
- No jQuery, no runtime overhead on pages without flipboxes

### Features

| Area | Options |
|---|---|
| **Content** (per side) | icon OR image toggle · subtitle · title (H1-H6) · rich-text body · CTA button (text + URL + new-tab toggle) |
| **Animation** | trigger: hover / click · direction: right / left / up / down · duration: 100–2000 ms · 3D flip |
| **Sizing** | size mode: minimum height / aspect ratio / fixed · aspect presets (1:1 · 4:3 · 3:2 · 16:9 · 2:1) · min-height or fixed-height 100–800 px |
| **Layout** | content (default) · text-only · media-only · image-cover (full-bleed background with overlay text) |
| **Image** | object-fit cover or contain · `loading="lazy"` · border, box-shadow, filters per side |
| **Accessibility** | `prefers-reduced-motion` support · focus-within flip · `role="button"` + `aria-pressed` + keyboard (Enter / Space) for click trigger |

### Installation

1. Download the latest release zip or clone this repository
2. Upload to `wp-content/plugins/zipoulou-flipbox-for-divi-5/`
3. Activate in **Plugins** → **Installed Plugins**
4. Requires **Divi 5.0+** theme active (the plugin gracefully does nothing on older versions)

### Usage

In the Divi 5 Visual Builder:

1. Click **Insert Module** inside any column
2. Search for **Zipoulou FlipBox**
3. Configure through the **Content** panel:
   - **Flipbox Settings** — trigger, direction, duration, size mode, layout
   - **Front Icon / Image** — toggle icon/image, choose icon, upload image
   - **Front Side** — subtitle, title, rich-text content
   - **Back Side** — subtitle, title, rich-text content
   - **Back Button** — text, URL, open in new tab
4. Fine-tune typography, colors, spacing via the **Design** panel

### Development

Requires Node 18+ and npm 10+. PHP is only needed at runtime (on your WordPress server).

```bash
git clone https://github.com/zipoulou/zipoulou-flipbox-for-divi-5.git
cd zipoulou-flipbox-for-divi-5
npm install
npm run start     # webpack watch mode for local iteration
npm run build     # production build (minified bundles)
npm run zip       # package into a distributable zip
```

Build output lands in `scripts/`, `styles/`, and `modules-json/` (all gitignored).

### Deployment

A `deploy.sh` script is provided for SSH-based deployment (PuTTY `plink` + `pscp` on Windows, standard `ssh` / `scp` on Linux/Mac would need a small adjustment).

1. Copy `.env.example` → `.env.local` and fill in your server credentials
2. Run `./deploy.sh` — it rebuilds, zips, uploads, and unpacks into `wp-content/plugins/` on the remote
3. On O2SWITCH / cPanel hosts, remember to flush OPcache after deploy (`wp eval 'opcache_reset();'`)

### Roadmap

- v0.6 — Animation types (slide / fade / zoom / cube / flip-2D)
- v0.6 — Auto-flip trigger with interval
- v0.7 — Glassmorphism background preset
- v0.7 — Per-side background controls (independent gradients / images)
- v0.8 — Multiple buttons on the back side
- v0.8 — Line-clamp option for content truncation

### License

GPL-2.0-or-later. See the WordPress headers in the main plugin file.

---

## 🇫🇷 Français

### Points forts

Conçu nativement pour l'API Block de Divi 5 :

- Intégration native Visual Builder (React/TypeScript)
- Contrôles responsive par device (desktop / tablette / mobile)
- Animation CSS pure avec accélération GPU à la demande
- Accessibilité complète (`prefers-reduced-motion`, clavier, `aria-pressed`)
- Zéro jQuery, zéro overhead runtime sur les pages sans flipbox

### Fonctionnalités

| Domaine | Options |
|---|---|
| **Contenu** (par face) | toggle icône OU image · sous-titre · titre (H1-H6) · contenu richtext · bouton CTA (texte + URL + ouvrir dans un nouvel onglet) |
| **Animation** | trigger : hover / click · direction : droite / gauche / haut / bas · durée : 100–2000 ms · flip 3D |
| **Taille** | mode : hauteur minimum / ratio d'aspect / hauteur fixe · presets (1:1 · 4:3 · 3:2 · 16:9 · 2:1) · min-height ou hauteur fixe 100–800 px |
| **Layout** | contenu (défaut) · texte seul · média seul · image pleine face (background avec overlay texte) |
| **Image** | object-fit cover ou contain · `loading="lazy"` · bordure, ombre, filtres par face |
| **Accessibilité** | support `prefers-reduced-motion` · flip sur focus-within · `role="button"` + `aria-pressed` + clavier (Enter / Espace) pour trigger click |

### Installation

1. Télécharger le zip de la dernière release ou cloner le dépôt
2. Uploader dans `wp-content/plugins/zipoulou-flipbox-for-divi-5/`
3. Activer dans **Extensions** → **Extensions installées**
4. Nécessite le thème **Divi 5.0+** actif (le plugin ne fait rien si Divi 5 n'est pas détecté)

### Utilisation

Dans le Visual Builder Divi 5 :

1. Cliquer **Insérer un module** à l'intérieur d'une colonne
2. Rechercher **Zipoulou FlipBox**
3. Configurer via le panneau **Contenu** :
   - **Flipbox Settings** — trigger, direction, durée, mode de taille, layout
   - **Front Icon / Image** — toggle icône/image, choix d'icône, upload image
   - **Front Side** — sous-titre, titre, contenu richtext
   - **Back Side** — sous-titre, titre, contenu richtext
   - **Back Button** — texte, URL, ouvrir dans un nouvel onglet
4. Affiner typographie, couleurs et espacements via le panneau **Design**

### Développement

Nécessite Node 18+ et npm 10+. PHP n'est requis qu'à l'exécution (sur le serveur WordPress).

```bash
git clone https://github.com/zipoulou/zipoulou-flipbox-for-divi-5.git
cd zipoulou-flipbox-for-divi-5
npm install
npm run start     # mode watch webpack pour itération locale
npm run build     # build production (bundles minifiés)
npm run zip       # empaquetage en zip distribuable
```

Les artefacts de build vont dans `scripts/`, `styles/` et `modules-json/` (gitignorés).

### Déploiement

Un script `deploy.sh` est fourni pour un déploiement SSH (outils PuTTY `plink` + `pscp` sur Windows, adaptation mineure pour `ssh` / `scp` standard sur Linux/Mac).

1. Copier `.env.example` vers `.env.local` et renseigner les identifiants du serveur
2. Lancer `./deploy.sh` — rebuild, zip, upload, décompression dans `wp-content/plugins/` sur le distant
3. Sur O2SWITCH / cPanel, penser à vider OPcache après déploiement (`wp eval 'opcache_reset();'`)

### Feuille de route

- v0.6 — Types d'animation (slide / fade / zoom / cube / flip-2D)
- v0.6 — Trigger auto-flip avec intervalle
- v0.7 — Preset background glassmorphism
- v0.7 — Contrôles de background par face (dégradés / images indépendants)
- v0.8 — Plusieurs boutons sur la face arrière
- v0.8 — Option line-clamp pour troncature du contenu

### Licence

GPL-2.0-or-later. Voir les headers WordPress dans le fichier principal du plugin.
