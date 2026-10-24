import { TextField } from '../../../../shared/ui/Form/TextField';

interface WardrobeSearchFieldProps {
  value: string;
  onChange: (search: string) => void;
}

export function WardrobeSearchField({ value, onChange }: WardrobeSearchFieldProps) {
  return (
    <TextField
      id="wardrobe-search"
      label="Rechercher"
      placeholder="Nom, marque, tag…"
      value={value}
      onChange={onChange}
    />
  );
}
