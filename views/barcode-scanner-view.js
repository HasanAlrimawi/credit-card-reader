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
   * Renders the barcode scanner page, and rehighlights
   *     the peripheral selected.
   */
  const renderBarcodeScanner = function () {
    document.getElementById("container")?.insertAdjacentHTML(
      "beforeend",
      `<div class="card-form">
          <span class="subtitle">Scanned products</span>
          <ul id="list-of-scanned-products"></ul>
        </div>
        <div class="card-form">
            <span class="subtitle">Control</span>
            <div class="form-row">
                <input type="button" id="scan-button" class="button" value="Scan" />
                <input type="button" id="clear-button" class="button" value="Clear" />
            </div>
        </div>`
    );
  };

  return {
    renderBarcodeScanner,
    clearProductsList,
    addProductCode,
  };
})();
