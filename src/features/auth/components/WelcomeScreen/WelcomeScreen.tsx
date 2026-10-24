import { formatPageTitle } from '../../../../shared/utils/format';
import { WELCOME_PROMISES } from '../../constants/welcome';
import { AccountForm } from '../AccountForm/AccountForm';
import styles from './WelcomeScreen.module.css';

export function WelcomeScreen() {
  return (
    <main className={styles.screen}>
      <title>{formatPageTitle('Bienvenue')}</title>
      <div className={styles.intro}>
        <p className={styles.wordmark}>Cintré</p>
        <h1 className={styles.title}>Ta garde-robe, enfin visible.</h1>
        <ul className={styles.promises}>
          {WELCOME_PROMISES.map((promise) => (
            <li key={promise}>{promise}</li>
          ))}
        </ul>
      </div>
      <AccountForm />
    </main>
  );
}
