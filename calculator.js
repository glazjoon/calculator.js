class Calculator {

    currentValue = '0';
    firstOperand = '';
    
    repeatOperation = null;
    awaitingSecond = false;
    operator = null;

    constructor(printFn) {
        this.print = printFn;
    }

    add(n1, n2) {
        return this.setOperator((a, b) => a + b, n1, n2);
    }

    bindTrailingArgs(fn, ...boundArgs) {
        return function (...args) {
            return fn(...args, ...boundArgs);
        };
    }

    dec() {
        if (this.currentValue.length > 0 && !this.currentValue.includes('.')) {
            this.currentValue += '.';
            this.print(this.currentValue);
            return this;
        }

        return this;
    }

    div(n1, n2) {
        return this.setOperator((a, b) => a / b, n1, n2);
    }

    exp(n1, n2) {
        return this.setOperator((a, b) => a ** b, n1, n2);
    }

    mul(n1, n2) {
        return this.setOperator((a, b) => a * b, n1, n2);
    }

    num(n) {
        if (this.repeatOperation) {
            this.currentValue = '' + n;
            this.repeatOperation = null;
            this.operator = null;
        } else {
            this.currentValue = this.currentValue === '0' ?
                '' + n : this.currentValue + n;
        }

        this.print(this.currentValue);

        return this;
    }

    parse() {
        return {
            first: parseFloat(this.firstOperand),
            current: parseFloat(this.currentValue)
        };
    }

    setOperator(op, n1, n2) {

        if (n1) {
            this.firstOperand = n1;
        } else if (!this.repeatOperation) {
            this.firstOperand = this.currentValue;
        }

        this.currentValue = n2 ? n2 : '';
        this.awaitingSecond = !!n1 && !!n2;
        this.repeatOperation = null;
        this.operator = op;

        return this;
    }

    sub(n1, n2) {
        return this.setOperator((a, b) => a - b, n1, n2);
    }

    sum() {
        if (!this.operator || !this.currentValue) return this;

        this.awaitingSecond = false;

        const { first, current } = this.parse();

        if (this.repeatOperation) {
            this.repeatOperation(first)
        }

        this.firstOperand = '' + this.operator(first, current);

        this.repeatOperation = this.bindTrailingArgs(this.operator, current);

        this.print(this.firstOperand);

        return this;
    }
}
