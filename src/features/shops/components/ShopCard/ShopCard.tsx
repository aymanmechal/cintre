import type { CSSProperties } from 'react';
import type { Shop } from '../../types/shop';
import { ShopLogo } from './ShopLogo';
import styles from './ShopCard.module.css';

const OPEN_ICON = '↗';

interface ShopCardProps {
  shop: Shop;
}

export function ShopCard({ shop }: ShopCardProps) {
  const style = { '--shop-color': shop.color } as CSSProperties;

  return (
    <a
      className={styles.card}
      style={style}
      href={shop.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ShopLogo shop={shop} />
      <span className={styles.initial} aria-hidden="true">
        {shop.name.charAt(0)}
      </span>
      <span className={styles.name}>{shop.name}</span>
      <span className={styles.open} aria-hidden="true">
        {OPEN_ICON}
      </span>
    </a>
  );
}
