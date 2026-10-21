import { ErrorMessage } from '../components/ui/ErrorMessage';
import { Loader } from '../components/ui/Loader';
import { useCatalog } from '../hooks/useCatalog';

export function CatalogPage() {
  const catalog = useCatalog();

  if (catalog.status === 'loading') {
    return <Loader label="Chargement du catalogue…" />;
  }

  if (catalog.status === 'error') {
    return (
      <ErrorMessage
        title="Catalogue indisponible"
        message="Impossible de joindre le serveur. Vérifie ta connexion puis réessaie."
        onRetry={catalog.retry}
      />
    );
  }

  // Affichage provisoire : les cartes + la pagination arrivent à l'étape 4.
  return (
    <section>
      <h1>Catalogue</h1>
      <p>{catalog.data.length} pièces chargées</p>
      <ul>
        {catalog.data.map((piece) => (
          <li key={piece.id}>
            {piece.title} — {piece.brand ?? 'Marque inconnue'} ({piece.gender})
          </li>
        ))}
      </ul>
    </section>
  );
}
