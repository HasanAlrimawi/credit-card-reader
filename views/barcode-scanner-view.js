import { ELEMENT_INSERTION_POSITION } from "../constants/element-insertion-positions.js";

/**
 * @fileoverview Provides functionality to render/update the view of
 * the barcode scanner.
 */
export const barcodeScannerView = (function () {
  let firstScan_ = true;
  /**
   * Appends the newly read product's barcode value into the scanned
   *     products list.
   * @memberof barcodeScannerView
   *
   * @param {string} productCode Represents the product's barcode read
   */
  const addProductCode = function (productCode) {
    if (!firstScan_) {
      const scanInputField = document.getElementById("first-scan");
      const spanElement = document.createElement("span");
      spanElement.textContent = scanInputField.value;
      scanInputField.value = productCode;
      scanInputField.insertAdjacentElement(ELEMENT_INSERTION_POSITION.AFTER_END, spanElement);
    } else {
      const newProductBarcode = document.createElement("input");
      newProductBarcode.setAttribute("type", "text");
      newProductBarcode.setAttribute("value", productCode);
      newProductBarcode.setAttribute("id", "first-scan");
      const wrapper = document.getElementById("list-of-scanned-products");
      wrapper.insertBefore(newProductBarcode, wrapper.firstChild);
      firstScan_ = false;
    }
  };

  // const addProductCode = function (productCode) {
  //   const newProductBarcode = document.createElement("input");
  //   newProductBarcode.setAttribute("type", "text");
  //   newProductBarcode.setAttribute("value", productCode);
  //   const wrapper = document.getElementById("list-of-scanned-products");
  //   wrapper.insertBefore(newProductBarcode, wrapper.firstChild);
  // };

  /**
   * Clears the scanned products list.
   * @memberof barcodeScannerView
   */
  const clearProductsList = function () {
    const list = document.getElementById("list-of-scanned-products");
    list.innerHTML = "";
    firstScan_ = true;
  };

  /**
   * Returns the barcode scanner's HTML code.
   *
   * @param {!object<string> | undefined} themeUsed Holds the value of the BUTTON_STYLING.CURRENT
   *     constant
   */
  const barcodeScannerHtml = function (themeUsed) {
    // As this function gets called then that means the device's page will
    // get its first scan
    firstScan_ = true;
    return `
    <div class="card-form">
      <span class="subtitle">Scanned products</span>
      <div class="card-form" id="list-of-scanned-products"></div>
    </div>
    <div class="card-form">
      <div class="form-row">
        <custom-button background-color="${themeUsed?.BACKGROUND_COLOR}" hover-background-color="${themeUsed?.HOVER_BACKGROUND_COLOR}"
          id="scan-button" class="button" value="Scan"> </custom-button>
        <custom-button background-color="${themeUsed?.BACKGROUND_COLOR}" hover-background-color="${themeUsed?.HOVER_BACKGROUND_COLOR}"
          id="clear-button" class="button" value="Clear"> </custom-button>
      </div>
    </div>`;
  };

  return {
    barcodeScannerHtml,
    clearProductsList,
    addProductCode,
  };
})();
