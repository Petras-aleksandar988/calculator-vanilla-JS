class Calculator {
  constructor(previousTextElement, currentTextElement) {
    this.previousTextElement = previousTextElement;
    this.currentTextElement = currentTextElement;
    this.clear();
  }
  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  choseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let current = parseFloat(this.currentOperand);
    let previous = parseFloat(this.previousOperand);
    if (isNaN(current) || isNaN(previous)) return;
    let computation;

    switch (this.operation) {
      case "+":
        computation = current + previous;
        break;
      case "-":
        computation = previous - current;
        break;
      case "*":
        computation = previous * current;
        break;
      case "/":
        computation = previous / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }
  getDisplayNumber(number) {
    let stringNumber = number.toString();
    let integerNumbers = parseFloat(stringNumber.split(".")[0]);
    console.log(integerNumbers);
    let decimalNumbers = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerNumbers)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerNumbers.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalNumbers != null) {
      return `${integerDisplay}.${decimalNumbers}`;
    } else {
      return integerDisplay;
    }
  }
  updateDisplay() {
    this.currentTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
      }
    else {
   this.previousTextElement.innerText = ""
      }
  }
}

const eqalesButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const previousTextElement = document.querySelector("[data-previous]");
const currentTextElement = document.querySelector("[data-current]");

let calculator = new Calculator(previousTextElement, currentTextElement);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    calculator.choseOperation(e.target.innerText);
    calculator.updateDisplay();
  });
});

eqalesButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
