# Cintré : détail des fonctions (archive)

Fichier de référence, à consulter avec `grep` quand une fonction précise est concernée. Ne pas le lire en entier. Certaines lignes sont dépassées (pied de page remplacé par la page Moi, défi du jour retiré, rangement supprimé, couleurs refaites) : le code fait foi.

# Cintré : contexte du projet

Projet perso. Réponds en français, ton de collègue, concis.

## L'idée

Cintré est une garde-robe numérique. Le problème de départ : beaucoup de vêtements, mais seulement 6 ou 7 portés, parce qu'on oublie les autres. L'app sert à :

- savoir ce qu'on possède (garde-robe, statut « Je l'ai » ou « Envie ») ;
- composer des tenues en mélangeant pièces possédées et pièces voulues (une tenue avec une envie est un objectif) ;
- noter les tenues dans un calendrier (passé = portée, futur = prévue) ;
- repérer les pièces oubliées (non portées depuis 30 jours).

## Stack

React 19, TypeScript, Vite, react-router, CSS Modules, tokens CSS (`src/app/styles/tokens.css`). Pas de backend ni d'API. Pas de Tailwind, Redux ni TanStack Query.

Dépôt : `E:\B3 DEV\FRONTEND\projet-dummy`, GitHub `aymanmechal/cintre`. On développe sur `maindev` ; une fonction passe sur `main` quand elle est stable. Déploiement : GitHub Pages (`.github/workflows/deploy.yml`, `https://aymanmechal.github.io/cintre/`). Le projet Vercel est en pause (`vercel.json` conservé).

## Architecture

```
src/
├── app/       App, AppProviders, AppRoutes, layout (en-tête, navigation, pied de page), styles
├── features/  home, shops, wardrobe, piece-form, outfits, calendar, stats, trash, archive, backup, theme
│              chacune : pages/ components/ hooks/ context/ utils/ constants/ types/
├── shared/    ui/ (Button, Form...), pieces/ (modèle), photos/ (IndexedDB), hooks/, utils/
└── test/      factories, renderApp
```

Règle de dépendance : `shared` n'importe jamais une feature ; pas de boucle entre features ; `wardrobe` sert de base aux autres.

## Conventions (clean archi : code ultra simple et lisible, sans être militaire)

- Zéro commentaire, noms de fonctions explicites, fonctions courtes.
- Composants atomiques : un dossier par composant avec son CSS Module.
- Enums pour tous les choix, `Record<Enum, string>` pour les libellés.
- Contextes en 5 fichiers : `XContext.ts`, `XProvider.tsx`, `xReducer.ts`, `createXActions.ts`, `useX.ts`.
- Logique dans les hooks et `utils`, composants = affichage.
- Routes dans `src/shared/routes.ts` (`ROUTES`).

## Données

