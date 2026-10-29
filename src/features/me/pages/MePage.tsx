import { PageHeader } from '../../../shared/ui/PageHeader/PageHeader';
import { formatPageTitle } from '../../../shared/utils/format';
import { InstallAppButton } from '../components/InstallAppButton/InstallAppButton';
import { MeSectionBlock } from '../components/MeSectionBlock/MeSectionBlock';
import { useMeSections } from '../hooks/useMeSections';
import styles from './MePage.module.css';

export function MePage() {
  const sections = useMeSections();

  return (
    <section className={styles.page}>
      <title>{formatPageTitle('Moi')}</title>
      <PageHeader
        title="Moi"
        subtitle="Ton style, tes chiffres et tes réglages, au même endroit."
      />
      {sections.map((view) => (
        <MeSectionBlock key={view.section} view={view} />
      ))}
      <InstallAppButton />
    </section>
  );
}
