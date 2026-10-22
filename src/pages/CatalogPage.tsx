import { CatalogHeader } from '../components/catalog/CatalogHeader';
import { CatalogResults } from '../components/catalog/CatalogResults';
import { CatalogToolbar } from '../components/catalog/CatalogToolbar';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { Loader } from '../components/ui/Loader';
import { useCatalog } from '../hooks/useCatalog';

export function CatalogPage() {
  const catalog = useCatalog();

  return (
    <section>
      <CatalogHeader />
      <CatalogToolbar />

      {catalog.status === 'loading' && <Loader label="Chargement du catalogue…" />}
      {catalog.status === 'error' && (
        <ErrorMessage
          title="Catalogue indisponible"
          message="Impossible de joindre le serveur. Vérifie ta connexion puis réessaie."
          onRetry={catalog.retry}
        />
      )}
      {catalog.status === 'success' && <CatalogResults pieces={catalog.data} />}
    </section>
  );
}
