import styles from './CheckboxField.module.css';

interface CheckboxFieldProps {
  id: string;
  label: string;
  isChecked: boolean;
  isDisabled?: boolean;
  onChange: () => void;
}

export function CheckboxField({
  id,
  label,
  isChecked,
  isDisabled = false,
  onChange,
}: CheckboxFieldProps) {
  return (
    <label className={styles.field} htmlFor={id}>
      <input
        id={id}
        data-testid={id}
        className={styles.input}
        type="checkbox"
        checked={isChecked}
        disabled={isDisabled}
        onChange={onChange}
      />
      {label}
    </label>
  );
}
