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
  if(b === 0){
    return "ERROR! Divide by zero.";
  }
  return a / b;
}

let firstNumber = '';
let operator = '';
let secondNumber = '';
let isResultDisplayed = false;

const display = document.querySelector('#display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('#equals'); 
const clearButton = document.querySelector('#clear');
const decimalButton = document.querySelector('#decimal');
const backspaceButton = document.querySelector('#backspace');

function operate(op, a, b){
 a = Number(a);
 b = Number(b);
 let result;
 switch(op){
  case '+':
    result = add(a, b);
    break;
  case '-':
    result = subtract(a, b);
    break;
  case '*':
    result = multiply(a, b);
    break;
  case '/':
    if(b === 0){
        return "ERROR! Divide by zero.";
    }
    result = divide(a, b);
    break;
 default:
  return null;
}
return Math.round(result * 100000) / 100000;
}

function appendNumber(num){
   if(isResultDisplayed){
       firstNumber = '';
       isResultDisplayed = false;
      }

      if(operator === ''){
        firstNumber += num;
        display.textContent = firstNumber;
      } else {
        secondNumber += num;
        display.textContent = secondNumber;
      }
}

function setOperator(op) {
  if (firstNumber === '') 
    return;
  if(firstNumber !== '' && secondNumber !== ''){
    evaluate();
  }
  operator = op;
  isResultDisplayed = false;
}
function evaluate() {
    if (firstNumber === '' || operator === '' || secondNumber === '') return;

    let result = operate(operator, firstNumber, secondNumber);
    display.textContent = result;
    
    firstNumber = result.toString();
    secondNumber = '';
    operator = '';
    isResultDisplayed = true;
}

function clearAll(){
 firstNumber = '';
 secondNumber = '';
 operator = '';
 isResultDisplayed = false;
 display.textContent = '0';
}
  
function appendDecimal(){
   if(isResultDisplayed) {
    firstNumber = '';
    isResultDisplayed = false;
   }
   if(operator === ''){
      if(!firstNumber.includes('.')){
        firstNumber += firstNumber === '' ? '0.' : '.';
        display.textContent = firstNumber;
      }
      } else {
        if(!secondNumber.includes('.')){
           secondNumber += secondNumber === '' ? '0.' : '.';
           display.textContent = secondNumber; // ከዚህ በፊት secondnumber (በትንሽ n) የነበረው ተስተካክሏል
        }
      }
   }
function handleBackspace() {
    if (isResultDisplayed) return;

    if (operator === '') {
        firstNumber = firstNumber.slice(0, -1);
        display.textContent = firstNumber || '0';
    } else if (secondNumber !== '') {
        secondNumber = secondNumber.slice(0, -1);
        display.textContent = secondNumber || '0';
    }
}
numberButtons.forEach(btn => btn.addEventListener('click', () => appendNumber(btn.dataset.value)));
operatorButtons.forEach(btn => btn.addEventListener('click', () => setOperator(btn.dataset.action)));

if (equalsButton) equalsButton.addEventListener('click', evaluate);
if (clearButton) clearButton.addEventListener('click', clearAll);
if (decimalButton) decimalButton.addEventListener('click', appendDecimal);
if (backspaceButton) backspaceButton.addEventListener('click', handleBackspace);

window.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendDecimal();
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') handleBackspace();
    if (e.key === 'Escape') clearAll();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        setOperator(e.key);
    }
});