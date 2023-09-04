class Peripherals extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `<div class="peripherals-list">
        <div class="subtitle">
          Peripherals
        </div>
        <span class="label" id="card-reader">Card Reader</span>
        <span class="label" id="e-signature">E-Signature</span>
        <span class="label" id="barcode-scanner">Barcode Scanner</span>
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
    selectedPeripheral.classList.add("selected-peripheral");
  };

  /**
   * Removes any highlighting previously specified for any device.
   */
  function removeHighlighting_() {
    document
      .getElementById("card-reader")
      .classList.remove("selected-peripheral");

    document
      .getElementById("e-signature")
      .classList.remove("selected-peripheral");

    document
      .getElementById("barcode-scanner")
      .classList.remove("selected-peripheral");
  }

  return {
    highlightPeripheralSelected,
  };
})();
