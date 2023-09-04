class Peripherals extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `<div class="peripherals-list">
        <div class="subtitle">
          Peripherals
        </div>
        <span class="label" id="cardReader">Card Reader</span>
        <span class="label" id="eSignature">E-Signature</span>
        <span class="label" id="barcodeScanner">Barcode Scanner</span>
      </div>`;
  }
}
customElements.define("custom-peripherals", Peripherals);

export const peripheralsTagControl = (function () {
  /**
   * Highlights the selected peripheral page.
   * @access public
   * @memberof peripheralsTagControl
   * @see removeHighlighting_
   */
  const highlightPeripheralSelected = function (peripheralId) {
    removeHighlighting_();
    const selectedPeripheral = document.getElementById(peripheralId);
    selectedPeripheral.classList.add("selectedPeripheral");
  };

  /**
   * Removes any highlighting previously specified for any device.
   */
  function removeHighlighting_() {
    document
      .getElementById("cardReader")
      .classList.remove("selectedPeripheral");

    document
      .getElementById("eSignature")
      .classList.remove("selectedPeripheral");

    document
      .getElementById("barcodeScanner")
      .classList.remove("selectedPeripheral");
  }

  return {
    highlightPeripheralSelected,
  };
})();
