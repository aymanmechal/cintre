import { CalendarHeader } from '../components/CalendarHeader/CalendarHeader';
import { CalendarWorkspace } from '../components/CalendarWorkspace/CalendarWorkspace';
import { formatPageTitle } from '../../../shared/utils/format';

export function CalendarPage() {
  return (
    <section>
      <title>{formatPageTitle('Mon calendrier')}</title>
      <CalendarHeader />
      <CalendarWorkspace />
    </section>
  );
}
