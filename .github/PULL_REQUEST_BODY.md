Corrige les 11 constats de la revue frontend, puis ajoute une section Événements et les correctifs de sécurité bloquants relevés dans l'audit backend.

## Revue frontend — mesuré avant / après

| | Avant | Après |
|---|---|---|
| Démos mortes | 15 / 41 | 0 |
| CSS `.prose` | 0 règle → `h2` à 16 px, marge 0 | 99 règles → 24 px, marge 48 px |
| Utilitaires `dark:` | 7 règles `@media`, 1 sélecteur `.dark` | 0 `@media`, 34 `.dark` |
| `opacity:0` dans le HTML de `/` | 5, dont le `h1` | 0 |
| « Technologies » dans le HTML servi | absent | présent |
| Poids de `/projects` | 321 Ko, dont 206 Ko de SVG inline | 100 Ko, 0 data-URI |
| Pages avec un `<h1>` | 1 / 6 | 6 / 6 |
| Carrousel après un clic | figé définitivement | repart, plus un bouton pause |

**FE-01** — 15 projets affichaient un bouton « Tester » ne menant nulle part : 7 vers `localhost`, 8 vers un compte Hugging Face inexistant. L'heuristique qui devinait ces URLs est retirée de `import_github.py`, `clean_demo_urls.py` purge l'historique, `lib/demo-url.ts` sert de garde-fou au rendu.

**FE-02** — `@tailwindcss/typography` n'était ni installé ni déclaré : le Markdown des pages projet s'affichait sans aucun style.

**FE-03** — La page d'accueil ne servait qu'un squelette, et son `h1` partait en `opacity:0` (état initial de Framer Motion sérialisé). Sections passées en Server Components, animation en CSS.

**FE-04** — `@custom-variant dark` : les utilitaires `dark:` suivaient le réglage système au lieu du bouton de thème.

**FE-05** — Le carrousel annulait son intervalle sans jamais le recréer. Bouton pause ajouté, `prefers-reduced-motion` honoré (WCAG 2.2.2).

**FE-06/07** — Vignettes servies par `/api/thumb` et mises en cache ; classement par domaine avec teinte dédiée et filtre à compteurs.

**FE-08** — Une panne d'API affichait « Aucun projet pour le moment ». Ajout de `error.tsx`, `loading.tsx`, `not-found.tsx`.

**FE-09/10** — Un `h1` par page, `sitemap.ts`, `robots.ts`, libellés de navigation corrigés.

**FE-11** — Logos de marque au lieu des émojis, images dimensionnées, `middleware.ts` → `proxy.ts`, texte du profil aligné sur les dates.

## Section Événements

Modèle `Event` + CRUD `/api/v1/events`, page publique `/evenements` avec galerie et visionneuse au clavier, back-office `/admin/events` complet. Premier contenu : HSIL Hackathon (Harvard T.H. Chan School of Public Health, Accra, avril 2026) et quatre photos.

## Revalidation à la demande

Les lectures publiques sont étiquetées par ressource ; toute écriture depuis le back-office purge l'étiquette correspondante via `POST /api/revalidate`, autorisé par le nouveau `GET /auth/me`. Une modification est visible dès le chargement suivant, sans renoncer au cache.

## Sécurité

**SEC-01** — `SECRET_KEY` n'avait pas de valeur par défaut sûre : elle retombait sur `change-me-in-production` et rien ne bloquait le démarrage. Combinée à l'admin `admin/admin123` de `seed.py`, un déploiement sans la variable laissait forger un jeton administrateur.

**SEC-02** — Les README importés depuis GitHub étaient rendus en HTML sans assainissement (`marked` ne filtre plus depuis la v5), via `dangerouslySetInnerHTML`.

## Vérifications

`next build`, `tsc --noEmit` et `eslint` sans erreur. Suite backend au vert. Parcours public et back-office parcourus dans Chromium.

## À faire avant de fusionner

1. `make seed-demo-events-remove` — deux événements fictifs servaient à prévisualiser la page.
2. `make migrate && make seed-events` — crée la table `events` et le premier contenu.
3. Définir `SECRET_KEY` dans l'environnement de production : le backend refuse désormais de démarrer sans.
4. Le build échoue si l'API ne répond pas — les `catch` qui déguisaient une panne en liste vide ont été retirés. Réveiller le backend avant de déployer.
