export const productsList = (function () {
  /** @private {string[]} */
  let _productsScannedList = [];

  /**
   * Clears the list model object holding the products scanned.
   *
   * @access public
   * @memberof productsList
   */
  function clearList() {
    _productsScannedList.length = 0;
  }

  /**
   * Appends the newly scanned product's barcode to the list model object holding the products scanned.
   *
   * @access public
   * @memberof productsList
   */
  function appendToList(newProductScanned) {
    _productsScannedList.push(newProductScanned);
  }

  return {
    clearList,
    appendToList,
  };
})();
