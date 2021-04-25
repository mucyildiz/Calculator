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
    evaluateExpressionDOM(equation.value);
  }
  else if(value === '←'){
    equation.value = equation.value.substring(0, equation.value.length-1);
    if(equation.value.length === 0){
      equation.placeholder = '';
    }
  }
  else{
    equation.value += value;
  }
}

const evaluateExpressionDOM = input => {
  try {
    const result = evaluateExpression(input);
    // calc throws error on y/(x-x) but not y/0 so this is a check for that
    if(result === Infinity) {
      equation.value = '';
      equation.placeholder = 'Can not divide by zero.';
    }
    else{
      equation.value = result;
    }
  }
  catch (err) {
    console.log(err.toString() === "Error: Can not divide by zero.");
    equation.value = '';
    if(err.toString() === "Error: Can not divide by zero."){
      equation.placeholder = 'Can not divide by zero.';
    }
    else{
      equation.placeholder = 'Invalid Input';
    }
  }
} 

for(button of buttons) {
  button.addEventListener('click', handleClick);
}

document.addEventListener("keydown", e => {
  if (e.code === "Enter"){
    if(equation.value){
      evaluateExpressionDOM(equation.value);
    }
  }
  // shouldn't have "Invalid Input" if we erase input after getting invalid input
  if(equation.value.length === 1 && (e.code === "Backspace")){
    equation.placeholder = '';
  }
})