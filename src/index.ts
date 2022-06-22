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

// // TODO: add some color to console output(?)
// // TODO: write a readme w/ instructions to install, build, & run

export class Calculator {
  private _values: number[];

  constructor() {
    this._values = [];
  }

  get values(): number[] {
    return this._values;
  }
  handleCalculation(input: string): string {
    try {
      const result: number = rpnCalculator(input);
      this._values = [result];
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
      // see if value is operand or operator. if operand, push to values array else calculate
      if (isValidOperand(rpnInput)) {
        this._values = [...this.values, parseFloat(rpnInput)];
        return rpnInput;
      }

      if (isOperator(rpnInput)) {
        const equation = formatEquationForCalculation(this.values, rpnInput);
        // TODO: 
        // check to see if equation is valid, if not enough operands store equation and wait for additional user input
        // if valid, handleCalculation
        return this.handleCalculation(equation);
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
calculatorInterface.setPrompt('> ');
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
