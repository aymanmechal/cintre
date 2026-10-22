import { CatalogHeader } from '../components/CatalogHeader/CatalogHeader';
import { CatalogResults } from '../components/Results/CatalogResults';
import { CatalogToolbar } from '../components/Filters/CatalogToolbar';
import { ErrorMessage } from '../../../shared/ui/ErrorMessage/ErrorMessage';
import { Loader } from '../../../shared/ui/Loader/Loader';
import { AsyncStatus } from '../../../shared/hooks/asyncStatus';
import { useCatalog } from '../hooks/useCatalog';
import { listBrands } from '../utils/filterPieces';
import { formatPageTitle } from '../../../shared/utils/format';

export function CatalogPage() {
  const catalog = useCatalog();
  const brands = catalog.status === AsyncStatus.Success ? listBrands(catalog.data) : [];

  return (
    <section>
      <title>{formatPageTitle('Catalogue')}</title>
      <CatalogHeader />
      <CatalogToolbar brands={brands} />

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
