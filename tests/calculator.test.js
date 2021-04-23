const { evaluateExpression, getArrayOfElements, convertToPostfix, fixSingleElementsInParentheses, fixNegativeNumbers } = require('../scripts/calculator.js')

describe("arithmetic tests", () => {
	test("1 + 2 = 3", () => {
		expect(evaluateExpression("1 + 2")).toBe(3);
	});

	test("4*5/2 = 10", () => {
		expect(evaluateExpression("4*5/2")).toBe(10);
	});

	test("-5+-8--11*2 = 9", () => {
		expect(evaluateExpression("-5+-8--11*2")).toBe(9);
	});

	test("-.32       /.5 = -0.64", () => {
		expect(evaluateExpression("-.32       /.5")).toBe(-0.64);
	});

	test("(4-2)*3.5 = 7", () => {
		expect(evaluateExpression("(4-2)*3.5")).toBe(7);
	});
});

describe("input validation", () => {
	test("2+-+-4 gives Invalid Input", () => {
		expect(() => {evaluateExpression("2+-+-4")}).toThrow("Invalid Input");
	});

	test("19 + cinnamon gives Invalid Input", () => {
		expect(() => {evaluateExpression("19 + cinnamon")}).toThrow("Invalid Input");
	});

	test("(2+(3) gives Invalid Input", () => {
		expect(() => {evaluateExpression("(2+(3)")}).toThrow("Invalid Input");
	});
});

describe("getArrayOfElements", () => {
	test("34 +7*8 gives ['34', '+', '7', '*', '8']", () => {
		expect(getArrayOfElements("34 +7*8")).toStrictEqual(['34', '+', '7', '*', '8']);
	});

	test("24 + 7 * 80", () => {
		expect(getArrayOfElements("24 + 7 * 80")).toStrictEqual(['24', '+', '7', '*', '80'])
	})

	test("3.1415 + 78 +3. gives error", () => {
		expect(() => {getArrayOfElements("3.1415 + 78 +3.")}).toThrow("Invalid Input");
	});

	test("(35*7+3.512412)  + 4*72", () => {
		expect(getArrayOfElements("(35*7+3.512412)  + 4*72")).toStrictEqual(['(', '35', '*', '7', '+', '3.512412', ')', '+', '4', '*', '72']);
	});
});

describe("convertToPostfix", () => {
	test("4+5 gives ['4', '5', '+']", () => {
		expect(convertToPostfix("4+5")).toStrictEqual(['4', '5', '+']);
	});

	test("3.145 + 4 * 8", () => {
		expect(convertToPostfix("3.1415+4*8")).toStrictEqual(['3.1415', '4', '8', '*', '+']);
	});

	test("4(8)", () => {
		expect(convertToPostfix("4(8)")).toStrictEqual(['4','8','*']);
	});

	test("4*5/2", () => {
		expect(convertToPostfix("4*5/2")).toStrictEqual(['4', '5', '*', '2', '/']);
	})

	test("4(6)2 evaluates to 4*6*2", () => {
		const tokenArray = getArrayOfElements("4(6)(2)");
		expect(fixSingleElementsInParentheses(tokenArray)).toStrictEqual(['4','*', '6', '*', '2']);
	})

	test("5+4(3) evaluates to 5 + 4 * 3", () => {
		const tokenArray = getArrayOfElements("5+4(3)");
		expect(fixSingleElementsInParentheses(tokenArray)).toStrictEqual(['5','+', '4', '*', '3']);
	})

	test("[5, -, -, 4] evaluates to [5, +, -4]", () => {
		const tokenArray = ['5', '-', '-', '4'];
		expect(fixNegativeNumbers(tokenArray)).toStrictEqual(['5', '-', '-4'])
	})

	test("[5, -, 4] evaluates to [5, +, -4]", () => {
		const tokenArray = ['5', '-', '4'];
		expect(fixNegativeNumbers(tokenArray)).toStrictEqual(['5', '+', '-4'])
	})

})