# Cintré

Application de garde-robe numérique : on y retrouve les vêtements qu'on possède (et où ils sont rangés), on garde ceux qui font envie, et on ajoute ses propres pièces. Le catalogue vient de l'API publique [DummyJSON](https://dummyjson.com/), filtré pour ne garder que les vêtements et accessoires.

Application en ligne : _à compléter avec le lien Vercel_

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
| `npm run check`        | Lint + formatage + types                  |

## Configuration

Aucune variable d'environnement : l'API DummyJSON est publique et sans clé.

## Fonctionnalités

- Catalogue paginé avec recherche, filtre par catégorie et tri par prix (côté client, sur l'ensemble des résultats), conservés dans un contexte React.
- Fiche détail `/piece/:id`.
- Garde-robe `/garde-robe` : statut « Je l'ai » / « Envie », lieu de rangement, tri et regroupement. Sauvegardée dans le `localStorage`.
- Formulaire d'ajout contrôlé avec validation, requête `POST`, indicateur d'envoi, erreur avec nouvel essai sans perte des valeurs.
- États de chargement, d'erreur et de liste vide.
- Accessibilité : labels associés, focus visible, lien d'évitement, `prefers-reduced-motion`.

### Bonus réalisés

- CRUD complet : modification (`PATCH`) et suppression (`DELETE`) avec confirmation.
- Mode sombre via un contexte, sauvegardé dans le `localStorage`.
- Recherche avec délai de 300 ms (`useDebouncedValue`).
- TypeScript.
- Déploiement sur Vercel (`vercel.json` : réécriture vers `index.html` pour que le rechargement d'une URL fonctionne).

## Choix techniques

- **React 19 + TypeScript + Vite**.
- **react-router** : navigation entre les pages.
- **prettier** et **oxlint** : formatage et lint.
- **CSS Modules + tokens CSS** : pas de Tailwind ni de bibliothèque de composants.
- **Recherche, filtre et pagination côté client** : DummyJSON ne permet pas de combiner recherche et filtre de catégorie sur plusieurs catégories. On charge donc tout le catalogue en une requête (`limit=0`), puis on filtre, trie et pagine localement, dans cet ordre.
- **`useReducer` + Context** pour les filtres, la garde-robe et le thème.
- **`fetch` + hooks** (`useAsync`) plutôt que TanStack Query.
- **Architecture** : composants atomiques (un dossier par famille), logique dans les hooks et `utils`, valeurs de choix dans des enums, aucun commentaire (noms explicites).

## Limites et problèmes connus

- DummyJSON simule les écritures sans rien enregistrer : le `POST` renvoie toujours l'id 195, et un `PATCH`/`DELETE` sur une pièce ajoutée renvoie 404. Les pièces personnelles reçoivent donc un id négatif local et ne sont synchronisées qu'en `localStorage`.
- Les pièces ajoutées n'ont pas forcément de photo.
- Interface pensée pour ordinateur, adaptée au mobile de façon minimale.
- Les données sont stockées par navigateur (pas de compte).

## Outils d'IA

Claude (Claake Code) a été utilisé pour générer et relire le code, sous ma direction, avec explications de chaque choix pour que je puisse les justifier à l'oral.
