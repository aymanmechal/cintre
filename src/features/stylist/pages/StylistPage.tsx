import { ROUTES } from '../../../shared/routes';
import { ButtonLink } from '../../../shared/ui/Button/ButtonLink';
import { PageHeader } from '../../../shared/ui/PageHeader/PageHeader';
import { formatPageTitle } from '../../../shared/utils/format';
import { StylistFeedback } from '../components/StylistFeedback/StylistFeedback';
import { StylistForm } from '../components/StylistForm/StylistForm';
import { StylistResult } from '../components/StylistResult/StylistResult';
import { StylistStatus } from '../constants/stylist';
import { useStylist } from '../hooks/useStylist';
import styles from './StylistPage.module.css';

export function StylistPage() {
  const stylist = useStylist();

  return (
    <section className={styles.page}>
      <title>{formatPageTitle('Mon styliste')}</title>
      <PageHeader
        title="Mon styliste"
        subtitle="Dis-lui ton envie, il compose une tenue avec ce que tu as déjà."
      />
      {stylist.hasPieces ? (
        <StylistForm
          wish={stylist.wish}
          isThinking={stylist.status === StylistStatus.Thinking}
          onWishChange={stylist.changeWish}
          onSubmit={stylist.submit}
        />
      ) : (
        <div className={styles.empty}>
          <p>Ajoute d’abord quelques pièces disponibles, le styliste en a besoin.</p>
          <ButtonLink to={ROUTES.addPiece}>Ajouter une pièce</ButtonLink>
        </div>
      )}
      <StylistFeedback status={stylist.status} />
      {stylist.suggestion && (
        <StylistResult
          suggestion={stylist.suggestion}
          keptOutfitName={stylist.keptOutfitName}
          onKeep={stylist.keepSuggestion}
        />
      )}
    </section>
  );
}
