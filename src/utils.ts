export interface operators {
  [character: string]: (a: number, b: number) => number;
}

export const operators: operators = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

export const isWhiteSpace = /\s+/;

export const isValidOperand = (character: string): boolean =>
  !isNaN(parseFloat(character)) && isFinite(Number(character));

export const isOperator = (character: string): boolean =>
  Object.keys(operators).includes(character);

export const errorMessages: { [key: string]: (label: string) => string } = {
  invalidCharacter: (character) => `${character} is not a valid character`,
  invalidRpnInput: (rpnInput) =>
    `${rpnInput} is not correct reverse polish notation. Please try again`,
};

export function getEquationCharacters(rpnInput: string): string[] {
  return rpnInput
    .split(new RegExp(isWhiteSpace, 'g'))
    .filter((el) => !isWhiteSpace.test(el) && el !== '');
}

export function formatEquationForCalculation(
  values: number[],
  input: string,
): string {
  return `${values.join(' ')} ${input}`;
}
