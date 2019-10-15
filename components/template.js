const displayTemplate = document.createElement('template');
displayTemplate.innerHTML = `
    <style>
        :host {
            display: block;
        }
    </style>
    <div id="container"></div>
`;

class CustomElement extends HTMLElement {
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
        return [];
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }

    adoptedCallback() {
    }
}

window.customElements.define('custom-element', CustomElement);