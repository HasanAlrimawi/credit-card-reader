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
  return {
    clearProductsList: clearProductsList,
    addProductCode: addProductCode,
  };
})();
