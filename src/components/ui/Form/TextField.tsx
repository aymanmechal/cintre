import { FieldError } from './FieldError';
import { TextFieldType } from './textFieldType';
import styles from './TextField.module.css';

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: TextFieldType;
  placeholder?: string;
  isRequired?: boolean;
  error?: string;
}

export function TextField({
  id,
  label,
  value,
  onChange,
  type = TextFieldType.Text,
  placeholder,
  isRequired = false,
  error,
}: TextFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {isRequired && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        className={styles.input}
        type={type}
        value={value}
        placeholder={placeholder}
        required={isRequired}
        aria-invalid={error !== undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && <FieldError id={errorId} message={error} />}
    </div>
  );
}
