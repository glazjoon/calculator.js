const controlsTemplate = document.createElement('template');
controlsTemplate.innerHTML = `
    <style>
        :host {
            display: block;
        }

        button {
            font-family: verdana;
            color: rgb(72, 100, 60);
            background-color: rgb(137, 193, 113);
            width: 30px;
            height: 30px;
            margin: 2.5px;
        }
    </style>
    <div id="container"></div>
`;

class CalculatorControls extends HTMLElement {
    constructor(c) {
        super();

        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(controlsTemplate.content.cloneNode(true));

        this.$container = this._shadowRoot.querySelector('#container');

        const buttonSchema = [
            [
                { val: '1' },
                { val: '2' },
                { val: '3' },
                { val: '+', fn: this.calc.add }
            ],
            [
                { val: '4' },
                { val: '5' },
                { val: '6' },
                { val: '-', fn: this.calc.sub }
            ],
            [
                { val: '7' },
                { val: '8' },
                { val: '9' },
                { val: '×', fn: this.calc.mul }
            ],
            [
                { val: '0' },
                { val: '.', fn: this.calc.dec },
                { val: '=', fn: this.calc.sum },
                { val: '÷', fn: this.calc.div }
            ],
        ];

        for (let r of buttonSchema) {

            const buttonRowDiv = document.createElement('div');

            for (let b of r) {
                const button = document.createElement('button');

                const self = this;

                button.innerHTML = b.val;

                if (b.fn) {
                    button.addEventListener('click', function (e) {
                        b.fn.call(self.calc);
                    });
                } else {
                    button.addEventListener('click', function (e) {
                        self.calc.num(b.val);
                    });
                }

                buttonRowDiv.appendChild(button);
            }

            this.$container.appendChild(buttonRowDiv);
        }
    }
}

window.customElements.define('calc-controls', CalculatorControls);