- Pas de backend : garde-robe (`cintre.wardrobe`), corbeille (`cintre.trash`), tenues et calendrier sont dans le `localStorage`. Les photos (data URL JPEG, 800 px max) sont dans IndexedDB (`cintre-photos`), référencées par `Piece.photoId` (principale) et `Piece.extraPhotoIds` (3 max, `MAX_EXTRA_PHOTOS`). `usePurgeOrphanPhotos` (lancé dans `Layout`) supprime au démarrage les photos qui ne servent plus à aucune pièce (garde-robe, corbeille, archives).
- `Piece` v2 : couleur, saison, taille, date d'achat, lien de l'article (tous facultatifs). `toPiece` (`shared/pieces/utils/pieceMigration.ts`) migre les anciennes données au chargement.
- Garde-robe : recherche (nom, marque, taille, tags), filtres type/couleur/saison/tag/favoris (`Plus de filtres`), favoris (`Piece.isFavorite`, cœur sur la carte), tags (`Piece.tags`, saisis séparés par des virgules).
- Disponibilité (`WardrobeItem.availability` : disponible, à laver, au lavage, prêtée, en réparation) : pastille sur la carte, filtre « Disponibles seulement ». Matière dans `Piece.material`.
- Archives (`/archives`, clé `cintre.archive`) : une pièce possédée peut être marquée vendue ou donnée depuis sa fiche ; elle sort de la garde-robe et peut y revenir.
- Supprimer une pièce l'envoie à la corbeille (`/corbeille`), purgée après 30 jours au chargement.
- Sauvegarde (`/sauvegarde`, lien dans le pied de page) : export/import JSON avec photos, versionné (`BACKUP_VERSION = 2`, les sauvegardes v1 restent lisibles via `READABLE_BACKUP_VERSIONS`).
- Idées de tenues (`/tenues/idees/:id`, `outfits/utils/combinations.ts`) : à partir d'une pièce, combine haut + bas + chaussures possédés et disponibles (jamais robe + bas, jamais été + hiver), écarte les tenues déjà enregistrées, classe par harmonie de couleurs (neutres, une touche, audacieux) et favoris. Accès : fiche d'une pièce (« Tes tenues avec cette pièce ») et « Pièces sans tenue » sur `/tenues`. La suppression prévient si la pièce est dans des tenues.
- Tenues : `Outfit` a une note et un score (0 à 5). Sur chaque carte : « Dupliquer » (variante), ↻ sous une pièce (remplace juste cette pièce par une autre disponible du même type), « Note et score » repliable. Le créateur a un bouton « 🎲 Tenue aléatoire » (`pickRandomIdea`).
- Chiffres (`/chiffres`, lien dans le pied de page, `features/stats`) : dépenses totales, coût moyen par port, pièces jamais portées, classements (plus portées, plus rentables, à rentabiliser). Les ports se déduisent du calendrier (`calendar/utils/wearCounts.ts` : entrées passées × pièces de la tenue). La fiche d'une pièce possédée affiche son coût par port.
- PWA : `public/manifest.webmanifest` (chemins relatifs, compatibles avec `VITE_BASE_PATH`), icônes PNG dans `public/`, `public/sw.js` (navigation réseau d'abord puis app en cache, fichiers du même site en cache), enregistré en production seulement (`shared/pwa/registerServiceWorker.ts`). Bouton « 📲 Installer Cintré » dans le pied de page quand le navigateur le permet (`useInstallPrompt`). Changer `CACHE_NAME` dans `sw.js` pour forcer une purge.
- Partage vers Cintré : `share_target` ouvre `/ajouter?title=&text=&url=`. `piece-form/utils/sharedPiece.ts` préremplit une Envie (nom, lien trouvé même dans le texte, marque déduite du domaine via `shops/utils/shops.ts`).
- Accueil : défi du jour (`home/utils/forgottenChallenge.ts`, une pièce oubliée et disponible, stable dans la journée, bouton « Un autre défi » qui mène à `/tenues/idees/:id`) et mode démo (`features/demo` : 9 pièces fictives d'id négatif et 3 tenues `demo-outfit-*`, proposé seulement si garde-robe, corbeille et archives sont vides, « Retirer la démo » ne touche qu'aux pièces de démo).
- Indicateur de sauvegarde : `writeJsonToStorage` signale `Saved` ou `Failed` (quota, navigation privée) via `shared/save`, affiché dans le pied de page (`SaveIndicator`, `aria-live`, sans `role="status"` pour ne pas gêner les tests).
- Liste des tenues (`/tenues`) : 4 par page (`OUTFIT_LIST_PAGE_SIZE`), la plus récente en premier, avec recherche (nom, pièces, marques : `outfits/utils/outfitSearch.ts`). Découpage en pages dans `shared/utils/pagination.ts` et composant `shared/ui/Pagination`.
- Créateur de tenues : le sélecteur de pièces (« Choisis ton haut ») montre 6 pièces par page (`PIECE_SHELF_PAGE_SIZE`) avec recherche (réutilise `matchesSearch` de la garde-robe) et pagination ; il repart de la page 1 à chaque changement d'onglet (`key={activeSlot}`).
- Harmonie des couleurs expliquée (`outfits/utils/colorHarmony.ts`, composant `OutfitHarmony`) : sur les tenues enregistrées, dans le créateur, sur les idées et dans la comparaison. Neutres seuls, une touche de couleur (nommée) ou plusieurs couleurs vives ; rien n'est affiché si moins de 2 pièces ont une couleur.
- « Je garde x pièces » : le créateur propose « Je garde N pièces : voir des idées » qui ouvre `/tenues/idees/1,-5,3`. `buildOutfitIdeas` prend une liste de pièces gardées (`canKeepTogether` : une place par haut, bas et chaussures, 4 accessoires, pas de robe avec un bas, pas d'été avec hiver) et complète le reste. `buildOutfitIdeasUrl(...ids)` et `parseWardrobePieceIds` gèrent l'adresse.
- Comparer des tenues : case « Comparer X » sur chaque carte, 2 à 3 tenues (`MAX_COMPARED_OUTFITS`) ; le panneau `OutfitComparison` s'affiche au-dessus de la liste (pièces, prix total, état, note, harmonie). État dans `useOutfitComparison`, pas enregistré.
- Garde-robe : bouton « Sélectionner » (`useWardrobeSelection`, `SelectionBar`) : une case par pièce, « Tout sélectionner », puis en une fois : favoris (mettre/retirer), disponibilité, ajout de tags (`wardrobe/utils/bulkEdit.ts`). La sélection ne touche que les pièces visibles (filtres et recherche respectés). Le mode « Modifier » est masqué pendant la sélection.
- Occasion des tenues (`Outfit.occasion: Occasion | null`, `outfits/constants/occasions.ts` : quotidien, travail, cours, rendez-vous, soirée, mariage, entretien, sport, vacances) : choix facultatif dans le créateur, modifiable sur chaque carte, filtre « Occasion » dans la liste (combiné à la recherche), ligne dans la comparaison. Anciennes tenues migrées à `null` par `outfitStorage`.
- Budget mensuel (`features/stats`, carte « Budget du mois » sur `/chiffres`) : montant dans `localStorage` (`cintre.budget`, pas dans la sauvegarde JSON), dépenses = prix des pièces possédées dont `boughtOn` est dans le mois courant (`stats/utils/budget.ts`), barre `<progress>`, « Il te reste » ou « Dépassé de ».
- Tenue météo (`features/weather`, carte « La tenue météo » sur l'accueil, cachée si la garde-robe est vide) : rien n'est demandé au réseau tant qu'aucun lieu n'est choisi. « Utiliser ma position » (géolocalisation arrondie à 2 décimales) ou ville tapée (géocodage Open-Meteo), lieu gardé dans `localStorage` (`cintre.weatherPlace`, pas dans la sauvegarde). Prévision du jour (`useTodayForecast`) via Open-Meteo (`weather/api/openMeteoApi.ts`, réponses validées par `utils/openMeteo.ts`). Moyenne min/max : ≥ 22 °C chaud (pièces d'hiver écartées), < 12 °C froid (pièces d'été écartées), sinon doux ; pluie ≥ 50 % : chaussures d'été écartées. Une idée par haut (`buildWeatherIdeas`), « Une autre tenue », « Garder cette tenue » (`useKeepOutfitIdea`, partagé avec les idées).
- Ma valise (`features/suitcase`, route `/valise`, dans le menu) : destination (géocodage Open-Meteo), départ (pas dans le passé) et 1 à 14 jours. Météo résumée sur tout le séjour (`useWeatherForecast(place, { startDate, endDate })` ; `toWeatherSummary` garde le minimum le plus froid, le maximum le plus chaud et la pluie la plus forte). Au-delà de 16 jours (`isWithinForecast`) ou si la météo ne répond pas, aucun tri par saison. `buildSuitcasePlan` : pièces portables qui vont avec la météo, favoris puis neutres d'abord ; un haut pour 2 jours (`DAYS_PER_TOP`), un bas pour 3 jours (`DAYS_PER_BOTTOM`, pas de bas les jours en robe), 1 paire de chaussures ; une tenue par jour en rotation. Checklist cochable (« Valise bouclée ! »), tenues jour par jour dans un `<details>`. Voyage et pièces cochées dans `localStorage` (`cintre.suitcase`, pas dans la sauvegarde).
- Mon bilan (`features/wrapped`, route `/bilan`, lien dans le pied de page) : « Ce mois-ci » ou « Cette année » (`WrappedPeriod`). `buildWrapped` (préfixe de date `2026-03` ou `2026`, futur ignoré) donne jours avec tenue notée, pièce n°1, tenue préférée, couleur la plus portée, pièces pas portées, achats et dépenses ; `wrappedHighlights.ts` prépare les 6 cartes colorées. Rien n'est stocké.
- Tenue en image : bouton « En image » (`OutfitImageButton`, sur les cartes et dans le lookbook) → `exportOutfitImage` dessine un `<canvas>` PNG (`outfitImageLayout.ts` pour la mise en page, `outfitImageDraw.ts` pour le dessin ; photos d'IndexedDB ou miniature, sinon case colorée) puis `downloadBlob`. Une photo distante bloquée par le navigateur laisse simplement la case colorée.
- Mon lookbook (`features/lookbook`, route `/lookbook`, lien dans le pied de page) : une tenue par page, la plus récente d'abord, navigation `Pagination`, avec occasion, harmonie, note et bouton image.
- Bilan : en plus de « ta pièce numéro 1 » (chaussures comprises), la carte « ton vêtement le plus porté » (`Wrapped.topClothing`, `isClothing` : seulement les Hauts et Bas, donc chemises, hauts, robes et bas).
- Garde-robe : toucher une carte ouvre sa fiche de modification (titre en lien étiré `::after`, `WardrobeItemTitle isLinked`). Le favori et les outils du mode « Modifier » passent au-dessus (`z-index: 1`). Pas de lien pendant la sélection.
- Bilan : les cartes sont des tuiles colorées avec icône (`WrappedHighlight.icon`) ; celles qui ont un `to` (pièce n°1, vêtement le plus porté, tenue préférée, pièces pas portées) sont cliquables en entier (lien étiré). Pied de page : pastilles de `footerLinks.ts` sur une ligne qui passe à la ligne si besoin, sans soulignement.
- Menu du haut (`MainNav`) : sur mobile (≤ 720 px), logo et boutons (thème, Ajouter) sur la première ligne, menu sur la seconde en une ligne qui défile horizontalement (`order: 1`, barre masquée), liens en `nowrap`. Libellés courts : Catalogue, Ma garde-robe, Mes tenues, Calendrier, Valise.
- Mes associations (`features/compatibility`, `/associations`, lien dans le pied de page) : graphe de compatibilité sans bibliothèque. `buildCompatibilityGraph` génère toutes les idées à partir des hauts (`buildOutfitIdeas`, pièces `isWearable`, sans accessoires). Chaque pièce devient un nœud avec `outfitCount` et `partners`. On affiche les 5 pièces indispensables (`ESSENTIAL_PIECES_LIMIT`), le détail d'une pièce choisie (partenaires par Haut, Bas et Chaussures, lien vers les idées) et les pièces isolées (0 tenue, lien vers leur fiche).
- Compte et synchro (`features/auth` + `features/sync`, `/compte`, pastille « ☁️ Mon compte » dans le pied de page) : Supabase (`shared/supabase/supabaseClient.ts`, `null` sans `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` dans `.env.local`, mocké à `null` dans `src/test/setup.ts`). Inscription e-mail + mot de passe + pseudo (`user_metadata.nickname`), session persistante. `CloudSync` (dans `AppProviders`) : à la connexion, données en ligne → remplacent le local, sinon le local est envoyé ; ensuite envoi après 1,5 s sans changement. Une ligne par utilisateur dans `user_data` (`content` = format de sauvegarde sans photos, via `parseBackupValue`). Photos : bucket privé `photos`, fichier `<userId>/<photoId>` ; `syncPhotos` envoie celles absentes en ligne et télécharge celles absentes ici (les ids ne changent jamais), `reportPhotoSaved` rafraîchit `usePhotoUrl`. Compte obligatoire : `AuthGate` (dans `App.tsx`) affiche `WelcomeScreen` tant qu'on n'est pas connecté ; sans Supabase configuré l'app s'ouvre directement (tests Vitest, et e2e via `env` vide dans `playwright.config.ts`). La déconnexion vide l'appareil (les données restent en ligne). Script SQL : `supabase/schema.sql` (table + bucket + RLS).
- Mon styliste (`features/stylist`, `/styliste`, pastille « 🪄 Mon styliste » dans le pied de page + lien « Demander au styliste » dans le créateur de tenues) : l'envie + les pièces portables (`toStylistPieces` : nom, type, couleur, saison, marque, tags, sans photo ni prix) partent à l'edge function Supabase `supabase/functions/stylist/index.ts` (Gemini 2.5 Flash, réponse JSON forcée, secret `GEMINI_API_KEY`, JWT requis). `toStylistSuggestion` ne garde que des ids de pièces possédées et disponibles (jamais de pièce inventée), affichée avec `OutfitIdeaCard` + explication, « Garder cette tenue » via `useKeepOutfitIdea`.
- Outils photo (`piece-form/components/PhotoTools`, visibles dès qu'une photo principale est choisie) : « ✨ Remplir avec la photo » → edge function `supabase/functions/recognize/index.ts` (Gemini vision, enums forcés) → `parsePhotoRecognition` (valeurs inconnues ignorées) → `applyRecognition` de `usePieceForm` (nom rempli seulement s'il est vide, type/couleur/saison remplacés). « ✂️ Détourer » → `shared/photos/utils/cutoutPhoto.ts` (`@imgly/background-removal`, chargé à la demande, modèle `isnet_quint8` depuis le CDN imgly, licence AGPL) → nouvelle photo WebP transparente (`CUTOUT_MIME_TYPE`), l'ancienne est purgée au prochain démarrage. Les deux sont mockés dans les tests.
- Mode démo : chaque pièce a une illustration SVG générée (`features/demo/utils/demoIllustration.ts`, forme par type, couleur de la pièce) mise dans `thumbnail`.
- Partage (`features/sharing`) : désactivé par défaut, bouton « Partager » sur une tenue (connecté) → image JPEG stockée dans `shared_looks`, lien public `/partage/:id` hors `AuthGate` (via `app/AppGate.tsx`), réactions emoji ou sondage entre tenues comparées (`look_votes`, lecture publique via la RPC `get_shared_look`), panneau « Mes tenues partagées » pour copier ou arrêter un partage
- Tenue autour d’une couleur (`features/outfits`) : bloc dépliable « 🎨 Une tenue autour d’une couleur » sur Mes tenues → page `/tenues/couleur/:color` qui réutilise la liste d’idées (`OutfitIdeasView`, `useIdeasList`)
- Score de dépendance (`features/stats`) : carte « Toujours les mêmes ? » sur Mes chiffres, part des 3 pièces les plus portées (au moins 10 ports)
- Apprentissage des goûts (`features/outfits`, `utils/tastes.ts`) : 👍/👎 sur les cartes d’idées (`IdeaTasteButtons`), stockés dans `cintre.tastes` ; `buildOutfitIdeas` reçoit les goûts : affinité par pièce (aimée +1, tenue gardée +1, masquée −1, poids 0,5) et idées masquées retirées ; l’ordre est figé à l’ouverture de la page (`useIdeasList`)
- Profil de style (`features/profile`, route `/profil`, lien dans le pied de page) : style (sobre / touche de couleur / audacieux selon les couleurs vives par tenue), 3 couleurs dominantes, pièces fétiches, occasion favorite ; calculé à partir des tenues, des tenues gardées et des 👍. Les goûts (`cintre.tastes`) sont aussi dans la sauvegarde et la synchro (champ facultatif `tastes`)
- Zéro répétition (`features/calendar`) : en ajoutant une tenue au calendrier, un rappel 🔁 liste les pièces déjà portées dans les 6 jours autour (`utils/repeatedPieces.ts`).
- Avant d'acheter (`features/piece-form`) : sur la fiche d'une envie, nombre de tenues qu'elle rendrait possibles et pièces similaires déjà possédées (`utils/beforeBuying.ts`).
- Rogner la photo (`features/piece-form`, `shared/photos`) : bouton « ✂️ Rogner la photo » sous le champ lien, 4 curseurs (haut/bas/gauche/droite) avec aperçu ; marche sur une photo importée ou sur un lien d'image (téléchargé directement, sinon via le relais wsrv.nl), le résultat devient la photo de la pièce.
- Préparer demain (`features/calendar`) : carte en haut du calendrier avec la tenue prévue demain, checklist des pièces à cocher et alerte si une pièce est à laver, au lavage, prêtée ou en réparation (`utils/tomorrowPlan.ts`).
- Page Catalogue (`features/shops`) : grille de 15 boutiques (Zara, Bershka, Kiabi, Zalando, ASOS...) qui ouvre le site de l'enseigne dans un nouvel onglet (l'app sur mobile si installée). ; chaque carte affiche l’icône du site de la boutique (service favicon), avec la lettre en secours
- Les pièces créées ont un id négatif (`-Date.now()`). D'anciennes pièces venues de DummyJSON peuvent avoir un id positif.

## Qualité

Avant de commit : `npm run lint` (1 avertissement connu sur `ButtonVariant`), `npx tsc -b`, `npx prettier --check src e2e`, `npx vitest run`, `npx playwright test`, `npx vite build`.

- Vitest : 662 tests (unitaires + intégration, IndexedDB via `fake-indexeddb`). Playwright : 37 tests e2e, champs ciblés avec `data-testid` (= l'`id` du champ).
- Commit + push seulement sur demande.

## Pièges de l'environnement (Windows)

- L'outil shell est PowerShell : pas de `head`, `tail`, `grep`. Si `bash` est indisponible, passer par l'outil `python` avec `subprocess.run(..., shell=True, stdin=subprocess.DEVNULL)`. L'état Python ne persiste pas entre deux appels. Lint = `oxlint` (`npm run lint`), pas ESLint.
- Les accents s'affichent mal en cp1252 : écrire le code en UTF-8 tel quel, ne pas utiliser de séquences `\uXXXX`.
- `git grep` ne voit que les fichiers indexés : faire `git add -A` avant.
- Captures d'écran : Chrome headless avec un `public/seed.html` temporaire. Le supprimer après usage. Le dossier `.shots/` est ignoré par Git.
- Si un serveur Vite de test reste ouvert : `netstat -ano | findstr :PORT` puis `taskkill /PID x /T /F`.
- `gh` est installé et connecté (compte `aymanmechal`).

## État

Le projet scolaire est rendu. Cintré devient une app perso : voir `COMPTE_RENDU.md` (cap, fonctions retenues, vagues, modèle IA par tâche). À la fin de chaque message, indiquer le modèle (5.5) de la prochaine tâche et si un swarm est utile.
