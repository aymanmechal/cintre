import { DAYS_PER_WEEK } from '../constants/calendar';
import type { CalendarDay, CalendarMonth } from '../types/calendar';
import { toIsoDate } from '../../wardrobe/utils/wornDates';

function countDaysInMonth({ year, month }: CalendarMonth): number {
  return new Date(year, month + 1, 0).getDate();
}

function countLeadingDays({ year, month }: CalendarMonth): number {
  const firstWeekday = new Date(year, month, 1).getDay();
  return (firstWeekday + DAYS_PER_WEEK - 1) % DAYS_PER_WEEK;
}

export function buildMonthGrid(calendarMonth: CalendarMonth): CalendarDay[] {
  const leadingDays = countLeadingDays(calendarMonth);
  const weekCount = Math.ceil((leadingDays + countDaysInMonth(calendarMonth)) / DAYS_PER_WEEK);

  return Array.from({ length: weekCount * DAYS_PER_WEEK }, (_, index) => {
    const date = new Date(calendarMonth.year, calendarMonth.month, 1 - leadingDays + index);
    return {
      isoDate: toIsoDate(date),
      dayNumber: date.getDate(),
      isCurrentMonth: date.getMonth() === calendarMonth.month,
    };
  });
}

export function monthOfDate(date: Date): CalendarMonth {
  return { year: date.getFullYear(), month: date.getMonth() };
}

export function monthOfIsoDate(isoDate: string): CalendarMonth {
  return monthOfDate(new Date(`${isoDate}T00:00:00`));
}

export function shiftMonth({ year, month }: CalendarMonth, offset: number): CalendarMonth {
  return monthOfDate(new Date(year, month + offset, 1));
}

export function formatMonthTitle({ year, month }: CalendarMonth): string {
  return new Date(year, month, 1).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
}

export function formatFullDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}
