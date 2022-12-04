import React from 'react';
import { EventsCalendar } from './EventsCalendar';

export default { title: 'EventsCalendar' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <EventsCalendar />
    </div>
  );
}
