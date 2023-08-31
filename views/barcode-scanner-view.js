import { peripheralsTagControl } from "../ui-components/peripherals.js";

export const barcodeScannerView = (function () {
  /**
   * Appends the newly read product's barcode value into the scanned products list.
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
      .getElementById("listOfScannedProducts")
      .appendChild(newProductBarcode);
  };

  /**
   * Clears the scanned products list.
   *
   * @access public
   * @memberof barcodeScannerView
   */
  const clearProductsList = function () {
    const list = document.getElementById("listOfScannedProducts");
    list.innerHTML = "";
  };

  /**
   * Renders the barcode scanner page, and rehighlights the peripheral selected.
   *
   * @public
   *
   * @see peripheralsTagControl.highlightPeripheralSelected
   */
  const renderBarcodeScanner = function () {
    document.getElementById("container")?.insertAdjacentHTML(
      "beforeend",
      `<div class="card-form">
  <span class="subtitle">Scanned products</span>
  <ul id="listOfScannedProducts">
  </ul>
</div>
<div class="card-form">
  <span class="subtitle">Instantanuous Scan</span>
  <input type="text" id="CCN" disabled="true" />
  <div class="form-row">
    <input type="button" id="scanButton" class="button" value="Scan" />
    <input type="button" id="clearButton" class="button" value="Clear" />
  </div>
</div>`
    );
    peripheralsTagControl.highlightPeripheralSelected("barcodeScanner");
  };

  return {
    renderBarcodeScanner: renderBarcodeScanner,
    clearProductsList: clearProductsList,
    addProductCode: addProductCode,
  };
})();
