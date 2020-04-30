// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>
const calculator = document.querySelector(".caculator");
const input = calculator.querySelector("input");
let temp = 0;

function handleButton(event) {
  const isButton = event.target.nodeName === "BUTTON";
  if (!isButton) {
    return;
  }

  const key = event.target;
  const action = key.dataset.action;
  const keyContent = key.textContent;
  const displayedNum = input.value;
  const previousKeyType = calculator.dataset.previousKeyType;

  const calculate = (n1, operator, n2) => {
    let result = "";

    if (operator === "add") {
      result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === "subtract") {
      result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === "multiply") {
      result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === "divide") {
      result = parseFloat(n1) / parseFloat(n2);
    }
    return result;
  };

  if (!action) {
    console.log("number key");
    if (
      displayedNum === "0" ||
      previousKeyType === "operator" ||
      previousKeyType === "calculate"
    ) {
      input.value = keyContent;
    } else {
      input.value = displayedNum + keyContent;
    }
    calculator.dataset.previousKeyType = "number";

    // 모든 키에서 .is-depressed를 지운다.
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );
  }

  if (
    action === "add" ||
    action === "subtract" ||
    action === "multiply" ||
    action === "divide"
  ) {
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = displayedNum;

    if (
      firstValue &&
      operator &&
      previousKeyType !== "operator" &&
      previousKeyType !== "calculate"
    ) {
      const calcValue = calculate(firstValue, operator, secondValue);
      input.value = calculate(firstValue, operator, secondValue);
      calculator.dataset.firstValue = calcValue;
    } else {
      calculator.dataset.firstValue = displayedNum;
    }

    key.classList.add("is-depressed");
    calculator.dataset.previousKeyType = "operator";
    // calculator.dataset.firstValue = displayedNum;
    calculator.dataset.operator = action;
  }

  if (action === "clear") {
    if (key.textContent === "AC") {
      calculator.dataset.firstValue = "";
      calculator.dataset.modValue = "";
      calculator.dataset.operator = "";
      calculator.dataset.previousKeyType = "";
    } else {
      key.textContent = "AC";
    }
    input.value = 0;
    calculator.dataset.previousKeyType = "clear";
  }

  if (action === "calculate") {
    let firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    let secondValue = displayedNum;

    if (firstValue) {
      if (previousKeyType === "calculate") {
        firstValue = displayedNum;
        secondValue = calculator.dataset.modValue;
      }
      input.value = calculate(firstValue, operator, secondValue);
    }
    calculator.dataset.modValue = secondValue;
    calculator.dataset.previousKeyType = "calculate";
  }
}

calculator.addEventListener("click", handleButton);

function init() {}
init();
