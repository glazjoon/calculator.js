const appTemplate = document.createElement('template');
appTemplate.innerHTML = `
    <style>
        :host {
            display: inline-block;
            background-color: rgb(76, 76, 76);
            border-radius: 15px;
            padding: 3px;
            font-family: verdana;
            min-width: 150px;
        }
    </style>
    <div id="container">
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