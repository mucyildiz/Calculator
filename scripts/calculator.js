/**
 * @param {string} input 
 * @description Takes in a string representing a mathematical equation and evaluates it using postfix arithmetic
 * @returns {number} 
 */
const evaluateExpression = (input) => {
	validateInput(input);
	const operate = {
		'+': (x, y) => Number(x) + Number(y), 
		'-': (x, y) => Number(x) - Number(y), 
		'*': (x, y) => Number(x) * Number(y),
		'/': (x, y) => Number(x) / Number(y)
	};
	const isOperator = element => '*/-+'.includes(element);
	const isOperand = element => '1234567890'.includes(element);
	let postfixStack = new Array();
}

/**
 * @param {string} input
 * @description Ensures that the input is clean, meaning there exist no irrelevant elements in the input. 
 * Note that another form of invalid input is one where we have more operators than we can use - this is checked for in evaluateExpression
 */
const validateInput = (input) => {
	const inputWithoutSpaces = input.replace(/\s+/g, '');
	const allowedElements = "1234567890.()*/-+";
	for(let char of inputWithoutSpaces) {
		if(!allowedElements.includes(char)){
				throw new Error("Invalid Input");
		}
	}
}

module.exports = { evaluateExpression }