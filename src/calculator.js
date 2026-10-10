const MAX_INPUT_LENGTH = 12;
const OPERATORS = new Set(["add", "subtract", "multiply", "divide"]);

function normalizeResult(value) {
  if (!Number.isFinite(value)) {
    return null;
  }

  return Number(value.toPrecision(12));
}

function applyOperator(left, right, operator) {
  switch (operator) {
    case "add":
      return left + right;
    case "subtract":
      return left - right;
    case "multiply":
      return left * right;
    case "divide":
      return right === 0 ? null : left / right;
    default:
      return null;
  }
}

export class Calculator {
  constructor() {
    this.clear();
  }

  clear() {
    this.currentInput = "0";
    this.accumulator = null;
    this.operator = null;
    this.awaitingOperand = false;
    this.error = false;
  }

  inputDigit(digit) {
    if (!/^\d$/.test(digit)) {
      return;
    }

    if (this.error) {
      this.clear();
    }

    if (this.awaitingOperand) {
      this.currentInput = digit;
      this.awaitingOperand = false;
    } else if (this.currentInput.replace("-", "").length < MAX_INPUT_LENGTH) {
      this.currentInput = this.currentInput === "0"
        ? digit
        : `${this.currentInput}${digit}`;
    }
  }

  inputDecimal() {
    if (this.error) {
      this.clear();
    }

    if (this.awaitingOperand) {
      this.currentInput = "0.";
      this.awaitingOperand = false;
    } else if (!this.currentInput.includes(".")) {
      this.currentInput += ".";
    }
  }

  chooseOperator(operator) {
    if (!OPERATORS.has(operator)) {
      return;
    }

    if (this.error) {
      return;
    }

    const value = Number(this.currentInput);
    if (this.operator && !this.awaitingOperand) {
      const result = normalizeResult(
        applyOperator(this.accumulator, value, this.operator),
      );
      if (result === null) {
        this.setError();
        return;
      }

      this.accumulator = result;
      this.currentInput = String(result);
    } else {
      this.accumulator = value;
    }

    this.operator = operator;
    this.awaitingOperand = true;
  }

  calculate() {
    if (!this.operator || this.awaitingOperand || this.error) {
      return;
    }

    const result = normalizeResult(
      applyOperator(
        this.accumulator,
        Number(this.currentInput),
        this.operator,
      ),
    );
    if (result === null) {
      this.setError();
      return;
    }

    this.currentInput = String(result);
    this.accumulator = null;
    this.operator = null;
    this.awaitingOperand = true;
  }

  toggleSign() {
    if (this.error) {
      return;
    }

    if (Number(this.currentInput) !== 0) {
      this.currentInput = this.currentInput.startsWith("-")
        ? this.currentInput.slice(1)
        : `-${this.currentInput}`;
    }
  }

  percent() {
    if (this.error) {
      return;
    }

    const value = normalizeResult(Number(this.currentInput) / 100);
    if (value === null) {
      this.setError();
      return;
    }

    this.currentInput = String(value);
    this.awaitingOperand = false;
  }

  delete() {
    if (this.error) {
      this.clear();
      return;
    }

    if (this.awaitingOperand) {
      return;
    }

    this.currentInput = this.currentInput.length > 1
      ? this.currentInput.slice(0, -1)
      : "0";

    if (this.currentInput === "-") {
      this.currentInput = "0";
    }
  }

  getDisplayValue() {
    return this.error ? "Error" : this.currentInput;
  }

  setError() {
    this.currentInput = "0";
    this.accumulator = null;
    this.operator = null;
    this.awaitingOperand = false;
    this.error = true;
  }
}
