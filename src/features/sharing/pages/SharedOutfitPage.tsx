import { Link, useParams } from 'react-router';
import { ROUTES } from '../../../shared/routes';
import { formatPageTitle } from '../../../shared/utils/format';
import { SharedLooks } from '../components/SharedLooks/SharedLooks';
import { VoteChoices } from '../components/VoteChoices/VoteChoices';
import { SharedPageStatus } from '../constants/sharing';
import { useSharedOutfit } from '../hooks/useSharedOutfit';
import { buildVoteChoices, countVotes, isPoll } from '../utils/sharing';
import styles from './SharedOutfitPage.module.css';

function SharedOutfitContent({ shareId }: { shareId: string }) {
  const { status, shared, hasVoted, vote } = useSharedOutfit(shareId);

  if (status === SharedPageStatus.Loading) return <p>Un instant…</p>;
  if (shared === null) return <h1 className={styles.title}>Ce lien n’existe plus 🙈</h1>;

  return (
    <>
      <title>{formatPageTitle(shared.title)}</title>
      <h1 className={styles.title}>{shared.title}</h1>
      <p className={styles.question}>
        {isPoll(shared) ? 'Laquelle je mets ? Vote pour ta préférée.' : 'Ton avis sur ma tenue ?'}
      </p>
      <SharedLooks looks={shared.looks} />
      <VoteChoices
        choices={buildVoteChoices(shared)}
        counts={countVotes(shared.votes)}
        hasVoted={hasVoted}
        onVote={vote}
      />
      {hasVoted && <p className={styles.thanks}>Merci pour ton avis 💛</p>}
    </>
  );
}

export function SharedOutfitPage() {
  const { id = '' } = useParams();

  return (
    <main className={styles.page}>
      <Link to={ROUTES.home} className={styles.brand}>
        Cintré
      </Link>
      <SharedOutfitContent shareId={id} />
      <Link to={ROUTES.home} className={styles.cta}>
        Crée ta garde-robe sur Cintré
      </Link>
    </main>
  );
}
