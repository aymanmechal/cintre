import { Link } from 'react-router';
import { ROUTES } from '../../../../shared/routes';
import styles from './KeptOutfitMessage.module.css';

interface KeptOutfitMessageProps {
  outfitName: string | null;
}

export function KeptOutfitMessage({ outfitName }: KeptOutfitMessageProps) {
  return (
    <p className={styles.message} role="status">
      {outfitName && (
        <>
          ✓ « {outfitName} » est dans tes tenues. <Link to={ROUTES.outfits}>Voir mes tenues</Link>
        </>
      )}
    </p>
  );
}
