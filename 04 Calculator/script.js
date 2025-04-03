const currentOperand = document.querySelector(".current-operand");
const previousOperand = document.querySelector(".previous-operand");
const buttons = document.querySelectorAll("button");

let currentNumber = 0;
let previousNumber = "";
let operation = "";

function updateDisplay() {
  currentOperand.textContent = currentNumber;
  previousOperand.textContent = `${previousNumber}${operation}`;
}

function handleNumber(number) {
  if (currentNumber == "0") {
    currentNumber = number;
    console.log("running");
  } else {
    currentNumber += number;
    console.log("started");
  }
}

function handleDecimal() {
  if (!currentNumber.includes(".")) {
    currentNumber += ".";
  }
}

function handleOperation(op) {
  if (currentNumber === "") return;
  if (previousNumber !== "") {
    calculate();
  }

  operation = op;
  previousNumber = currentNumber;
  currentNumber = "";
}

function calculate() {
  let result;
  const prev = parseFloat(previousNumber);
  const curr = parseFloat(currentNumber);

  if (isNaN(prev) || isNaN(curr)) return;
  switch (operation) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "×":
      result = prev * curr;
      break;
    case "÷":
      result = prev / curr;
      break;
    default:
      return;
  }

  currentNumber = result.toString();
  operation = "";
  previousNumber = "";
}

function clearAll() {
  currentNumber = "0";
  previousNumber = "";
  operation = "";
}

function deleteLast() {
  currentNumber = currentNumber.slice(0, -1);
  if (currentNumber === "") currentNumber = 0;
}

function percentage() {
  currentNumber = (parseFloat(currentNumber) / 100).toString();
}

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const value = button.innerText;    
    if (button.hasAttribute("data-number")) {
      handleNumber(value);
    } else if (value === ".") {
      handleDecimal();
    } else if (button.hasAttribute("data-operator")) {
      handleOperation(value);
    } else if (value === "=") {
      calculate();
    } else if (value === "C") {
      clearAll();
    } else if (value === "⌫") {
      deleteLast();
    } else if (value === "%") {
      percentage();
    }

    updateDisplay();
  });
});

document.addEventListener("keydown", (e) => {
  console.log(e.key);
  
  if (e.key >= 0 && e.key <= 9) {
    handleNumber(e.key);
  } else if (e.key === ".") {
    handleDecimal();
  } else if(e.key === "+" || e.key === "*" || e.key === "-" || e.key === "/") {
    const op = e.key === "*" ? "×" : e.key === "/" ? "÷" : e.key
    handleOperation(op)
  } else if (e.key === "Enter" || e.key === "=") {
    calculate()
  } else if (e.key === "Escape" ) {
    clearAll()
  } else if (e.key === "Backspace") {
    deleteLast()
  } else if (e.key === "%") {
    percentage()
  }

  updateDisplay()
});
