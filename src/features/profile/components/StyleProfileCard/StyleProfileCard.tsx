import { Link } from 'react-router';
import { OCCASION_LABELS } from '../../../outfits/constants/occasions';
import {
  PIECE_COLOR_LABELS,
  PIECE_COLOR_SWATCHES,
} from '../../../../shared/pieces/constants/colors';
import { buildEditPieceUrl } from '../../../../shared/routes';
import { formatBrand } from '../../../../shared/utils/format';
import { RISK_DESCRIPTIONS, RISK_EMOJIS, RISK_TITLES } from '../../constants/profile';
import type { StyleProfile } from '../../types/profile';
import styles from './StyleProfileCard.module.css';

interface StyleProfileCardProps {
  profile: StyleProfile;
}

export function StyleProfileCard({ profile }: StyleProfileCardProps) {
  return (
    <div className={styles.profile}>
      <section className={styles.block} aria-labelledby="profile-risk">
        <h2 id="profile-risk" className={styles.title}>
          Ton style
        </h2>
        <p className={styles.big}>
          <span aria-hidden="true">{RISK_EMOJIS[profile.risk]} </span>
          {RISK_TITLES[profile.risk]}
        </p>
        <p className={styles.hint}>{RISK_DESCRIPTIONS[profile.risk]}</p>
      </section>
      <section className={styles.block} aria-labelledby="profile-colors">
        <h2 id="profile-colors" className={styles.title}>
          Tes couleurs
        </h2>
        <ul className={styles.list}>
          {profile.topColors.map(({ color, share }) => (
            <li key={color} className={styles.row}>
              <span
                className={styles.swatch}
                style={{ background: PIECE_COLOR_SWATCHES[color] }}
                aria-hidden="true"
              />
              <span>{PIECE_COLOR_LABELS[color]}</span>
              <strong>{share} %</strong>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.block} aria-labelledby="profile-pieces">
        <h2 id="profile-pieces" className={styles.title}>
          Tes pièces fétiches
        </h2>
        <ul className={styles.list}>
          {profile.favoritePieces.map(({ piece }) => (
            <li key={piece.id}>
              <Link to={buildEditPieceUrl(piece.id)} className={styles.pieceLink}>
                <span className={styles.pieceName}>{piece.title}</span>
                <span className={styles.pieceBrand}>{formatBrand(piece.brand)}</span>
                <span className={styles.pieceArrow} aria-hidden="true">
                  ›
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {profile.favoriteOccasion && (
        <p className={styles.hint}>
          Tu composes surtout pour : {OCCASION_LABELS[profile.favoriteOccasion].toLowerCase()}.
        </p>
      )}
    </div>
  );
}
