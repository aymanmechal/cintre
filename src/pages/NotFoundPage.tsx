import { Link } from 'react-router';
import { ROUTES } from '../routes';

export function NotFoundPage() {
  return (
    <section>
      <h1>Page introuvable</h1>
      <p>Cette page n’existe pas (ou plus).</p>
      <Link to={ROUTES.home}>Retour à l’accueil</Link>
    </section>
  );
}
