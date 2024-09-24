class Calculator {
    constructor(calculatorScreen) {
        this.calculatorScreen = calculatorScreen;
        this.reset();
    }

    reset() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    updateDisplay() {
        this.calculatorScreen.value = this.currentOperand;
    }

    handleButton(button) {
        const value = button.value;
        if (button.classList.contains('operator')) {
            this.chooseOperation(value);
        } else if (button.classList.contains('all-clear')) {
            this.reset();
        } else if (button.classList.contains('equal-sign')) {
            this.compute();
        } else {
            this.appendNumber(value);
        }
    }
}

const calculator = new Calculator(document.querySelector('.calculator-screen'));

document.querySelector('.calculator-keys').addEventListener('click', event => {
    if (!event.target.matches('button')) return;
    calculator.handleButton(event.target);
});
