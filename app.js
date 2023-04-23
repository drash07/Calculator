class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }
    
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {

        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
       
    }

    chooseOperation(operation) {
        console.log(this.currentOperand)
        if(this.currentOperand === '' && operation === '-') {
            this.operation = operation
            return
        }
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''
    }

    compute() {
        let computation
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        console.log(previous,' ', this.current)
        if(isNaN(previous) || isNaN(current)) return
        switch(this.operation) {
            case '+' : 
                computation = previous + current;
                break;
            case '-' : 
                computation = previous - current;
                break;
            case '*' : 
                computation = previous * current;
                break;
            case '/' : 
                computation = previous / current;
                break;
            default:
                return
        }
        this.currentOperand = computation
        this.previousOperand = ''
        this.operation = undefined
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if(this.operation === '-' && this.currentOperand === '') {
            this.currentOperand = this.operation
            this.currentOperandTextElement.innerText = this.currentOperand
            this.operation = ''
            return
        }
        if(this.operation) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = this.previousOperand;
        }
        
    }
}
const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const equals = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClear = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numbers.forEach(num => {
    num.addEventListener('click', () => {
        calculator.appendNumber(num.innerText);
        calculator.updateDisplay();
    });
});

operations.forEach(operation => {
    operation.addEventListener('click', () => {
        calculator.chooseOperation(operation.innerText);
        calculator.updateDisplay();
    });
});

equals.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClear.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})