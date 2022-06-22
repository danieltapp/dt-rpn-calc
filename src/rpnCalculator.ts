import {
  getEquationCharacters,
  isValidOperand,
  isOperator,
  operators,
  errorMessages,
} from './utils';

export default function rpnCalculator(rpnInput: string): number {
  const [operands, equation] = [
    [] as number[],
    getEquationCharacters(rpnInput),
  ];
  const { invalidCharacter, invalidRpnInput } = errorMessages;

  // Iterate through equation characters and either populate operands array or execute operator on operands
  equation.forEach((character: string) => {
    if (isValidOperand(character)) {
      // add numbers to array of operands
      operands.push(parseFloat(character));
    } else if (isOperator(character)) {
      // run operation on last 2 operands and push output to operands array
      const [a, b] = [operands.pop() as number, operands.pop() as number];
      operands.push(operators[character](b, a));
    } else {
      throw invalidCharacter(character);
    }
  });

  // return remaining operand if there is one or throw error
  if (operands.length === 1) {
    const result = operands.pop() as number;
    if (isNaN(result)) {
      // in the event that too many operands are provided, throw error
      throw invalidRpnInput(rpnInput);
    }
    return result;
  } else throw invalidRpnInput(rpnInput);
}
