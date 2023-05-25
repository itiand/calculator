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

function updateInput(value) {
  if(pressedOperator === '') { //if there's no pressed operator yet, means this is num1
    pressedNum1 += value;
  } else {
    pressedNum2 += value;
  }

  console.log(pressedNum1, pressedNum2)
}

function operate(num1, num2, operator) {
  console.log(Number(num1), Number(num2), Number(operator));
}

function updateMainDisplay(value) {
  const currentDisplay;
}

numberBtns.forEach(numberBtn => {
  numberBtn.addEventListener('click', () => {
    updateInput(numberBtn.innerText);
  })
})

equalBtn.addEventListener('click', () => {operate(pressedNum1, pressedNum2, pressedOperator)});