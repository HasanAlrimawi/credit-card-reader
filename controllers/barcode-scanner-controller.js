import { barcodeScannerView } from "../views/barcode-scanner-view.js";
import { productsList } from "../models/products-list.js";
import { publishProductBarcodes } from "../communicators/communicator.js";
import { observer } from "../communicators/observer.js";

/**
 * @fileoverview Connects both the view and the model of the barcode scanner
 * exposes function to handle the device when view rendered and destroyed,
 * it also uses the communicator to make interaction with the device
 * and uses the observer pattern to listen to any data sent by the device.
 *
 * @public
 */
export const barcodeScannerController = (function () {
  /** @type {number} */
  let subscriberId_ = undefined;

  /**
   * Subscribes to the observer using the topic specified within.
   *
   * @see addProduct_, publishProductBarcodes, observer.subscribe
   */
  const makeSubscription_ = function () {
    subscriberId_ = observer.subscribe(
      "BARCODE_NEW_PRODUCT_SCANNED",
      (productCode) => {
        addProduct_(productCode);
      }
    );
  };

  /**
   * Makes important changes to the barcode UI before destruction.
   *
   * Unsubscribes from the observer.
   *
   * @see observer.unsubscribe
   */
  const finalizeWork = function () {
    observer.unsubscribe("BARCODE_NEW_PRODUCT_SCANNED", subscriberId_);
  };

  /**
   * Makes the effect of scanning new product's code be reflected on both
   *     the model and the view.
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
   * @see makeSubscription_
   */
  const renderBarcodeScannerView = function () {
    barcodeScannerView.renderBarcodeScanner();
    makeSubscription_();
    document
      .getElementById("scan-button")
      .addEventListener("click", publishProductBarcodes);
    document
      .getElementById("clear-button")
      .addEventListener("click", clearProductsList_);
  };

  return {
    finalizeWork,
    renderBarcodeScannerView,
  };
})();
