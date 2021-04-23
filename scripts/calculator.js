const evaluateExpression = (str) => {
    validateInput(str);
}

/**
 * @param {string} input
 * @description Method ensures that the input is clean, meaning there exist no irrelevant elements in the input. 
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