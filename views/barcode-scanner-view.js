/**
 * @fileoverview Provides functionality to render/update the view of
 * the barcode scanner view.
 */
export const barcodeScannerView = (function () {
  /**
   * Appends the newly read product's barcode value into the scanned
   *     products list.
   * @memberof barcodeScannerView
   *
   * @param {string} productCode Represents the product's barcode read
   */
  const addProductCode = function (productCode) {
    const newProductBarcode = document.createElement("li");
    newProductBarcode.innerHTML = productCode;
    document
      .getElementById("list-of-scanned-products")
      .appendChild(newProductBarcode);
  };

  /**
   * Clears the scanned products list.
   * @memberof barcodeScannerView
   */
  const clearProductsList = function () {
    const list = document.getElementById("list-of-scanned-products");
    list.innerHTML = "";
  };

  /**
   * Returns the barcode scanner's HTML code.
   *
   * @param {!object} themeUsed Holds the value of the BUTTON_STYLING.CURRENT
   *     constant
   */
  const barcodeScannerHtml = function (themeUsed) {
    return `
    <div class="card-form">
      <span class="subtitle">Scanned products</span>
      <ul id="list-of-scanned-products"></ul>
    </div>
    <div class="card-form">
      <span class="subtitle">Control</span>
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
