import { useState } from 'react';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { TextField } from '../../../../shared/ui/Form/TextField';
import { TextFieldType } from '../../../../shared/ui/Form/textFieldType';
import { useMonthlyBudget } from '../../hooks/useMonthlyBudget';
import { formatBudgetMessage } from '../../utils/budgetMessages';
import styles from './BudgetCard.module.css';

export function BudgetCard() {
  const budget = useMonthlyBudget();
  const [text, setText] = useState('');

  function submit() {
    if (budget.saveBudget(text)) setText('');
  }

  return (
    <section className={styles.card} aria-labelledby="budget-title">
      <h2 id="budget-title" className={styles.title}>
        Budget du mois
      </h2>
      {budget.budget !== null && (
        <div className={styles.progress}>
          <progress
            className={styles.bar}
            data-over={budget.usage.isOver}
            aria-label="Budget du mois utilisé"
            max={budget.budget}
            value={Math.min(budget.usage.spent, budget.budget)}
          />
          <p className={styles.message}>
            {formatBudgetMessage(budget.budget, budget.usage, budget.purchaseCount)}
          </p>
        </div>
      )}
      {budget.budget === null && (
        <p className={styles.message}>
          Fixe un montant pour les vêtements : on compte les pièces achetées ce mois-ci.
        </p>
      )}
      <div className={styles.form}>
        <TextField
          id="monthly-budget"
          label="Budget mensuel (€)"
          type={TextFieldType.Number}
          placeholder="Ex. 100"
          value={text}
          error={budget.errorMessage ?? undefined}
          onChange={setText}
        />
        <Button onClick={submit}>{budget.budget === null ? 'Fixer le budget' : 'Modifier'}</Button>
        {budget.budget !== null && (
          <Button variant={ButtonVariant.Ghost} onClick={budget.removeBudget}>
            Retirer le budget
          </Button>
        )}
      </div>
    </section>
  );
}
