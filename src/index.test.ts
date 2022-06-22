import { Calculator } from '.';
import rpnCalculator from './rpnCalculator';

let calculator: Calculator;

beforeEach(() => {
  calculator = new Calculator();
});

function handleCalculation(values: string[]): number {
  values.forEach((value) => calculator.calculate(value));
  return calculator.result;
}

it('calculates individual operator/operand inputs', () => {
  const values: string[] = ['5', '5', '+'];
  const result = handleCalculation(values);

  expect(rpnCalculator(values.join(' '))).toBe(result);
});

it('calculates both npr equations and individual operator/operand inputs', () => {
  const values: string[] = ['5 5 5 8 + + -', '13 +'];
  const result = handleCalculation(values);

  expect(rpnCalculator(values.join(' '))).toBe(result);
});

it('calculates negative and positive operands correctly', () => {
  const values: string[] = ['-3', '-2', '*', '5', '+'];
  const result = handleCalculation(values);

  expect(rpnCalculator(values.join(' '))).toBe(result);
});

it('returns correct value by using a division operator at the end', () => {
  const values: string[] = ['5', '9', '1', '-', '/'];
  const result = handleCalculation(values);

  expect(rpnCalculator(values.join(' '))).toBe(result);
});
