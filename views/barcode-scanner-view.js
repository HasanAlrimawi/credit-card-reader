export const barcodeScannerView = (function () {
  /**
   * Appends the newly read product's barcode value into the scanned
   *     products list.
   *
   * @access public
   * @memberof barcodeScannerView
   *
   * @param {String} productCode Represents the product's barcode read
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
   *
   * @access public
   * @memberof barcodeScannerView
   */
  const clearProductsList = function () {
    const list = document.getElementById("list-of-scanned-products");
    list.innerHTML = "";
  };

  /**
   * Renders the barcode scanner page, and rehighlights
   *     the peripheral selected.
   *
   * @access public
   */
  const renderBarcodeScanner = function () {
    document.getElementById("container")?.insertAdjacentHTML(
      "beforeend",
      `<div class="card-form">
          <span class="subtitle">Scanned products</span>
          <ul id="list-of-scanned-products"></ul>
        </div>
        <div class="card-form">
            <span class="subtitle">Instantanuous Scan</span>
            <input type="text" id="CCN" disabled="true" />
            <div class="form-row">
                <input type="button" id="scanButton" class="button" value="Scan" />
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
