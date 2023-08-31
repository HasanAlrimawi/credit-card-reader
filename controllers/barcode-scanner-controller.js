import { barcodeScannerView } from "../views/barcode-scanner-view.js";
import { productsList } from "../models/products-list.js";

export const barcodeScannerController = (function () {
  /**
   * Makes the effect of scanning new product's code be reflected on both the model and the view.
   *
   * @access global
   *
   * @see productsList.appendToList, barcodeScannerView.addProductCode
   *
   * @param {String} productCode the code scanned by the barcode scanner off the product
   */
  const addProduct = function (productCode) {
    productsList.appendToList(productCode);
    barcodeScannerView.addProductCode(productCode);
  };

  /**
   * Makes the effect of clearing the products' list be reflected on both the model and the view
   *
   * @access global
   *
   * @see productsList.clearList, barcodeScannerView.clearProductsList
   *
   * @param {String} productCode
   */
  const clearProductsList = function () {
    productsList.clearList();
    barcodeScannerView.clearProductsList();
  };

  /**
   * Renders the barcode scanner page and rehighlights the peripheral selected.
   *
   * @public
   *
   */
  const renderBarcodeScannerView = function () {
    barcodeScannerView.renderBarcodeScanner();
  };

  return {
    addProduct: addProduct,
    clearProductsList: clearProductsList,
    renderBarcodeScannerView: renderBarcodeScannerView,
  };
})();
