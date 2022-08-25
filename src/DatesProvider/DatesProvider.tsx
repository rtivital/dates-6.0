import React, { createContext, useContext } from 'react';
import { DayOfWeek } from '../types';

export interface DatesProviderValue {
  locale: string;
  firstDayOfWeek: DayOfWeek;
  weekendDays: DayOfWeek[];
}

interface DatesProviderFunctions {
  getLocale(input?: string): string;
  getFirstDayOfWeek(input?: DayOfWeek): number;
  getWeekendDays(input?: DayOfWeek[]): DayOfWeek[];
}

export type DatesProviderSettings = Partial<DatesProviderValue>;

export const DATES_PROVIDER_DEFAULT_SETTINGS: DatesProviderValue & DatesProviderFunctions = {
  locale: 'en',
  firstDayOfWeek: 1,
  weekendDays: [0, 6],
  getLocale: (input) => input || 'en',
  getFirstDayOfWeek: (input) => (typeof input === 'number' ? input : 1),
  getWeekendDays: (input) => (Array.isArray(input) ? input : [0, 6]),
};

const DatesProviderContext = createContext(DATES_PROVIDER_DEFAULT_SETTINGS);

export function useDatesContext() {
  return useContext(DatesProviderContext);
}

export interface DatesProviderProps {
  settings: DatesProviderSettings;
  children: React.ReactNode;
}

export function DatesProvider({ settings, children }: DatesProviderProps) {
  const functions: DatesProviderFunctions = {
    getLocale: (input) => input || settings.locale,
    getFirstDayOfWeek: (input) => (typeof input === 'number' ? input : settings.firstDayOfWeek),
    getWeekendDays: (input) => (Array.isArray(input) ? input : settings.weekendDays),
  };

  return (
    <DatesProviderContext.Provider
      value={{ ...DATES_PROVIDER_DEFAULT_SETTINGS, ...settings, ...functions }}
    >
      {children}
    </DatesProviderContext.Provider>
  );
}
