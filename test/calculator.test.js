import test from "node:test";
import assert from "node:assert/strict";
import { Calculator } from "../src/calculator.js";

test("enters numbers and prevents duplicate decimal points", () => {
  const calculator = new Calculator();
  calculator.inputDigit("1");
  calculator.inputDecimal();
  calculator.inputDigit("2");
  calculator.inputDecimal();
  calculator.inputDigit("3");

  assert.equal(calculator.getDisplayValue(), "1.23");
});

test("calculates chained operations in sequence", () => {
  const calculator = new Calculator();
  calculator.inputDigit("2");
  calculator.chooseOperator("add");
  calculator.inputDigit("3");
  calculator.chooseOperator("multiply");
  calculator.inputDigit("4");
  calculator.calculate();

  assert.equal(calculator.getDisplayValue(), "20");
});

test("normalizes floating point arithmetic", () => {
  const calculator = new Calculator();
  calculator.inputDigit("0");
  calculator.inputDecimal();
  calculator.inputDigit("1");
  calculator.chooseOperator("add");
  calculator.inputDigit("0");
  calculator.inputDecimal();
  calculator.inputDigit("2");
  calculator.calculate();

  assert.equal(calculator.getDisplayValue(), "0.3");
});

test("reports division by zero and recovers on a new digit", () => {
  const calculator = new Calculator();
  calculator.inputDigit("8");
  calculator.chooseOperator("divide");
  calculator.inputDigit("0");
  calculator.calculate();

  assert.equal(calculator.getDisplayValue(), "Error");

  calculator.inputDigit("5");
  assert.equal(calculator.getDisplayValue(), "5");
});

test("supports sign changes, percent, and deleting digits", () => {
  const calculator = new Calculator();
  calculator.inputDigit("5");
  calculator.inputDigit("0");
  calculator.toggleSign();
  calculator.percent();

  assert.equal(calculator.getDisplayValue(), "-0.5");

  calculator.delete();
  assert.equal(calculator.getDisplayValue(), "-0.");
});

test("clear resets the complete calculation state", () => {
  const calculator = new Calculator();
  calculator.inputDigit("9");
  calculator.chooseOperator("add");
  calculator.clear();

  assert.equal(calculator.getDisplayValue(), "0");
  assert.equal(calculator.operator, null);
  assert.equal(calculator.accumulator, null);
});
