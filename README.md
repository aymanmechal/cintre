# Cintré

Application de garde-robe numérique : on y retrouve les vêtements qu'on possède (et où ils sont rangés), on garde ceux qui font envie, et on ajoute ses propres pièces. Le catalogue vient de l'API publique [DummyJSON](https://dummyjson.com/), filtré pour ne garder que les vêtements et accessoires.

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

Pour lancer les tests de bout en bout la première fois, installer le navigateur de test : `npx playwright install chromium`.

## Configuration

Aucune variable d'environnement : l'API DummyJSON est publique et sans clé.

## Fonctionnalités

- Catalogue paginé avec recherche et deux filtres combinables (type de pièce et marque), plus un tri par prix. Tout est appliqué côté client sur l'ensemble des résultats, puis paginé, et conservé dans un contexte React. La liste des marques est construite à partir des données de l'API.
- Fiche détail `/piece/:id`.
- Garde-robe `/garde-robe` : statut « Je l'ai » / « Envie », tri (dont « Oubliées d'abord ») et regroupement par rangement ou par type. Un mode « Modifier » fait apparaître les boutons d'édition. Sauvegardée dans le `localStorage`.
- Pièces oubliées : date de dernier port, badge « À ressortir » après 30 jours et bandeau de rappel.
- Tenues `/tenues` : composeur avec aperçu fixe, un haut, un bas, des chaussures et jusqu'à 4 accessoires. On peut y mélanger ses pièces et ses envies : une tenue avec une envie est un « objectif », avec le prix des pièces à obtenir.
- Calendrier `/calendrier` : grille mensuelle, on note la tenue portée un jour passé ou on prévoit une tenue à venir. Les pièces d'une tenue notée passent en « portées ».
- Accueil : chiffres clés et pièces à ressortir.
- Formulaire d'ajout contrôlé avec validation, requête `POST`, indicateur d'envoi, erreur avec nouvel essai sans perte des valeurs. L'aperçu de la pièce et le résultat s'affichent à droite du formulaire.
- États de chargement, d'erreur et de liste vide.
- Accessibilité : labels associés, focus visible, lien d'évitement, `prefers-reduced-motion`.

### Bonus réalisés

- CRUD complet : modification (`PATCH`) et suppression (`DELETE`) avec confirmation.
- Mode sombre via un contexte, sauvegardé dans le `localStorage`.
- Recherche avec délai de 300 ms (`useDebouncedValue`).
- TypeScript.
- Déploiement automatique sur GitHub Pages à chaque push sur `main` (voir « Déploiement »). Le projet reste aussi compatible Vercel (`vercel.json`).

## Choix techniques

- **React 19 + TypeScript + Vite**.
- **react-router** : navigation entre les pages.
- **prettier** et **oxlint** : formatage et lint.
- **CSS Modules + tokens CSS** : pas de Tailwind ni de bibliothèque de composants.
- **Chargement par type, puis filtre côté client** : DummyJSON ne sait pas filtrer plusieurs catégories ni la marque, et ne sépare pas les hauts des robes. Quand un type est choisi, on ne charge que ses catégories (`/products/category/{slug}`, `limit=0`). Pour « Tous les types », une seule requête charge tout. La recherche, la marque, le tri et la pagination se font ensuite localement, dans cet ordre.
- **`useReducer` + Context** pour les filtres, la garde-robe, les tenues, le calendrier et le thème.
- **`fetch` + hooks** (`useAsync`) plutôt que TanStack Query.
- **Architecture par fonctionnalité** (voir plus bas) : composants atomiques, logique dans les hooks et `utils`, valeurs de choix dans des enums, aucun commentaire (noms explicites).

## Déploiement

Le site est publié sur **GitHub Pages** par GitHub Actions (`.github/workflows/deploy.yml`) à chaque push sur `main` :

1. **verify** : lint, formatage, types et tests (Vitest). Si une étape échoue, rien n'est publié.
2. **build** : `npm run build:pages` construit le site avec la base `/cintre/` (variable `VITE_BASE_PATH`), puis copie `index.html` en `404.html`.
3. **deploy** : publication du dossier `dist`.

Deux points propres à GitHub Pages :

- Le site est servi dans un sous-dossier (`/cintre/`). Vite reçoit donc une `base`, et le routeur reçoit un `basename` (`src/shared/utils/basePath.ts`). En développement et sur Vercel, la base reste `/`.
- GitHub Pages ne sait pas réécrire les URL vers `index.html`. Quand on recharge une page interne comme `/cintre/tenues`, il renvoie `404.html`, qui est une copie de `index.html` : l'application démarre et affiche la bonne page.

## Architecture

Le code est rangé par **fonctionnalité** : chaque page a ses composants, ses hooks et sa logique dans son propre dossier.

