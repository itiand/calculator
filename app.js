let pressedNum1 = '';
let pressedNum2 = '';
let pressedOperator = '';

const mainDisplay = document.getElementById('mainDisplay')
const operators = document.querySelectorAll('.operator')
const numberBtns = document.querySelectorAll('.number')
const equalBtn = document.getElementById('equals')
const allClearBtn = document.getElementById('allClear')
const plusMinusBtn = document.getElementById('plusMinus');
const backSpaceBtn = document.getElementById('backSpace')

///temp - a ui tool 
let currentNum = document.getElementById('isNum1');
let pressedNum1UI = document.getElementById('pressedNum1');
let pressedNum2UI = document.getElementById('pressedNum2');
let pressedOperatorUI = document.getElementById('pressedOperator');
////

let isNum1 = true;

///FUNCTIONS/////
/////////////////
function toggleNum() {
  if(isNum1) {
    isNum1 = false;
    currentNum.innerText = `num2`;
  } else {
    isNum1 = true;
    currentNum.innerText = `num1`;
  }
  return isNum1;
}

function carryOverResultToNum1(operateResult) {
  pressedNum1 = operateResult;
  pressedNum2 = '';
  isNum1 = false;

  //devtools
  pressedNum1UI.innerText = pressedNum1;
  pressedNum2UI.innerText = pressedNum2;
  pressedOperatorUI.innerText = pressedOperator;
}

function updateInput(value) {
  if(value === '-') { // IF THE UPDATE IS plusMinus
    if(isNum1) {
      if(pressedNum1.startsWith('-')) { // if it's negative
        //if negative, make it positive
        pressedNum1 = pressedNum1.slice(1)
      } else {      //if positive, make it negative
        pressedNum1 = `-${pressedNum1}`
      }
      pressedNum1UI.innerText = pressedNum1;
      return pressedNum1
    } else {
      if(pressedNum2.startsWith('-')) {
        pressedNum2 = pressedNum2.slice(1)
      } else {
        pressedNum2 = `-${pressedNum2}`
      }
      pressedNum2UI.innerText = pressedNum2;
      return pressedNum2;
    }
  } else {
    if(isNum1) {
      pressedNum1 += value;
      pressedNum1UI.innerText = pressedNum1;
      return pressedNum1;
    } else {
      pressedNum2 += value;
      pressedNum2UI.innerText = pressedNum2;
      return pressedNum2;
    }
  }
}

function backSpace() {
  if(isNum1) {
    pressedNum1 = pressedNum1.slice(0, -1)
    return pressedNum1;
  } else {
    pressedNum2 = pressedNum2.slice(0, -1)
    return pressedNum2;
  }
}

function operate(num1, num2, operator) {
  num1 = Number(num1)
  num2 = Number(num2)

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case 'x':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
      break;

    default:
      console.log('Invalid operator');
      return;
  }
  return result.toString();
}

const MAX_DISPLAY_CHARS = 18;
const MAX_DECIMAL_PLACES = 15;
function updateMainDisplay(value) {
  if(value.length > MAX_DISPLAY_CHARS) {
    let roundedValue;
    value = Number(value)
    roundedValue = parseFloat(value).toFixed(MAX_DECIMAL_PLACES).toString()
    roundedValue = roundedValue.substring(0, MAX_DISPLAY_CHARS); // Truncate the value
    value = roundedValue;
  }
  mainDisplay.innerText = value;
}

function clearMainDisplay() {
  mainDisplay.innerText = '';
}

function resetPressedBtns() {
  pressedNum1 = '';
  pressedNum2 = '';
  pressedOperator = '';

  pressedNum1UI.innerText = ''
  pressedNum2UI.innerText = ''
  pressedOperatorUI.innerText = '';
}

///EVENT LISTENERS///
//////////////////////
numberBtns.forEach(numberBtn => {
  numberBtn.addEventListener('click', () => {
    let updadatedInput = updateInput(numberBtn.innerText);
    updateMainDisplay(updadatedInput)
  })
})

plusMinusBtn.addEventListener('click', () => {
  const updadatedInput = updateInput('-')
  updateMainDisplay(updadatedInput)
});

operators.forEach(operator => {
  operator.addEventListener('click', () => {
    //BEFORE WE UPDATE THE NEW PRESSED OPERATOR
    //for chain operations... 1+1+1+1
    //updates result and UI as operators are linked
    if(pressedNum1 !== '' && pressedNum2 !== '' && pressedOperator !== '') {
      const result = operate(pressedNum1, pressedNum2, pressedOperator);
      updateMainDisplay(result);
      carryOverResultToNum1(result);
    } 

    pressedOperatorUI.innerText = operator.innerText;//dev tool
    pressedOperator = operator.innerText;

    //prevents going back to isNum1=true when repetitive pressing on one of the operators
    if((!isNum1 && pressedNum1 !== '') || (pressedNum1 === '' && isNum1)) { 
      console.log('no changes')
    } else {
      toggleNum()
    }

    //UI part
    mainDisplay.classList.add('blink')
    setTimeout(() => {
      mainDisplay.classList.remove('blink'); // Remove the 'blink' class
    }, 50);
  })
})

equalBtn.addEventListener('click', () => {

  //blink when equal is pressed UI
  mainDisplay.classList.add('blink')
  setTimeout(() => {
    mainDisplay.classList.remove('blink'); // Remove the 'blink' class
  }, 50);

  let result = operate(pressedNum1, pressedNum2, pressedOperator);
  updateMainDisplay(result)
  resetPressedBtns();
  toggleNum();
});

allClearBtn.addEventListener('click', () => {
  //clear screen
  resetPressedBtns()
  clearMainDisplay()
  //clear input
})

backSpaceBtn.addEventListener('click', () => {
  const updatedInput = backSpace();
  updateMainDisplay(updatedInput);

  //
  pressedNum1UI.innerText = pressedNum1;
  pressedNum2UI.innerText = pressedNum2;
  pressedOperatorUI.innerText = pressedOperator;
})