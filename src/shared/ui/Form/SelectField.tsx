import { FieldLayout } from './fieldLayout';
import type { SelectOption } from './selectOption';
import styles from './SelectField.module.css';

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  options: readonly SelectOption[];
  onChange: (value: string) => void;
  layout?: FieldLayout;
}

export function SelectField({
  id,
  label,
  value,
  options,
  onChange,
  layout = FieldLayout.Inline,
}: SelectFieldProps) {
  return (
    <div className={`${styles.field} ${styles[layout]}`}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
