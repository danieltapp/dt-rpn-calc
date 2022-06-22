#!/usr/bin/env node
import * as readline from 'readline';
import rpnCalculator from './rpnCalculator';
import {
  errorMessages,
  getEquationCharacters,
  isOperator,
  isValidOperand,
  formatEquationForCalculation,
} from './utils';

export class Calculator {
  private _values: number[];

  constructor() {
    this._values = [];
  }

  get values(): number[] {
    return this._values;
  }

  get result(): number {
    return this.values?.pop() as number;
  }

  handleCalculation(input: string): string {
    try {
      const result: number = rpnCalculator(input);
      this._values =
        this._values.length >= 1 ? [...this._values, result] : [result];
      return result.toString();
    } catch (e) {
      throw e;
    }
  }

  calculate(rpnInput: string): string {
    const equationCharacters = getEquationCharacters(rpnInput);

    if (equationCharacters.length > 1) {
      if (this.values.length === 0) {
        return this.handleCalculation(rpnInput);
      } else {
        const equation = formatEquationForCalculation(this.values, rpnInput);
        return this.handleCalculation(equation);
      }
    } else {
      if (isValidOperand(rpnInput)) {
        this._values = [...this.values, parseFloat(rpnInput)];
        return rpnInput;
      }

      if (isOperator(rpnInput)) {
        if (this.values.length > 2) {
          const [a, b] = [this._values.pop(), this._values.pop()];
          const equation = formatEquationForCalculation(
            [b as number, a as number],
            rpnInput,
          );
          return this.handleCalculation(equation);
        } else {
          const equation = formatEquationForCalculation(this.values, rpnInput);
          return this.handleCalculation(equation);
        }
      } else {
        throw errorMessages.invalidCharacter(rpnInput);
      }
    }
  }
}

const calculatorInterface = readline.createInterface(
  process.stdin,
  process.stdout,
);
const calculator = new Calculator();
calculatorInterface.setPrompt('rpn calculator> ');
calculatorInterface.prompt();

calculatorInterface
  .on('line', function (line: string) {
    switch (line.trim()) {
      case 'q':
        console.log('Exiting...');
        process.exit(0);
      default:
        try {
          const result: string = calculator.calculate(line);
          console.log(result);
        } catch (e) {
          console.log(e);
        }
        break;
    }
    calculatorInterface.prompt();
  })
  .on('close', function () {
    process.exit(0);
  });
