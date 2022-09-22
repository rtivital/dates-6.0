import { getInitialLevel } from './get-initial-level';

describe('@mantine/dates/get-initial-level', () => {
  it('returns correct initial level', () => {
    expect(getInitialLevel('month', 'month', 'decade')).toBe('month');
    expect(getInitialLevel('month', undefined, undefined)).toBe('month');
    expect(getInitialLevel(undefined, undefined, undefined)).toBe('month');
    expect(getInitialLevel(undefined, 'month', 'decade')).toBe('month');
    expect(getInitialLevel('decade', 'month', 'month')).toBe('month');
    expect(getInitialLevel('decade', undefined, 'month')).toBe('month');

    expect(getInitialLevel(undefined, 'year', 'decade')).toBe('year');
    expect(getInitialLevel('month', 'year', 'decade')).toBe('year');
    expect(getInitialLevel('decade', 'month', 'year')).toBe('year');

    expect(getInitialLevel(undefined, 'decade', 'decade')).toBe('decade');
    expect(getInitialLevel(undefined, 'decade', undefined)).toBe('decade');
    expect(getInitialLevel('month', 'decade', undefined)).toBe('decade');
    expect(getInitialLevel('year', 'decade', undefined)).toBe('decade');
    expect(getInitialLevel('decade', 'decade', undefined)).toBe('decade');
  });
});
