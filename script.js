//your JS code here. If required.
// Define variables to keep track of the state of the calculator
let displayValue = '';
let leftBracketCount = 0;
let rightBracketCount = 0;
let hasDecimalPoint = false;

// Get references to the HTML elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

// Add event listeners to the buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Get the button ID
    const buttonId = button.id;

    // Handle each button ID separately
    switch (buttonId) {
      case 'C':
        clearAll();
        break;
      case 'back':
        clearOne();
        break;
      case 'op':
        openBracket();
        break;
      case 'cl':
        closeBracket();
        break;
      case 'divi':
      case 'mul':
      case 'minus':
      case 'plus':
        handleOperator(buttonId);
        break;
      case 'equal':
        calculateResult();
        break;
      default:
        handleDigit(buttonId);
        break;
    }

    // Update the display with the new value
    display.innerHTML = displayValue;
  });
});

// Define functions to handle button clicks
function handleDigit(digit) {
  displayValue += digit;
}

function handleOperator(operator) {
  if (displayValue.length === 0) {
    // Do nothing if display area is empty and operator is not minus
    if (operator !== '-') {
      return;
    }
  } else {
    const lastChar = displayValue.charAt(displayValue.length - 1);
    if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
      // Replace the last operator with the new one
      displayValue = displayValue.slice(0, -1) + operator;
    } else {
      // Add the operator to the end of the string
      displayValue += operator;
    }
    hasDecimalPoint = false;
  }
  // Add a space after the operator for readability
  displayValue += ' ';
}


function openBracket() {
displayValue += '(';
leftBracketCount++;
}

function closeBracket() {
if (rightBracketCount < leftBracketCount) {
displayValue += ')';
rightBracketCount++;
}
}

function clearAll() {
displayValue = '';
leftBracketCount = 0;
rightBracketCount = 0;
hasDecimalPoint = false;
}

function clearOne() {
const lastChar = displayValue.charAt(displayValue.length - 1);
if (lastChar === '(') {
leftBracketCount--;
} else if (lastChar === ')') {
rightBracketCount--;
} else if (lastChar === '.') {
hasDecimalPoint = false;
}
displayValue = displayValue.slice(0, -1);
}

function calculateResult() {
// Check if there are any unmatched brackets
if (leftBracketCount !== rightBracketCount) {
displayValue = 'Error: Unmatched brackets';
return;
}

// Evaluate the expression using the eval() function
try {
displayValue = eval(displayValue).toString();
hasDecimalPoint = displayValue.includes('.');
} catch (error) {
displayValue = 'Error: Invalid expression';
}
}

function handleDecimalPoint() {
if (!hasDecimalPoint) {
displayValue += '.';
hasDecimalPoint = true;
}
}
