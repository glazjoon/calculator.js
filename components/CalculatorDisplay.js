const displayTemplate = document.createElement('template');
displayTemplate.innerHTML = `
    <style>
        :host {
            display: block;
            font-family: 'digital-7';
            background-color: rgb(225, 248, 209);
            color: rgb(145, 188, 122);
            margin: 10px 2.5px;
            padding: 5px;
            text-align: right;
            font-size: 25px;
            border: 1px solid #8a9a7f;
            border-radius: 2px;
        }
    </style>
    <div id="container">
        0
    </div>
`;

class CalculatorDisplay extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(displayTemplate.content.cloneNode(true));

        this.$container = this._shadowRoot.querySelector('#container');
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }

    static get observedAttributes() {
        return ['value'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.$container.innerHTML = newVal;
    }

    adoptedCallback() {
    }
}

window.customElements.define('calc-display', CalculatorDisplay);