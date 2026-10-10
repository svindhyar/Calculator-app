import { Calculator } from "./calculator.js";

const calculator = new Calculator();
const display = document.querySelector("#display");
const expression = document.querySelector("#expression");
const operatorSymbols = {
  add: "+",
  subtract: "−",
  multiply: "×",
  divide: "÷",
};

function render() {
  display.textContent = calculator.getDisplayValue();
  expression.textContent = calculator.operator
    ? `${calculator.accumulator} ${operatorSymbols[calculator.operator]}`
    : "";

  document.querySelectorAll("[data-operator]").forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.operator === calculator.operator),
    );
  });
}

function handleAction(action) {
  switch (action) {
    case "clear":
      calculator.clear();
      break;
    case "decimal":
      calculator.inputDecimal();
      break;
    case "equals":
      calculator.calculate();
      break;
    case "sign":
      calculator.toggleSign();
      break;
    case "percent":
      calculator.percent();
      break;
    case "delete":
      calculator.delete();
      break;
    default:
      return;
  }

  render();
}

document.querySelector(".calculator__keys").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) {
    return;
  }

  if (button.dataset.digit !== undefined) {
    calculator.inputDigit(button.dataset.digit);
    render();
  } else if (button.dataset.operator) {
    calculator.chooseOperator(button.dataset.operator);
    render();
  } else if (button.dataset.action) {
    handleAction(button.dataset.action);
  }
});

document.addEventListener("keydown", (event) => {
  if (/^\d$/.test(event.key)) {
    calculator.inputDigit(event.key);
  } else if (event.key === ".") {
    calculator.inputDecimal();
  } else if (event.key === "+") {
    calculator.chooseOperator("add");
  } else if (event.key === "-") {
    calculator.chooseOperator("subtract");
  } else if (event.key === "*") {
    calculator.chooseOperator("multiply");
  } else if (event.key === "/") {
    calculator.chooseOperator("divide");
  } else if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    calculator.calculate();
  } else if (event.key === "Backspace") {
    calculator.delete();
  } else if (event.key === "Escape") {
    calculator.clear();
  } else {
    return;
  }

  render();
});

render();
