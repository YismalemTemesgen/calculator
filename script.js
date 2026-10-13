function add(a, b){
  return a + b;
}
function subtract(a, b){
  return a - b;
}
function multiply(a, b){
  return a * b;
}
function divide(a, b){
  if(b===0){
    return "ERROR! Divide by zero.";
  }
    return a/b;
  }
let firstNumber = '';
let operator = '';
let secondNumber = '';

function operate(operator, a, b){
 a = Number(a);
 b = Number(b);
 switch(operator){
  case '+':
    return add(a, b);
  case '-':
    return subtract(a, b);
  case '*':
    return multiply(a, b);
  case '/':
    if(b===0){
          return "ERROR! Divide by zero.";
    }
    return divide(a, b);
 default:
  return null;
}
}
const display = document.querySelector('#display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('#clear');

numberButtons.forEach(button =>{
  button.addEventListener('click', ()=>{
    if(operator ===''){
      firstNumber += button.dataset.value;
      display.textContent = firstNumber;
    }else{
      secondNumber += button.dataset.value;
      display.textContent = secondNumber;
    }
  });
});

operatorButtons.forEach(button => {
       button.addEventListener('click', ()=>{
         if(firstNumber !=='' && secondNumber !==''){
          firstNumber = operate(operator, firstNumber, secondNumber);
          display.textContent = firstNumber;
          secondNumber = '';
         }
         operator = button.dataset.action;
       });
});

equalsButton.addEventListener('click', ()=>{
       if(firstNumber !=='' && operator !=='' && secondNumber !==''){
        firstNumber = operate(operator, firstNumber, secondNumber);
        display.textContent = firstNumber;
        operator = '';
        secondNumber = '';
       }
});

clearButton.addEventListener('click',() =>{
   firstNumber = '';
   operator = '';
   secondNumber = '';
   display.textContent = '0';
});