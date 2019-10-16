class Calculator {

    constructor(printFn) {
        this.print = (text) => {
            this.currentlyPrintedValue = text;
            printFn(text);
        };
        this.clear();
    }

    add() {
        return this.setOperator((a, b) => a + b);
    }

    bindTrailingArgs(fn, ...boundArgs) {
        return function (...args) {
            return fn(...args, ...boundArgs);
        };
    }

    clear() {
        this.currentlyPrintedValue = '0';
        this.currentValue = '0';
        this.firstOperand = '';
        this.previousOperationType = null;
        this.previousSumOperation = null;
        this.operator = null;
        this.memory = 0;

        this.print(this.currentValue);
    }

    clearEntry() {
        this.currentValue = '0';
        this.print(this.currentValue);
    }

    dec() {
        if (this.currentValue.length > 0 && !this.currentValue.includes('.')) {
            this.currentValue += '.';
            this.print(this.currentValue);
            return this;
        }

        return this;
    }

    div() {
        return this.setOperator((a, b) => a / b);
    }

    exp() {
        return this.setOperator((a, b) => a ** b);
    }

    memAdd() {
        this.memory += parseFloat(this.currentlyPrintedValue);
    }

    memSub() {
        this.memory -= parseFloat(this.currentlyPrintedValue);
    }

    memRead() {
        this.currentValue = this.memory;
        this.print(this.currentValue);
    }

    memClear() {
        this.memory = 0;
    }

    mul() {
        return this.setOperator((a, b) => a * b);
    }

    num(n) {
        if (this.previousSumOperation) {
            this.currentValue = '' + n;
            this.previousSumOperation = null;
            this.operator = null;
        } else {
            this.currentValue = this.currentValue === '0' ?
                '' + n : this.currentValue + n;
        }

        this.print(this.currentValue);

        return this;
    }

    parseNumbers() {
        return {
            first: parseFloat(this.firstOperand),
            current: parseFloat(this.currentValue)
        };
    }

    setOperator(op) {
        const isConsecutiveOperation = this.firstOperand && this.currentValue && !this.previousSumOperation;

        if (isConsecutiveOperation) {
            const { first, current } = this.parseNumbers();
            this.firstOperand = '' + this.operator(first, current);
            this.print(this.firstOperand);
        }

        else if (!this.previousSumOperation) {
            this.firstOperand = this.currentValue;
        }

        this.currentValue = '';
        this.previousOperationType = 'op';
        this.previousSumOperation = null;
        this.operator = op;

        return this;
    }

    sub() {
        return this.setOperator((a, b) => a - b);
    }

    sum() {
        if (!this.operator || !this.currentValue) return this;

        const { first, current } = this.parseNumbers();

        if (this.previousOperationType === 'sum') {
            this.previousSumOperation(first)
        }

        this.previousSumOperation = this.bindTrailingArgs(this.operator, current);
        this.firstOperand = '' + this.operator(first, current);
        this.previousOperationType = 'sum';

        this.print(this.firstOperand);

        return this;
    }
}
