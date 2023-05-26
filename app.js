//document.getQuerySelector/getElementByID on all necessary buttons

//* three variables for num1 num2 and operator

//add event listener on the equal sign
  //when they press -> operate(num1, operator, num2)
    //return number || other error
    //update the UI


//***** */
//get input/addEventListener
//store them in a variable
//pass in those variable that would calculate base on the three variables


let pressedNum1 = '';
let pressedNum2 = '';
let pressedOperator = '';

const mainDisplay = document.getElementById('mainDisplay')
const operators = document.querySelectorAll('.operator')
const numberBtns = document.querySelectorAll('.number')
const equalBtn = document.getElementById('equals')
const allClearBtn = document.getElementById('allClear')

let isNum1 = true;

function toggleNum() {
  if(isNum1) isNum1 = false
  else isNum1 = true;

  return isNum1;
}


function updateInput(value) {
  if(isNum1) { //if there's no pressed operator yet, means this is num1
    pressedNum1 += value;
    return pressedNum1;
  } else {
    pressedNum2 += value;
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
    // Add more cases for additional operators if needed

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
}



numberBtns.forEach(numberBtn => {
  numberBtn.addEventListener('click', () => {
    let updadatedInput = updateInput(numberBtn.innerText);
    updateMainDisplay(updadatedInput)
  })
})

operators.forEach(operator => {
  operator.addEventListener('click', () => {
    if(!isNum1) {
      operate(pressedNum1, pressedNum2, pressedOperator);
    }

    pressedOperator = operator.innerText;
    toggleNum();
    //UI part
    mainDisplay.classList.add('blink')
    setTimeout(() => {
      mainDisplay.classList.remove('blink'); // Remove the 'blink' class
    }, 50);
  })
})

equalBtn.addEventListener('click', () => {
  let result = operate(pressedNum1, pressedNum2, pressedOperator);
  toggleNum();
  updateMainDisplay(result)
  resetPressedBtns();
  pressedNum1 = String(result);
});


allClearBtn.addEventListener('click', () => {
  //clear screen
  clearMainDisplay()
  //clear input
  resetPressedBtns()
})


//erase when we all clear