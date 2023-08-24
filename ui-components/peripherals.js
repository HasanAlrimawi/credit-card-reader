class Peripherals extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `<div class="peripherals-list">
        <div class="subtitle">
          Peripherals
        </div>
        <a class="label" target="_self" id="cardReader" href="../card-reader.html">Card Reader</a>
        <a class="label" target="_self" id="eSignature" href="">E-Signature</a>
        <a class="label" target="_self" id="qrCodeScanner" href="../barcode-scanner.html">QR-Code Scanner</a>
      </div>`;
  }
}
customElements.define("custom-peripherals", Peripherals);

export const peripheralsTagControl = (function () {
  /**
   * Highlights the selected peripheral page.
   * @access public
   * @memberof peripheralsTagControl
   */
  const highlightPeripheralSelected = function (peripheralId) {
    const selectedPeripheral = document.getElementById(peripheralId);
    selectedPeripheral.style.color = "#ff9800";
    selectedPeripheral.style.boxShadow = "0 0 4px rgba(0, 0, 0, 0.1)";
  };
  return{
    highlightPeripheralSelected: highlightPeripheralSelected 
  };
})();
