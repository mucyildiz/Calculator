const { evaluateExpression, getArrayOfElements, convertToPostfix, fixParentheses, fixNegativeNumbers } = require('../scripts/calculator.js')

describe("evaluateExpression tests", () => {
	const testEvaluateExpression = (testInputStr, expectedOutputNum) => {
		test(`${testInputStr} = ${expectedOutputNum}`, () => {
			const roundedSolution = sol => Number(Math.round(sol * 10000) / 10000);
			expect(evaluateExpression(testInputStr)).toBe(roundedSolution(expectedOutputNum));
		});
	}
	testEvaluateExpression("1 + 2", 3);
	testEvaluateExpression("4*5/2", 10);
	testEvaluateExpression("-5+-8--11*2", 9);
	testEvaluateExpression("-.32       /.5", -0.64);
	testEvaluateExpression("(4-2)*3.5", 7);
	testEvaluateExpression("4*(3)", 12);
	testEvaluateExpression("4-(4+8(4)*(7-4))", -96);
	testEvaluateExpression("4--(4+8(4)*(7-4))", 104);
	testEvaluateExpression("4+-(4+8(4)*(7-4))", -96);
	testEvaluateExpression("(8)(8)", 64);
	testEvaluateExpression("(8)(8(4))", 32*8);
	testEvaluateExpression("8*(8*4)", 32*8);
	testEvaluateExpression("3 - - (5(6))", 33);
	testEvaluateExpression("3((4))", 12);
	testEvaluateExpression("(((4)))", 4);
	testEvaluateExpression("(3-4)2", -2);
	testEvaluateExpression("3*(4+(6)/2((10)-8))", 30);
	testEvaluateExpression("2((10)-8)", 4);
	testEvaluateExpression("5((4*4))", 16*5);
	testEvaluateExpression("5((4-4))", 0);
	testEvaluateExpression("5(1/5)", 1);
	testEvaluateExpression("10/(5-1)", 10/4);
	testEvaluateExpression("15/(15-(16-72))*-162", 15/(15-(16-72))*-162);
	testEvaluateExpression("(30/15*18)-12+(13*13*.12+(11-6/4))", ((30/15*18)-12+(13*13*.12+(11-6/4))));
	testEvaluateExpression("30/15-12+(13*13*.12+(11-6/4))", 30/15-12+(13*13*.12+(11-6/4)));
	testEvaluateExpression("(5*3) - 3", 12);
	testEvaluateExpression("3-(5*3)", -12);
	testEvaluateExpression("((8-6-14*2(-4/-.27)+(6/2+4))+.6/4)", ((8-6-14*2*(-4/-.27)+(6/2+4))+.6/4) );
	testEvaluateExpression("(5*6)(5-3)", 60);
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

	test("divide by zero", () => {
		expect(() => {evaluateExpression("5/(5-5)")}).toThrow("Can not divide by zero.")
	})
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
	testCorrectPostfixNotation("3.145 + 4 * 8", ['3.145', '4', '8', '*', '+'])
	testCorrectPostfixNotation("4(8)", ['4', '8', '*']);
	testCorrectPostfixNotation("4*5/2", ['4', '5', '*', '2', '/'])
})
describe("fixing tests", () => {
	//input should be the string representation of the equation, gets converted to array to be evaluated
	const testFixParentheses = (testInputStr, expectedOutputArray) => {
		const tokenArray = getArrayOfElements(testInputStr);
		expect(fixParentheses(tokenArray)).toStrictEqual(expectedOutputArray);
	}

	testFixParentheses("4(6)2", ['4','*', '6', '*', '2']);
	testFixParentheses("5+4(3)", ['5','+', '4', '*', '3'])
	testFixParentheses("2((10)-8)", ['2', '*', '(', '10', '-', '8', ')']);

	const testFixNegativeNumbers = (testInputArray, expectedOutputArray) => {
		test(`[${testInputArray}] evaluates to [${expectedOutputArray}]`, () => {
			expect(fixNegativeNumbers(testInputArray)).toStrictEqual(expectedOutputArray);
		})
	}
	testFixNegativeNumbers(['5', '-', '-', '4'], ['5', '+', '4']);
	testFixNegativeNumbers(['5', '-', '4'], ['5', '+', '-4']);
})
