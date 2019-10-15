const appTemplate = document.createElement('template');
appTemplate.innerHTML = `
    <style>
        :host {
            display: inline-block;
            padding: 3px 10px 10px 10px;
            border: 1px solid #8a9a7f;
            border-radius: 3px;
            font-family: verdana;
        }

        #about {
            font-size: 60%;
            margin: 4px;
        }
    </style>
    <div id="container">
        <div id="about">
            Calculator
            <span style="float: right">
            v1.0
            </span>
        </div>
        <calc-display></calc-display>
        <calc-controls></calc-controls>
    </div>
`;

class CalculatorApp extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(appTemplate.content.cloneNode(true));

        this.$container = this._shadowRoot.querySelector('#container');
        this.$controls = this._shadowRoot.querySelector('calc-controls');
        this.$display = this._shadowRoot.querySelector('calc-display')

        this.calc = new Calculator(function (text) {
            this.$display.setAttribute('value', text);
        }.bind(this));

        this.$controls.calc = this.calc;
        this.$display.calc = this.calc;
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }

    adoptedCallback() {
    }
}

window.customElements.define('calc-app', CalculatorApp);