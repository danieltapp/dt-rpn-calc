import rpnCalculator from './rpnCalculator';
import { errorMessages, getEquationCharacters, isValidOperand } from './utils';

it('calculates rpn expression', () => {
  expect(rpnCalculator('3 4 +')).toEqual(7);
  expect(rpnCalculator('3 4 -')).toEqual(-1);
  expect(rpnCalculator('5 2 8 + 3 * + 1 -')).toEqual(34);
});

it('throws error if input is not valid', () => {
  const { invalidCharacter, invalidRpnInput } = errorMessages;
  // insufficient # of operators
  const invalidRpnExample1 = '2 3 + 4';
  expect(() => rpnCalculator(invalidRpnExample1)).toThrow(
    invalidRpnInput(invalidRpnExample1),
  );

  // too many operators in equation
  const invalidRpnExample2 = '1 0 - 1 + +';
  expect(() => rpnCalculator(invalidRpnExample2)).toThrow(
    invalidRpnInput(invalidRpnExample2),
  );

  // invalid character used for multiplication operator
  const invalidOperandExample = '2 3 x';
  const invalidChar = getEquationCharacters(invalidOperandExample)
    .filter((char) => !isValidOperand(char))
    .pop() as string;
  expect(() => rpnCalculator(invalidOperandExample)).toThrow(
    invalidCharacter(invalidChar),
  );
});
