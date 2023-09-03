import { barcodeScannerView } from "../views/barcode-scanner-view.js";
import { productsList } from "../models/products-list.js";
import { publishProductBarcodes } from "../communicators/communicator.js";
import { observer } from "../communicators/observer.js";

export const barcodeScannerController = (function () {
  /** @type {number} */
  let subscriberId = undefined;

  /**
   * Subscribes to the observer using the topic specified within.
   *
   * @see _addProduct, publishProductBarcodes, observer.subscibe
   *
   * @access public
   */
  const _makeSubscription = function () {
    subscriberId = observer.subscribe(
      "BARCODE_NEW_PRODUCT_SCANNED",
      (productCode) => {
        _addProduct(productCode);
        publishProductBarcodes;
      }
    );
  };

  /**
   * Makes important changes to the barcode UI before destruction.
   *
   * Unsubscribes from the observer.
   *
   * @see observer.unsubscribe
   *
   * @access public
   */
  const finalizeWork = function () {
    observer.unsubscribe("BARCODE_NEW_PRODUCT_SCANNED", subscriberId);
  };

  /**
   * Makes the effect of scanning new product's code be reflected on both the model and the view.
   *
   * @access private
   *
   * @see productsList.appendToList, barcodeScannerView.addProductCode
   *
   * @param {string} productCode the code scanned by the barcode scanner off the product
   */
  const _addProduct = function (productCode) {
    productsList.appendToList(productCode);
    barcodeScannerView.addProductCode(productCode);
  };

  /**
   * Makes the effect of clearing the products' list be reflected on both the model and the view
   *
   * @access public
   *
   * @see productsList.clearList, barcodeScannerView.clearProductsList
   *
   * @param {string} productCode
   */
  const _clearProductsList = function () {
    productsList.clearList();
    barcodeScannerView.clearProductsList();
  };

  /**
   * Renders the barcode scanner page, highlights the peripheral selected, and makes subscription.
   *
   * @access public
   *
   * @see _makeSubscription
   */
  const renderBarcodeScannerView = function () {
    barcodeScannerView.renderBarcodeScanner();
    document
      .getElementById("clearButton")
      .addEventListener("click", _clearProductsList);

    _makeSubscription();
  };

  return {
    finalizeWork,
    renderBarcodeScannerView,
  };
})();
