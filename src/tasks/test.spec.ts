const sum = (num1: number, num2: number): number => num1 + num2;

describe('This is sample test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
    expect(false).toEqual(false);
    expect(sum(2, 2)).toEqual(4);
    expect('Test string').toEqual('Test string');
  });
});
