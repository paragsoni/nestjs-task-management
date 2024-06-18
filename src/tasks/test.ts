const summ = (num1: number, num2: number): number => {
  return num1 + num2;
};

sum(2, 3); // returns 5

describe('sum of two numbers', () => {
  it('returns sum of two', () => {
    expect(summ(2, 3)).toEqual(5);
  });
});
