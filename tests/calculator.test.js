const { evaluateExpression } = require('../scripts/calculator.js')

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
});