```
src/
├── app/                 Démarrage : App, providers, routes, layout (en-tête, pied de page), styles globaux
├── features/            Une fonctionnalité = un dossier autonome
│   ├── home/            Accueil
│   ├── catalog/         Catalogue : recherche, filtres, tri, pagination
│   ├── piece-detail/    Fiche d'une pièce
│   ├── wardrobe/        Garde-robe, statuts, pièces oubliées (la base utilisée par les autres)
│   ├── piece-form/      Ajouter, modifier, supprimer une pièce
│   ├── outfits/         Composeur et liste de tenues
│   ├── calendar/        Calendrier des tenues portées ou prévues
│   └── theme/           Mode clair / sombre
├── shared/              Ce qui sert à plusieurs fonctionnalités
│   ├── ui/              Composants génériques : Button, Form, Badge, EmptyState…
│   ├── pieces/          Le modèle « pièce » et l'accès à l'API DummyJSON
│   ├── api/             Client HTTP (fetch, erreurs)
│   ├── hooks/           useAsync, useDebouncedValue…
│   └── utils/           Formats, stockage, texte
└── test/                Outils communs aux tests (fabriques, API simulée, rendu de l'app)
```

Chaque fonctionnalité contient les mêmes sous-dossiers : `pages/` (l'écran), `components/` (un dossier par composant, avec son CSS Module), `hooks/`, `context/` (si besoin : contexte, provider, reducer, actions), `utils/`, `constants/`, `types/` et parfois `api/`.

Règles de dépendance :

- `shared` ne dépend jamais d'une fonctionnalité ni de `app`.
- Une fonctionnalité peut utiliser `shared` et `wardrobe`, mais jamais l'inverse : il n'y a aucun cycle entre fonctionnalités.
- Un fichier de test est rangé à côté du code qu'il teste (`xxx.test.ts`).

## Tests

Trois niveaux, du plus rapide au plus réaliste :

| Niveau       | Outil                        | Ce qui est testé                                                                               | Où                                     |
| ------------ | ---------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------- |
| Unitaire     | Vitest                       | Fonctions pures, reducers, stockage, client HTTP, mappers, hook de délai                       | `*.test.ts` à côté du code             |
| Intégration  | Vitest + Testing Library     | Une page entière avec ses contextes : on clique comme un utilisateur, l'API est simulée        | `*.integration.test.tsx` dans `pages/` |
| Bout en bout | Playwright (vrai navigateur) | Parcours complets : du catalogue à la tenue portée, rechargements, mode sombre, erreurs réseau | `e2e/`                                 |

- **Vitest** : même moteur que Vite, donc aucune configuration en plus, et un lancement très rapide.
- **Testing Library** : on cherche les éléments comme l'utilisateur (par rôle et par libellé), pas par classe CSS. Un test casse seulement si le comportement change.
- **Playwright** : teste dans un vrai navigateur, ce que jsdom ne sait pas faire (mise en page, défilement, `<dialog>`, rechargement de page).
- **API simulée** : les tests ne dépendent jamais du réseau. Les tests d'intégration remplacent `fetch`, les tests de bout en bout interceptent les requêtes vers DummyJSON. Ils sont donc rapides et reproductibles.
- Les dates sont figées dans les tests (`vi.setSystemTime`, `page.clock.setFixedTime`) pour que « aujourd'hui » ne change pas le résultat.

## Données en dur et API

Tout ce qui est une donnée du catalogue vient de l'API DummyJSON (pièces, prix, photos, marques, détails). Quelques listes restent dans le code, volontairement, parce que ce sont des choix de l'application et non des données :

- les **types de pièces** (hauts, bas, chaussures…) et le regroupement des catégories DummyJSON dans ces types : DummyJSON n'a pas de « bas » ni de notion de tenue ;
- les **libellés français**, les statuts (« Je l'ai » / « Envie »), les lieux de rangement, les emplacements d'une tenue ;
- les **seuils** (pièce oubliée après 30 jours, 12 pièces par page, 4 accessoires maximum), rangés dans des constantes nommées.

## Limites et problèmes connus

- DummyJSON simule les écritures sans rien enregistrer : le `POST` renvoie toujours l'id 195, et un `PATCH`/`DELETE` sur une pièce ajoutée renvoie 404. Les pièces personnelles reçoivent donc un id négatif local et ne sont synchronisées qu'en `localStorage`.
- Les pièces ajoutées n'ont pas forcément de photo.
- Interface pensée pour ordinateur, adaptée au mobile de façon minimale.
- Les données sont stockées par navigateur (pas de compte).

## Outils d'IA

Claude (Claake Code) a été utilisé pour générer et relire le code, sous ma direction, avec explications de chaque choix pour que je puisse les justifier à l'oral.
