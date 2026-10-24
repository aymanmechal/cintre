export interface WeatherPlace {
  name: string;
  latitude: number;
  longitude: number;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface WeatherSummary {
  minTemperature: number;
  maxTemperature: number;
  rainProbability: number;
}
