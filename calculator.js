let runningTotal = 0;
let buffer = "0";
let previousOperator;
let screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "=":
      if (previousOperator === null) {
        return;
      } else {
        handleOperation(parseInt(buffer));
        previousOperator = null;
        buffer = +runningTotal;
        runningTotal = 0;
      }
      break;
    case "÷":
    case "×":
    case "-":
    case "+":
      handleMath(value);
      break;
  }
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleOperation(integerBuffer) {
  if (previousOperator === "+") {
    runningTotal += integerBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= integerBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= integerBuffer;
  } else {
    runningTotal /= integerBuffer;
  }
}

function handleMath(value) {
  if (buffer === "0") {
    return;
  }

  const integerBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = integerBuffer;
  } else {
    handleOperation(integerBuffer);
  }

  previousOperator = value;

  buffer = "0";
}

function rerender() {
  screen.innerText = buffer;
}

function showScreenChanges() {
  document
    .querySelector(".calculator-buttons")
    .addEventListener("click", function(event) {
      buttonClick(event.target.innerText);
    });
}

showScreenChanges();