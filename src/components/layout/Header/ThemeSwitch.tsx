import { THEME_SWITCH_ICONS, THEME_SWITCH_LABELS } from '../../../constants/theme';
import { useTheme } from '../../../contexts/theme/useTheme';
import styles from './ThemeSwitch.module.css';

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const label = THEME_SWITCH_LABELS[theme];

  return (
    <button
      className={styles.themeSwitch}
      type="button"
      aria-label={label}
      title={label}
      onClick={toggleTheme}
    >
      <span aria-hidden="true">{THEME_SWITCH_ICONS[theme]}</span>
    </button>
  );
}
