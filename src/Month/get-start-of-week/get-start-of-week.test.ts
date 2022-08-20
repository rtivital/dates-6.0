import { getStartOfWeek } from './get-start-of-week';

describe('@mantine/dates/get-start-of-week', () => {
  it('returns start of week without first day of week param', () => {
    expect(getStartOfWeek(new Date(2021, 1, 5))).toStrictEqual(new Date(2021, 1, 1));
  });

  it('returns start of week with first day param', () => {
    expect(getStartOfWeek(new Date(2021, 1, 5), 6)).toStrictEqual(new Date(2021, 0, 30));
    expect(getStartOfWeek(new Date(2021, 1, 5), 5)).toStrictEqual(new Date(2021, 1, 5));
    expect(getStartOfWeek(new Date(2021, 1, 5), 4)).toStrictEqual(new Date(2021, 1, 4));
    expect(getStartOfWeek(new Date(2021, 1, 5), 3)).toStrictEqual(new Date(2021, 1, 3));
    expect(getStartOfWeek(new Date(2021, 1, 5), 2)).toStrictEqual(new Date(2021, 1, 2));
    expect(getStartOfWeek(new Date(2021, 1, 5), 1)).toStrictEqual(new Date(2021, 1, 1));
    expect(getStartOfWeek(new Date(2021, 1, 5), 0)).toStrictEqual(new Date(2021, 0, 31));
  });
});
