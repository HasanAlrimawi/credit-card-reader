import { devicesTitleId } from "../constants/device-title-id.js";

/**
 * @fileoverview Provides a cutom html tag to contain the available devices
 * and to highlight the chosen one out of the list exposed.
 */
class Peripherals extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `<div class="peripherals-list">
        <div class="subtitle">
          Peripherals
        </div>
        <span class="label" id=${devicesTitleId.cardReader.peripheralId}>${devicesTitleId.cardReader.title}</span>
        <span class="label" id=${devicesTitleId.eSignature.peripheralId}>${devicesTitleId.eSignature.title}</span>
        <span class="label" id=${devicesTitleId.barcodeScanner.peripheralId}>${devicesTitleId.barcodeScanner.title}</span>
      </div>`;
  }
}
// To declare the custom-peripherals tag.
customElements.define("custom-peripherals", Peripherals);

/**
 * Provides the ability to change the highlight on the selected device.
 */
export const peripheralsTagControl = (function () {
  /**
   * Highlights the selected peripheral page.
   *
   * @memberof peripheralsTagControl
   * @see removeHighlighting_
   *
   * @param {number} peripheralId represents the peripheral's id in HTML
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
