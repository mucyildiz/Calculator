const { evaluateExpression, getArrayOfElements, convertToPostfix, fixSingleElementsInParentheses, fixNegativeNumbers } = require('../scripts/calculator.js')

describe("evaluateExpression tests", () => {
	const testEvaluateExpression = (testInputStr, expectedOutputNum) => {
		test(`${testInputStr} = ${expectedOutputNum}`, () => {
			expect(evaluateExpression(testInputStr)).toBe(expectedOutputNum);
		});
	}
	testEvaluateExpression("1 + 2 = 3", "1 + 2", 3);
	testEvaluateExpression("4*5/2 = 10", "4*5/2", 10);
	testEvaluateExpression("-5+-8--11*2 = 9", "-5+-8--11*2", 9);
	testEvaluateExpression("-.32       /.5 = -0.64", "-.32       /.5", -0.64);
	testEvaluateExpression("(4-2)*3.5 = 7", "(4-2)*3.5", 7);
});

describe("input validation", () => {
	const testValidInput = (testInputStr) => {
		test(`${testInputStr} gives Invalid Input`, () => {
			expect(() => {evaluateExpression(testInputStr)}).toThrow("Invalid Input")
		})
	}
	testValidInput("2+-+-4");
	testValidInput("19 + cinnamon");
	testValidInput("(2+(3)");
	testValidInput("3.1415 + 78 +3.");
});

describe("getArrayOfElements tests", () => {
	const testCorrectArrayReturned = (testInputStr, expectedOutputArray) => {
		test(`${testInputStr} gives [${expectedOutputArray}]`, () => {
			expect(getArrayOfElements(testInputStr)).toStrictEqual(expectedOutputArray);
		})
	}
	testCorrectArrayReturned("34 +7*8", ['34', '+', '7', '*', '8']);
	testCorrectArrayReturned("24 + 7 * 80", ['24', '+', '7', '*', '80']);
	testCorrectArrayReturned("(35*7+3.512412)  + 4*72", ['(', '35', '*', '7', '+', '3.512412', ')', '+', '4', '*', '72'])
});

describe("convertToPostfix tests", () => {
	const testCorrectPostfixNotation = (testInputStr, expectedOutputArray) => {
		test(`${testInputStr} gives [${expectedOutputArray}]`, () => {
			expect(convertToPostfix(testInputStr)).toStrictEqual(expectedOutputArray)
		})
	}
	testCorrectPostfixNotation("4+5", ['4', '5', '+']);
	testCorrectPostfixNotation("3.145 + 4 * 8", ['3.1415', '4', '8', '*', '+'])
	testCorrectPostfixNotation("4(8)", ['4', '8', '*']);
	testCorrectPostfixNotation("4*5/2", ['4', '5', '*', '2', '/'])

describe("fixing tests", () => {
	//input should be the string representation of the equation, gets converted to array to be evaluated
	const testFixSingleElementsInParentheses = (testInputStr, expectedOutputArray) => {
		const tokenArray = getArrayOfElements(testInputStr);
		expect(fixSingleElementsInParentheses(tokenArray)).toStrictEqual(expectedOutputArray)
	}
})
	testFixSingleElementsInParentheses("4(6)2", ['4','*', '6', '*', '2']);
	testFixSingleElementsInParentheses("5+4(3)", ['5','+', '4', '*', '3'])

	const testFixNegativeNumbers = (testInputArray, expectedOutputArray) => {
		test(`[${testInputArray}] evaluates to [${expectedOutputArray}]`, () => {
			expect(fixNegativeNumbers(testInputArray)).toStrictEqual(expectedOutputArray);
		})
	}
	testFixNegativeNumbers(['5', '-', '-', '4'], ['5', '-', '-4']);
	testFixNegativeNumbers(['5', '-', '4'], ['5', '+', '-4']);
})