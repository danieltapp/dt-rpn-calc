#!/usr/bin/env node
import { Command } from 'commander';
import rpnCalculator from './rpnCalculator';
// TODO: write tests
// TODO: add some color to console output(?)
// TODO: write a readme w/ instructions to install, build, & run

async function run(): Promise<void> {
  const program = new Command();
  program.argument('<rpnCalcInput>, Reverse polish notation input').parse();
  const [rpnCalcInput] = program.args;

  try {
    const result: number = rpnCalculator(rpnCalcInput);
    console.log(`Result : ${result}`);
  } catch (e) {
    console.error(e);
  }
}

run();
