import { CatalogHeader } from '../components/catalog/CatalogHeader/CatalogHeader';
import { CatalogResults } from '../components/catalog/Results/CatalogResults';
import { CatalogToolbar } from '../components/catalog/Filters/CatalogToolbar';
import { ErrorMessage } from '../components/ui/ErrorMessage/ErrorMessage';
import { Loader } from '../components/ui/Loader/Loader';
import { AsyncStatus } from '../hooks/asyncStatus';
import { useCatalog } from '../hooks/useCatalog';

export function CatalogPage() {
  const catalog = useCatalog();

  return (
    <section>
      <CatalogHeader />
      <CatalogToolbar />

      {catalog.status === AsyncStatus.Loading && <Loader label="Chargement du catalogue…" />}
      {catalog.status === AsyncStatus.Error && (
        <ErrorMessage
          title="Catalogue indisponible"
          message="Impossible de joindre le serveur. Vérifie ta connexion puis réessaie."
          onRetry={catalog.retry}
        />
      )}
      {catalog.status === AsyncStatus.Success && <CatalogResults pieces={catalog.data} />}
    </section>
  );
}
