import { barcodeScannerView } from "../views/barcode-scanner-view.js";
import { productsList } from "../models/products-list.js";
import { publishProductBarcodes } from "../communicators/communicator.js";
import { observer } from "../communicators/observer.js";

export const barcodeScannerController = (function () {
  /** @private {number} */
  let subscriberId_ = undefined;

  /**
   * Subscribes to the observer using the topic specified within.
   *
   * @see addProduct_, publishProductBarcodes, observer.subscribe
   *
   * @access public
   */
  const makeSubscription_ = function () {
    subscriberId_ = observer.subscribe(
      "BARCODE_NEW_PRODUCT_SCANNED",
      (productCode) => {
        addProduct_(productCode);
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
    observer.unsubscribe("BARCODE_NEW_PRODUCT_SCANNED", subscriberId_);
  };

  /**
   * Makes the effect of scanning new product's code be reflected on both
   *     the model and the view.
   *
   * @access private
   *
   * @see productsList.appendToList, barcodeScannerView.addProductCode
   *
   * @param {string} productCode the code scanned by the barcode scanner
   *     off the product
   */
  const addProduct_ = function (productCode) {
    productsList.appendToList(productCode);
    barcodeScannerView.addProductCode(productCode);
  };

  /**
   * Makes the effect of clearing the products' list be reflected
   *     on both the model and the view
   *
   * @access public
   *
   * @see productsList.clearList, barcodeScannerView.clearProductsList
   *
   * @param {string} productCode
   */
  const clearProductsList_ = function () {
    productsList.clearList();
    barcodeScannerView.clearProductsList();
  };

  /**
   * Renders the barcode scanner page, highlights
   *     the peripheral selected, and makes subscription.
   *
   * @access public
   *
   * @see makeSubscription_
   */
  const renderBarcodeScannerView = function () {
    barcodeScannerView.renderBarcodeScanner();
    document
      .getElementById("clearButton")
      .addEventListener("click", clearProductsList_);
    makeSubscription_();
  };

  return {
    finalizeWork,
    renderBarcodeScannerView,
  };
})();
