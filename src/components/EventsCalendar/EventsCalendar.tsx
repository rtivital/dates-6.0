import React from 'react';
import { EventsMonth } from './EventsMonth/EventsMonth';

export function EventsCalendar() {
  return <EventsMonth month={new Date(2022, 11, 1)} />;
}
