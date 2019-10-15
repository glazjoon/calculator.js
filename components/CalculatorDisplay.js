const displayTemplate = document.createElement('template');
displayTemplate.innerHTML = `
    <style>
        :host {
            display: block;
        }

        #container {
            background-color: rgb(36, 32, 29);
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            padding: 0 10px 10px 10px;
        }

        #display {
            background-color: rgb(198, 188, 187);
            
            font-family: 'digital-7';
            font-weight: bold;
            font-size: 25px;
            text-align: right;
            color: rgb(36, 32, 29);

            border: 10px solid rgb(61, 57, 66);
            border-radius: 7.5px;
            
            padding: 3px 5px;
        }

        #logo {
            padding: 5px 0;
            color: white;
            font-size: 8px;
            text-align: right;
            margin-right: 5px;
        }
    </style>
    <div id="container">
    <div id="logo">KALKYLATOR v1.0</div>
    <div id="display">0</div>
    </div>
`;

class CalculatorDisplay extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(displayTemplate.content.cloneNode(true));

        this.$display = this._shadowRoot.querySelector('#display');
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }

    static get observedAttributes() {
        return ['value'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.$display.innerHTML = newVal;
    }

    adoptedCallback() {
    }
}

window.customElements.define('calc-display', CalculatorDisplay);