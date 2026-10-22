import { Link } from 'react-router';
import { ROUTES } from '../routes';
import { formatPageTitle } from '../utils/format';

export function NotFoundPage() {
  return (
    <section>
      <title>{formatPageTitle('Page introuvable')}</title>
      <h1>Page introuvable</h1>
      <p>Cette page n’existe pas (ou plus).</p>
      <Link to={ROUTES.home}>Retour à l’accueil</Link>
    </section>
  );
}
