class Peripherals extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `<div class="peripherals-list">
        <div class="subtitle">
          Peripherals
        </div>
        <a class="label" target="_self" id="cardReader" href="">Card Reader</a>
        <a class="label" target="_self" id="E-signature" href="">E-Signature</a>
        <a class="label" target="_self" id="QR-codeScanner" href="">QR-Code Scanner</a>
      </div>`;
    }
}
customElements.define("custom-peripherals", Peripherals);