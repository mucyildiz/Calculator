/**
 * @param {string} input 
 * @description Takes in a string representing a mathematical equation and evaluates it using postfix arithmetic
 * @returns {number} 
 */
const evaluateExpression = (input) => {
	validateInput(input);
	const operate = {
		'+': (x, y) => Number(x) + Number(y), 
		'-': (x, y) => Number(y) - Number(x), 
		'*': (x, y) => Number(x) * Number(y),
		'/': (x, y) => Number(y) / Number(x)
	};
	const postfixArray = convertToPostfix(input);
	console.log(postfixArray)
	const postfixStack = [];
	for(let token of postfixArray){
		if(isOperator(token)){
			const operation = operate[token];
			const elementOne = postfixStack.pop();
			const elementTwo = postfixStack.pop();
			postfixStack.push(operation(elementOne, elementTwo));
		}
		else{
			postfixStack.push(token);
		}
	}
	const solution = postfixStack[0];
	if(postfixStack.length !== 1 || isNaN(solution)){
		throw new Error("Invalid Input");
	}
	return solution;
}

const isOperator = element => '*/-+()'.includes(element);

/**
 * @param {string} input BEFORE it is converted to postfix notation
 * @description takes string expression and outputs array with each token having its own index in the array
 * allows us to have decimal values and greater than single digit values
 * @returns {Array} 
 */
const getArrayOfElements = (input) => {
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
			// should never have more right parentheses than left
			if(parenthesesTracker < 0) {
				throw new Error("Invalid Input");
			}
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

/**
 * @param {array} tokenArray
 * @description looks for expressions in the form of x(y) and converts to x*y
 * @returns {array} array of tokens where all single element parentheses are converted to multiplication problems
 */
const fixSingleElementsInParentheses = (tokenArray) => {
	for(let i = 1; i < tokenArray.length - 1; i++) {
		if(tokenArray[i-1] === '(' && tokenArray[i+1] === ')') {
			// case of x(y)z -> x*y*z
			if(!isNaN(tokenArray[i-2]) && !isNaN(tokenArray[i+2])) {
				tokenArray[i-1] = '*';
				tokenArray[i+1] = '*';
			}
			// x(y)
			else if(!isNaN(tokenArray[i-2])) {
				tokenArray[i-1] = '*';
				tokenArray.splice(i+1, 1);
			}
			// (x)y
			else if(!isNaN(tokenArray[i+2])) {
				tokenArray[i+1] = '*';
				if(tokenArray[i-1] === '('){
					tokenArray.splice(i-1, 1);
				}
			}
		}
	}
	return tokenArray;
}

/**
 * @param {array} tokenArray 
 * @definition takes in array (in infix notation) and makes interactions with negative numbers easier to deal with for postfix algorithm
 * @returns {array} tokenArray where every negative number is in one index e.g. [-4] instead of [-, 4]
 */
const fixNegativeNumbers = (tokenArray) => {
	for(let i = 0; i < tokenArray.length; i++) {
		// if we have two negatives next to each other we simply treat it as addition and get rid of one of the negatives
		if(tokenArray[i] === '-' && tokenArray[i+1] === '-'){
			tokenArray[i] = '+';
			tokenArray.splice(i+1, 1);
		}
		// case like x + -(y + z) -> x + -1*(y+z)
		else if(tokenArray[i] === '-' && isNaN(tokenArray[i+1])) {
			tokenArray[i] = '-1';
			tokenArray.splice(i+1, 0, '*')
			// if we had x - (y + z), we would go x -1*(y+z) so we need to add a + to get x + -1*(y+z)
			if(!isNaN(tokenArray[i-1])) {
				tokenArray.splice(i, 0, '+')
			}
		}
		else if(tokenArray[i] === '-' && !isNaN(tokenArray[i+1])) {
			// we make it a string to keep our types consistent in the tokenArray
			tokenArray[i+1] = String(-1 * tokenArray[i+1]);
			tokenArray.splice(i, 1);
			// for case where we have x-y, we translate to x+(-y)
			if(i > 0) {
				if(!isNaN(tokenArray[i-1])){
					tokenArray.splice(i, 0, '+')
				}
			}
		}
	}
	return tokenArray;
}

/**
 * @param {string} input 
 * @description takes in input and outputs array of tokens in postfix order
 * algorithm: https://runestone.academy/runestone/books/published/pythonds/BasicDS/InfixPrefixandPostfixExpressions.html
 * @returns {array} array of elements of input in postfix notation
 */
const convertToPostfix = (input) => {
	const precedence = {
		'(': 1,
		'+': 2,
		'-': 2,
		'*': 3,
		'/': 3
	};

	const tokenArray = fixNegativeNumbers(fixSingleElementsInParentheses(getArrayOfElements(input)));

	const postfixArray = [];
	const operatorStack = [];

	for(token of tokenArray){
		if(!isOperator(token)){
			postfixArray.push(token);
		}
		else if(token === '('){
			operatorStack.push(token);
		}
		//find end of expression inside parantheses so we evaluate that first by giving its operators precedence in the postfix array
		else if(token === ')'){
			let currToken = operatorStack.pop();
			while(currToken !== '(') {
				postfixArray.push(currToken);
				currToken = operatorStack.pop();
			}
		}
		else{
			//higher precedence operators get evaluated first so before we push an operator onto postfix, we check for higher precedence operators already in stack and push them first
			while(operatorStack.length !== 0 && precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]) {
				postfixArray.push(operatorStack.pop());
			}
			operatorStack.push(token);
		}
	}
	while(operatorStack.length !== 0){
		postfixArray.push(operatorStack.pop());
	}

	return postfixArray;
}

module.exports = { evaluateExpression, getArrayOfElements, convertToPostfix, fixSingleElementsInParentheses, fixNegativeNumbers }