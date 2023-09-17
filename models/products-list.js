/**
 * @fileoverview Applies the revealing module pattern in order to organize
 * the access and modification of the products list model.
 */
export const productsList = (function () {
  /** @private {array<number>} */
  let productsScannedList_ = [];

  /**
   * Clears the list model object holding the products scanned.
   *
   * @memberof productsList
   */
  function clearList() {
    productsScannedList_.length = 0;
  }

  /**
   * Appends the newly scanned product's barcode to the list model
   *     object holding the products scanned.
   *
   * @memberof productsList
   *
   * @param {string} newProductScanned
   */
  function appendToList(newProductScanned) {
    productsScannedList_.push(newProductScanned);
  }

  return {
    clearList,
    appendToList,
  };
})();
