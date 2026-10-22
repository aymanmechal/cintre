export interface CalendarMonth {
  year: number;
  month: number;
}

export interface CalendarDay {
  isoDate: string;
  dayNumber: number;
  isCurrentMonth: boolean;
}
