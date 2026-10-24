import {
  WRAPPED_PERIOD_LABELS,
  WRAPPED_PERIODS,
  type WrappedPeriod,
} from '../../constants/wrapped';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import styles from './WrappedPeriodSwitch.module.css';

interface WrappedPeriodSwitchProps {
  period: WrappedPeriod;
  onChange: (period: WrappedPeriod) => void;
}

export function WrappedPeriodSwitch({ period, onChange }: WrappedPeriodSwitchProps) {
  return (
    <div className={styles.switch} role="group" aria-label="Période">
      {WRAPPED_PERIODS.map((option) => (
        <Button
          key={option}
          variant={option === period ? ButtonVariant.Primary : ButtonVariant.Ghost}
          aria-pressed={option === period}
          onClick={() => onChange(option)}
        >
          {WRAPPED_PERIOD_LABELS[option]}
        </Button>
      ))}
    </div>
  );
}
