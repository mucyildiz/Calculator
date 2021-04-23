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

	
}

const isOperator = element => '*/-+()'.includes(element);
const isOperand = element => '1234567890'.includes(element);

/**
 * @param {string} input BEFORE it is converted to postfix notation
 * @description takes string expression and outputs array with each token having its own index in the array
 * allows us to have decimal values and greater than single digit values
 * @returns {Array} 
 */
const getArrayOfElements = (input) => {
	validateInput(input);
	const inputWithoutSpaces = input.replace(/\s+/g, '');
	const inputArray = inputWithoutSpaces.split('');
	const tokenArray = [];
	for(let i = 0; i < inputArray.length; i++) {
		let currToken = inputArray[i];
		if(isOperator(currToken)) {
			tokenArray.push(currToken)
		}
		else{
			while(i < inputArray.length - 1 && !isOperator(inputArray[i+1])) {
				if(currToken.includes('.') && inputArray[i+1] === '.'){
					throw new Error("Invalid Input");
				}
				currToken += inputArray[i+1];
				i++;
			}
			if(currToken.charAt(currToken.length-1) === '.'){
				throw new Error("Invalid Input");
			}
			tokenArray.push(currToken);
		}
	}
	return tokenArray;
}

/**
 * @param {string} input
 * @description Ensures that the input is clean, meaning there exist no irrelevant elements in the input. 
 * Note that another form of invalid input is one where we have more operators than we can use - this is checked for in evaluateExpression
 */
const validateInput = (input) => {
	//check parentheses line up
	let parenthesesTracker = 0;
	for(chr of input){
		if(chr === '('){
			parenthesesTracker++;
		}
		else if(chr === ')'){
			parenthesesTracker--;
		}
	}
	if(parenthesesTracker !== 0) {
		throw new Error("Invalid Input");
	}
	const inputWithoutSpaces = input.replace(/\s+/g, '');
	const allowedElements = "1234567890.()*/-+";
	for(let char of inputWithoutSpaces) {
		if(!allowedElements.includes(char)){
				throw new Error("Invalid Input");
		}
	}
}

module.exports = { evaluateExpression, getArrayOfElements }