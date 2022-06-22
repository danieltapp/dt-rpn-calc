# dt-rpn-calc

A Reverse Polish Notation command line calculator.

I used TypeScript as my language of choice. To keep things tidy and conventional I'm using ES-Lint & Prettier. While you may see in the commit history I was using a library to handle the CLI interface (initially Commander), I decided to use Node's built-in [readline module](https://nodejs.org/api/readline.html) to cut down on the number of 3rd party libraries required to run the project. (As a related aside, this was my first time using it and I really dug the developer experience.)

My approach on the solution was to first get the Reverse Polish Notation methods/utils knocked out and then create a calculator class & CLI interface to utilize them. The RPN calculation method lives in the [_rpnCalculator.ts_](https://github.com/danieltapp/dt-rpn-calc/blob/main/src/rpnCalculator.ts) file and the CLI specific logic/methods live in the [_index.ts_](https://github.com/danieltapp/dt-rpn-calc/blob/main/src/index.ts) file. In [_utils.ts_](https://github.com/danieltapp/dt-rpn-calc/blob/main/src/utils.ts) you'll find constants, interfaces, and helper methods shared between the two.

I tried to author a balanced amount of happy & sad path tests on the RPN calculation, as any errors being thrown would come from that method directly. The Calculator class is a wrapper intended drive the logic of the calculator interface, so I view the tests for that more as integration tests. I went the TDD route when I was building out the Calculator class and CLI interface to test out all the scenarios given to meet the MVP for this solution.

Things I would do in the future if I continued building this project out would be potentially publishing the rpnCalculator as it's own package, that would allow a user to specify options like the available operators (and add to that list as well). If the idea would be to allow other integrations (perhaps an API endpoint) then it would be nice for other applications to have access to these utility functions to improve usability. I'd also try and add some fun ASCII art and color to the CLI itself. For this exercise though, I wanted to hit the acceptance criteria to the best of my ability in a manner that made it easy to read & allowed scalability. 

Overall I found this exercise to be a lot of fun. I got a nice little math lesson and was able to try out a Node feature that I'd never used previously 👍👍. My 2 big goals were:

    A) Write easily readable and quality code
    B) Deliver a solution that is straightforward for both a user and developer to interact with.

Thanks for taking the time to review the solution. Below are instructions for setup and usage of the CLI...

## Install | Build | Test
I am using Yarn as my package manager, but you can use npm if you so choose. So I've included instructions for either option below...

```bash
npm install

yarn install
```

Once you've installed the node modules for the project you'll want to build the project prior to running it

```bash
npm run build

yarn build
```

The rpn calculator method, as well as the calculator class that drives the cli both have tests setup. I am using [Jest](https://jestjs.io/) as my testing framework on this project. To run these tests (on both the TS files and compiled JS files)...

```bash
npm run test

yarn test
```

## Usage

To run the project...

```bash
npm run calculate

yarn calculate
```

This will launch the CLI tool. From there you can either enter in individual numbers or operators or entire expressions. You should either see the result of the equations displayed or an error message with a description of the particular error (ex: An invalid character used in an expression or an invalid expression submitted).

    rpn calculator> 5 5 5 8 + + -
    -13
    rpn calculator> 13 +
    0
    rpn calculator> 1 x 4
    x is not a valid character

To exit you can either enter in 'q' or send an end-of-input indicator (ex. CTL + C).
