export const productsList = (function () {
  /** @private {string[]} */
  let productsScannedList_ = [];

  /**
   * Clears the list model object holding the products scanned.
   *
   * @access public
   * @memberof productsList
   */
  function clearList() {
    productsScannedList_.length = 0;
  }

  /**
   * Appends the newly scanned product's barcode to the list model
   *     object holding the products scanned.
   *
   * @access public
   * @memberof productsList
   */
  function appendToList(newProductScanned) {
    productsScannedList_.push(newProductScanned);
  }

  return {
    clearList,
    appendToList,
  };
})();
