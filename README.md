# Cintré

Cintré est une garde-robe numérique pensée pour le téléphone. On y range ce qu'on possède, on note ce qui fait envie, on compose des tenues et on repère les pièces oubliées au fond du tiroir. Tout reste sur l'appareil : pas de compte, pas de serveur.

Application en ligne : https://aymanmechal.github.io/cintre/

## Prérequis

- Node.js 20 ou plus récent
- npm

## Installation et lancement

```bash
npm install
npm run dev
```

L'application est servie sur http://localhost:5173.

| Commande               | Rôle                                      |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Serveur de développement                  |
| `npm run build`        | Vérification des types puis build de prod |
| `npm run preview`      | Prévisualisation du build                 |
| `npm run lint`         | Linter (oxlint)                           |
| `npm run format:check` | Vérification du formatage (Prettier)      |
| `npm run check`        | Lint + formatage + types + tests          |
| `npm test`             | Tests unitaires et d'intégration (Vitest) |
| `npm run test:watch`   | Les mêmes tests, relancés à chaque modif  |
| `npm run test:e2e`     | Tests de bout en bout (Playwright)        |

Pour lancer les tests de bout en bout la première fois : `npx playwright install chromium`.

## Configuration

Aucune variable d'environnement et aucune clé d'API.

## Fonctionnalités

- **Garde-robe** : pièces « Je l'ai » ou « Envie », rangement, recherche, filtres (type, couleur, saison, tags, favoris, disponibilité), tri et regroupement.
- **Fiche d'une pièce** : couleur, saison, taille, matière, date d'achat, lien de l'article, tags, photo principale et jusqu'à 3 autres photos, coût par port, tenues qui l'utilisent.
- **Disponibilité** : sale, au lavage, prêtée, en réparation. Une pièce indisponible n'est pas proposée dans les tenues.
- **Tenues** : composeur avec aperçu, idées de tenues à partir d'une pièce (harmonie des couleurs), variantes, remplacement d'une pièce, tenue aléatoire, note et score.
- **Calendrier** : on note la tenue portée un jour passé ou on prévoit une tenue à venir.
- **Pièces oubliées** : badge après 30 jours sans port, pièces à ressortir sur l'accueil et défi du jour.
- **Chiffres** : dépenses, coût par port, classements des pièces les plus et les moins rentables.
- **Corbeille et archives** : une pièce supprimée reste 30 jours dans la corbeille ; une pièce vendue ou donnée passe aux archives.
- **Catalogue** : une grille de boutiques (Zara, Bershka, Kiabi, Zalando, ASOS…) qui ouvre le site de l'enseigne.
- **Sauvegarde** : export et import JSON avec les photos. Un indicateur en bas de page confirme que tout est enregistré.
- **Mode démo** : une garde-robe fictive pour découvrir l'app, retirable en un clic.
- **Application installable (PWA)** : fonctionne hors ligne, accepte le partage d'un lien depuis une autre application.
- **Mode sombre**, accessibilité (labels, focus visible, lien d'évitement, `prefers-reduced-motion`).

## Choix techniques

- **React 19 + TypeScript + Vite**, **react-router**.
- **CSS Modules + tokens CSS** : pas de Tailwind ni de bibliothèque de composants.
- **`useReducer` + Context** pour la garde-robe, les tenues, le calendrier et le thème.
- **Données locales** : `localStorage` pour les pièces, tenues et calendrier ; IndexedDB pour les photos (JPEG, 800 px maximum).
- **Clean archi par fonctionnalité** : la logique vit dans les hooks et les `utils`, les composants ne font que de l'affichage, les choix sont des enums, aucun commentaire (noms explicites).

## Architecture

```
src/
├── app/        Démarrage : App, providers, routes, layout (en-tête, pied de page), styles
├── features/   Une fonctionnalité = un dossier autonome
│   ├── home, shops, wardrobe, piece-form, outfits, calendar
│   └── stats, trash, archive, backup, demo, theme
├── shared/     Ce qui sert à plusieurs fonctionnalités
│   ├── ui/ pieces/ photos/ save/ pwa/ hooks/ utils/
└── test/       Fabriques et rendu de l'app pour les tests
```

Chaque fonctionnalité contient les mêmes sous-dossiers : `pages/`, `components/` (un dossier par composant avec son CSS Module), `hooks/`, `context/` (si besoin), `utils/`, `constants/` et `types/`.

Règles de dépendance :

- `shared` ne dépend jamais d'une fonctionnalité ni de `app`.
- Pas de boucle entre fonctionnalités : `wardrobe` sert de base aux autres.
- Un test est rangé à côté du code qu'il teste (`xxx.test.ts`).

## Tests

| Niveau       | Outil                        | Ce qui est testé                                                    | Où                                     |
| ------------ | ---------------------------- | ------------------------------------------------------------------- | -------------------------------------- |
| Unitaire     | Vitest                       | Fonctions pures, reducers, stockage, sauvegarde                     | `*.test.ts` à côté du code             |
| Intégration  | Vitest + Testing Library     | Une page entière avec ses contextes, on clique comme un utilisateur | `*.integration.test.tsx` dans `pages/` |
| Bout en bout | Playwright (vrai navigateur) | Parcours complets, rechargements, mode sombre                       | `e2e/`                                 |

Les dates sont figées dans les tests pour que « aujourd'hui » ne change pas le résultat. Aucun test ne dépend du réseau.

## Déploiement

Le site est publié sur **GitHub Pages** par GitHub Actions (`.github/workflows/deploy.yml`) à chaque push sur `main` :

1. **verify** : lint, formatage, types et tests. Si une étape échoue, rien n'est publié.
2. **build** : `npm run build:pages` construit le site avec la base `/cintre/` (variable `VITE_BASE_PATH`), puis copie `index.html` en `404.html`.
3. **deploy** : publication du dossier `dist`.

GitHub Pages sert le site dans un sous-dossier (`/cintre/`) : Vite reçoit une `base` et le routeur un `basename` (`src/shared/utils/basePath.ts`). Il ne sait pas réécrire les URL vers `index.html` : la copie `404.html` permet de recharger une page interne.

## Limites

- Les données sont stockées par navigateur : sans sauvegarde, elles ne passent pas d'un appareil à l'autre.
- Vider les données du navigateur efface la garde-robe : pense à exporter une sauvegarde de temps en temps.

## Outils d'IA

Claude (Claake Code) a été utilisé pour générer et relire le code, sous ma direction, avec explications de chaque choix pour que je puisse les justifier à l'oral.
