# Calculator
This is a web application that contains a calculator which supports addition, subtraction, multiplication, and division. 

<br />
## Using the app
To use the application, simply head over to https://mucyildiz.github.io/Calculator/ and either select and write into the input portion of the calculator, or press the buttons with a mouse. 

## Valid Inputs
In addition to the operations mentioned above, the calculator is also able to handle parentheses in any context. Some example valid inputs are<br />
`4(3*4)` <br />
`((4)) - 3/(4-(5*7))` <br />
`((8-6-14*2(-4/-.27)+(6/2+4))+.6/4)` <br />

## Tech used
Built with <br />
* JavaScript <br />
* HTML5 <br />
* CSS

## Documentation
**validateInput()** <br />
`validateInput(input)`<br />
validateInput takes in a string input and checks it for anything that could potentially cause problems for our other methods in the algorithm. This means elements like letters, non mathematical tokens, or scenarios like parentheses not matching up. In the case that we do find something wrong with the input, we throw an error.
<br /> <br />
**getArrayOfTokens** <br />
`getArrayOfTokens(input)`<br />
getArrayOfTokens takes in a string input and returns an array with each token having it's own index e.g. '3.56+4' becomes ['3.56', '+', '4'].
<br /> <br />
**fixParenthesesMultiplication**<br />
`fixParenthesesMultiplication(tokenArray)`<br />
fixParentheses takes in an array of tokens and fixes the problem of parentheses multiplication. For example if we had x(y), we would convert it to x\*(y). This makes it easier for our postfix evaluation algorithm to understand the problem is one concerning multiplication. This method returns an array where all parentheses multiplication problems have '\*' inserted in the correct positions.
<br /> <br />
**fixNegativeNumbers** <br />
`fixNegativeNumbers(tokenArray)` <br />
fixNegativeNumbers takes in an array of tokens and fixes all edge cases for negative numbers and returns the array with all the edge cases accounted for. Our postfix evaluation algorithm can not tell if "-" is meant as a negation of a number or subtraction of two entities. We fix this by accounting for all possible cases we can have with a minus sign involved, and converting those situations into friendlier ones for our algorithm to evaluate. For example, if we find a problem like 4--4, we convert it to 4+4, or if we find a situation like x + -(y + z), we transform it into x + -1*(y+z) which evaluates the same but is a lot easier for our algorithm to consider.
<br /> <br />
**convertToPostfix** <br />
`convertToPostfix(input)` <br />
convertToPostfix takes in a string input and returns an array of tokens in postfix order. Postfix order makes it easier for us to evaluate string expressions. Take an example, if we had the string "4/4", it would be easy to search for the operator, look for the two numbers around it, and apply that operator. But what if we had a string like "4-4/2"? The algorithm we just described would evaluate 0/2, when it should be evaluating 4-2. To account for this we use postfix order, and have the operator come after the two operands it is going to operate on. For example, "4/4" becomes "4 4 / => 1", and "4-4/2" becomes "4 4 2 / - => 4 2 - => 2". 
<br /> <br />
**evaluateExpression** <br />
`evaluateExpression(input)` <br />
evaluateExpression takes in a string input and returns the Number solution. It uses the convertToPostfix method to transform the input into an array in postfix notation, and evaluates the input in postfix.
<br />
## Tests
To run tests, simply enter <br />
`$ npm run test` <br />
into the terminal. To add tests, first decide what kind of test it is. If a describe block exists for the kind, place the test there. If you plan on running more than one test of that kind, create a function that will run the test so we can have improved readability. 
<br />
## Credits
*Algorithm for converting to Postfix Notation* <br />
https://runestone.academy/runestone/books/published/pythonds/BasicDS/InfixPrefixandPostfixExpressions.html <br />
*Algorithm for evaluating postfix notation* <br />
https://www.geeksforgeeks.org/stack-set-4-evaluation-postfix-expression/
