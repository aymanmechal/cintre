import { ButtonLink } from '../../../shared/ui/Button/ButtonLink';
import { EmptyState } from '../../../shared/ui/EmptyState/EmptyState';
import { PageHeader } from '../../../shared/ui/PageHeader/PageHeader';
import { ROUTES } from '../../../shared/routes';
import { formatPageTitle } from '../../../shared/utils/format';
import { StyleProfileCard } from '../components/StyleProfileCard/StyleProfileCard';
import { useStyleProfile } from '../hooks/useStyleProfile';

export function StyleProfilePage() {
  const profile = useStyleProfile();

  return (
    <section>
      <title>{formatPageTitle('Mon profil de style')}</title>
      <PageHeader
        title="Mon profil de style"
        subtitle="Ce que tes tenues et tes 👍 disent de toi."
      />
      {profile ? (
        <StyleProfileCard profile={profile} />
      ) : (
        <EmptyState
          title="Pas encore assez de matière"
          message="Garde quelques tenues ou aime des idées avec 👍 : ton profil apparaît tout seul."
          action={<ButtonLink to={ROUTES.outfits}>Créer une tenue</ButtonLink>}
        />
      )}
    </section>
  );
}
