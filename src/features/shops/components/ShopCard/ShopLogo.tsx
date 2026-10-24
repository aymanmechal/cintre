import { useState } from 'react';
import type { Shop } from '../../types/shop';
import { buildShopLogoUrl } from '../../utils/shopLogo';
import styles from './ShopLogo.module.css';

interface ShopLogoProps {
  shop: Shop;
}

export function ShopLogo({ shop }: ShopLogoProps) {
  const [hasFailed, setHasFailed] = useState(false);

  return (
    <span className={styles.logo} aria-hidden="true">
      {hasFailed ? (
        shop.name.charAt(0)
      ) : (
        <img
          className={styles.image}
          src={buildShopLogoUrl(shop.url)}
          alt=""
          loading="lazy"
          onError={() => setHasFailed(true)}
        />
      )}
    </span>
  );
}
