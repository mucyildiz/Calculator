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
  else{
    equation.value += value;
  }
}

for(button of buttons) {
  button.addEventListener('click', handleClick);
}