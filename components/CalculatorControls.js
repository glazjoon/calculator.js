const controlsTemplate = document.createElement('template');
controlsTemplate.innerHTML = `
    <style>
        :host {
            display: block;
            background-color: rgb(220, 218, 221);
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
            padding: 5px;
        }

        button {
            width: 40px;
            height: 30px;
            
            margin: 2.5px;
            
            border-radius: 7.5px;
            outline: none;

            font-size: 16px;
            font-weight: bold;
            color: white;

            background-color: rgb(150, 150, 150);

            cursor: pointer;
        }

        button:active {
            position:relative;
            top:1px;
        }

        .num {
            background-color: rgb(76, 76, 76);
        }

        .clear {
            background-color: rgb(137, 51, 60);
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

        this.render();
    }

    render() {
        const buttonSchema = [
            [
                { val: 'MR', fn: () => { } },
                { val: 'MC', fn: () => { } },
                { val: 'M+', fn: () => { } },
                { val: 'M-', fn: () => { } },
                { val: 'C', fn: () => { } },
            ],
            [
                { val: '1' },
                { val: '2' },
                { val: '3' },
                { val: '÷', fn: this.calc.div },
                { val: 'CE', fn: () => { } },
            ],
            [
                { val: '4' },
                { val: '5' },
                { val: '6' },
                { val: '×', fn: this.calc.mul },
                { val: '√', fn: () => { } },

            ],
            [
                { val: '7' },
                { val: '8' },
                { val: '9' },
                { val: '-', fn: this.calc.sub },
                { val: 'x²', fn: () => { } },

            ],
            [
                { val: '0' },
                { val: '.', fn: this.calc.dec },
                { val: '=', fn: this.calc.sum },
                { val: '+', fn: this.calc.add },
                { val: 'xʸ', fn: () => { } }

            ],
        ];

        for (let r of buttonSchema) {

            const buttonRowDiv = document.createElement('div');

            for (let b of r) {
                const button = document.createElement('button');
                const self = this;

                button.innerHTML = b.val;

                if (b.fn) {
                    switch (b.val) {
                        case '.':
                            button.className = 'num';
                            break;
                        case 'C':
                        case 'CE':
                            button.className = 'clear'
                            break;
                        default:
                            button.className = 'op';
                    }

                    button.addEventListener('click', function (e) {
                        e.target.className += ' activeOperation';
                        b.fn.call(self.calc);
                    });
                } else {
                    button.className = 'num';

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