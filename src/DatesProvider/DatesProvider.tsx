import React, { createContext, useContext } from 'react';
import { DayOfWeek } from '../types';

export interface DatesProviderValue {
  locale: string;
  firstDayOfWeek: DayOfWeek;
  weekendDays: DayOfWeek[];
}

export type DatesProviderSettings = Partial<DatesProviderValue>;

export const DATES_PROVIDER_DEFAULT_SETTINGS: DatesProviderValue = {
  locale: 'en',
  firstDayOfWeek: 1,
  weekendDays: [0, 6],
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
  return (
    <DatesProviderContext.Provider value={{ ...DATES_PROVIDER_DEFAULT_SETTINGS, ...settings }}>
      {children}
    </DatesProviderContext.Provider>
  );
}
