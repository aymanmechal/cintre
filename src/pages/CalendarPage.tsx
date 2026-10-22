import { CalendarHeader } from '../components/calendar/CalendarHeader/CalendarHeader';
import { CalendarWorkspace } from '../components/calendar/CalendarWorkspace/CalendarWorkspace';
import { formatPageTitle } from '../utils/format';

export function CalendarPage() {
  return (
    <section>
      <title>{formatPageTitle('Mon calendrier')}</title>
      <CalendarHeader />
      <CalendarWorkspace />
    </section>
  );
}
