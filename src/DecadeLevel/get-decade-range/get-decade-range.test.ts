import { getDecadeRange } from './get-decade-range';

describe('@mantine/dates/get-decades-range', () => {
  it('returns correct range based on given date', () => {
    expect(getDecadeRange(new Date(2022, 0))).toStrictEqual([new Date(2019, 0), new Date(2030, 0)]);
    expect(getDecadeRange(new Date(2011, 0))).toStrictEqual([new Date(2009, 0), new Date(2020, 0)]);
  });
});
