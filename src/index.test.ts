import { Calculator } from '.';

// test the calculator class
let calculator: Calculator;

beforeEach(() => {
  calculator = new Calculator();
});

it('calculates individual operator/operand inputs', () => {
  calculator.calculate('5');
  calculator.calculate('5');
  calculator.calculate('+');
  expect(calculator.values.join(' ')).toBe('10');
});

it('calculates both npr equations and individual operator/operand inputs', () => {
  calculator.calculate('5 5 5 8 + + -');
  expect(calculator.values.join(' ')).toBe('-13');
  calculator.calculate('13 +');
  expect(calculator.values.join(' ')).toBe('0');
});

it('calculates negative and positive operands correctly', () => {
  calculator.calculate('-3');
  calculator.calculate('-2');
  calculator.calculate('*');
  expect(calculator.values.join(' ')).toBe('6');
  calculator.calculate('5');
  calculator.calculate('+');
  expect(calculator.values.join(' ')).toBe('11');
});

it('returns correct value by using a division operator at the end', () => {
  calculator.calculate('5');
  calculator.calculate('9');
  calculator.calculate('1');
  calculator.calculate('-');
  calculator.calculate('/');
  expect(calculator.values.join(' ')).toBe('0.625');
});
