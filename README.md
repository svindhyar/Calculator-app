# Calculator

A responsive, keyboard-accessible calculator built with plain HTML, CSS, and JavaScript. It supports addition, subtraction, multiplication, division, decimals, percentages, sign changes, digit deletion, and chained operations.

## Features

- Responsive layout for desktop and mobile screens.
- Keyboard and button input.
- Accessible, labeled controls and a live-updating result display.
- Chained calculations evaluated in sequence from left to right.
- Floating-point result cleanup to avoid common artifacts such as `0.1 + 0.2` displaying as `0.30000000000000004`.
- Clear error state for invalid results such as division by zero.
- No runtime dependencies or build step.

## Project structure

```text
.
├── index.html                 # Page structure and calculator keys
├── styles.css                 # Responsive calculator styling
├── src/
│   ├── calculator.js          # Arithmetic and input state
│   └── main.js                # DOM events, keyboard controls, and rendering
├── test/
│   └── calculator.test.js     # Unit tests for calculator behavior
└── package.json               # Project metadata and test command
```

## How it works

The app separates calculation rules from the browser interface:

1. `index.html` provides semantic page content and buttons. Each key describes its purpose with a `data-digit`, `data-operator`, or `data-action` attribute.
2. `src/main.js` listens for button clicks and keyboard input. It sends those inputs to the calculator model, then updates the display and the selected-operation state.
3. `src/calculator.js` owns the calculator state: the current input, the stored accumulator, the selected operator, whether it is waiting for an operand, and whether an error is being shown. It does not depend on the DOM, so its behavior can be tested independently.
4. Each new operator completes any pending operation before storing the next one. This deliberately evaluates chained input in sequence: `2 + 3 × 4` produces `20`.
5. Results are checked for finite values and rounded to 12 significant digits to keep typical floating-point artifacts out of the display. Division by zero shows `Error`; entering a new digit starts a fresh calculation.

Percentage divides the current value by 100. Clear resets the calculation, sign toggles the current non-zero value, and delete removes its last entered character.

## Run locally

Serve the project directory with any static HTTP server, then open its URL in a browser. For example, with Python installed:

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000>.

## Run tests

Node.js 18 or later is required to run the tests. No dependencies need to be installed.

```sh
npm test
```

## Keyboard shortcuts

- `0`–`9` and `.` enter numbers.
- `+`, `-`, `*`, and `/` select an operation.
- `Enter` or `=` calculates.
- `Backspace` deletes the last digit.
- `Escape` clears the calculator.
