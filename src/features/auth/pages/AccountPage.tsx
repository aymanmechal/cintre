import { PageHeader } from '../../../shared/ui/PageHeader/PageHeader';
import { formatPageTitle } from '../../../shared/utils/format';
import { AccountForm } from '../components/AccountForm/AccountForm';
import { AccountSummary } from '../components/AccountSummary/AccountSummary';
import { AuthStatus } from '../constants/auth';
import { useAuth } from '../context/useAuth';

function AccountContent() {
  const auth = useAuth();

  if (!auth.isAvailable) return <p>La synchronisation n’est pas encore configurée.</p>;
  if (auth.status === AuthStatus.Loading) return <p>Un instant…</p>;
  if (auth.user) return <AccountSummary user={auth.user} onSignOut={() => void auth.signOut()} />;
  return <AccountForm />;
}

export function AccountPage() {
  return (
    <section>
      <title>{formatPageTitle('Mon compte')}</title>
      <PageHeader
        title="Mon compte"
        subtitle="Connecte-toi une fois et retrouve ta garde-robe sur tous tes appareils."
      />
      <AccountContent />
    </section>
  );
}
