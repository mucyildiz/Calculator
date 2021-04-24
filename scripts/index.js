const equation = document.querySelector("#input");
const buttons = Array.from(document.querySelectorAll('.key'));

const handleClear = () => {
  equation.value = '';
}

const handleClick = e => {
  const value = e.target.innerHTML;
  if(value === 'Clear'){
    handleClear();
  }
  else if(value === '='){
    const result = evaluateExpression(equation.value);
    equation.value = result;
  }
  else{
    equation.value += value;
  }
}

const evaluateExpressionDOM = input => {
  try {
    const result = evaluateExpression(input);
    return result;
  }
  catch (err) {
    equation.value = '';
    equation.placeholder = 'Invalid Input';
  }
} 

for(button of buttons) {
  button.addEventListener('click', handleClick);
}

document.addEventListener("keydown", e => {
  if (e.code === "Enter"){
    evaluateExpressionDOM(equation.value);
  }
  // shouldn't have "Invalid Input" if we erase input after getting invalid input
  if(equation.value.length === 1 && e.code === "Backspace"){
    equation.placeholder = '';
  }
})