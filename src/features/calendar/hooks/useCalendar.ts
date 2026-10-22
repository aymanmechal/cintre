import { useState } from 'react';
import type { CalendarDay, CalendarMonth } from '../types/calendar';
import {
  buildMonthGrid,
  formatMonthTitle,
  monthOfDate,
  monthOfIsoDate,
  shiftMonth,
} from '../utils/calendarMonth';
import { toIsoDate } from '../../wardrobe/utils/wornDates';
import { useToday } from '../../../shared/hooks/useToday';

export interface CalendarState {
  monthTitle: string;
  days: CalendarDay[];
  today: Date;
  selectedDate: string;
  selectDate: (isoDate: string) => void;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
}

export function useCalendar(): CalendarState {
  const today = useToday();
  const [visibleMonth, setVisibleMonth] = useState<CalendarMonth>(() => monthOfDate(today));
  const [selectedDate, setSelectedDate] = useState(() => toIsoDate(today));

  function selectDate(isoDate: string) {
    setSelectedDate(isoDate);
    setVisibleMonth(monthOfIsoDate(isoDate));
  }

  return {
    monthTitle: formatMonthTitle(visibleMonth),
    days: buildMonthGrid(visibleMonth),
    today,
    selectedDate,
    selectDate,
    goToPreviousMonth: () => setVisibleMonth((month) => shiftMonth(month, -1)),
    goToNextMonth: () => setVisibleMonth((month) => shiftMonth(month, 1)),
    goToToday: () => selectDate(toIsoDate(today)),
  };
}
