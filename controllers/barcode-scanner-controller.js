import { barcodeScannerView } from "../views/barcode-scanner-view.js";
import { productsList } from "../models/products-list.js";
import { publishProductBarcodes } from "../communicators/communicator.js";
import { observer } from "../communicators/observer.js";
import { OBSERVER_TOPICS } from "../constants/observer-topics.js";
import { DEVICES_TITLE_ID } from "../constants/device-title-id.js";
import { BUTTON_STYLING } from "../constants/button-styling-constants.js";

/**
 * @fileoverview Connects both the view and the model of the barcode scanner
 * exposes function to handle the device when view is rendered and destroyed,
 * it also uses the communicator to make interaction with the device
 * and uses the observer pattern to listen to any data sent by the device.
 */
export const barcodeScannerController = (function () {
  /** @type {number} */
  let subscriberId_ = undefined;
  /** @type {string} represents the title that represents the device */
  const myTitle = DEVICES_TITLE_ID.BARCODE_SCANNER.TITLE;
  /** @type {string} represents the id that represents the device's title in
   *     the peripherals tag component
   */
  const myId = DEVICES_TITLE_ID.BARCODE_SCANNER.PERIPHERAL_ID;
  /** @type {object<string, string>} */
  let usedStyling_ = undefined;

  // To watch any changes occuring to the theme.
  observer.subscribe(OBSERVER_TOPICS.THEME_CHANGED, () => {
    usedStyling_ = BUTTON_STYLING.CURRENT;
  });
  // the button styling is addressed within two observer topics since it
  // should be handled in the case of theme change as a whole or specific
  // button change in specific
  observer.subscribe(OBSERVER_TOPICS.BUTTONS_COLOR_CHANGED, () => {
    usedStyling_ = BUTTON_STYLING.CURRENT;
  });

  /**
   * Makes important changes to the barcode UI before destruction.
   *
   * Unsubscribes from the observer.
   *
   * @see observer.unsubscribe
   */
  const finalizeWork = function () {
    observer.unsubscribe(OBSERVER_TOPICS.BARCODE_TOPIC, subscriberId_);
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
   */
  const clearProductsList_ = function () {
    productsList.clearList();
    barcodeScannerView.clearProductsList();
  };

  /**
   * Renders the barcode scanner page, highlights
   *     the peripheral selected, and makes subscription.
   *
   * @param {string} referenceElementId Represents the element id who will be
   *     used as a reference to add the HTML code
   * @param {string} insertionPosition Defines the location where the HTML code
   *     will be added to the reference element's perspective
   */
  const renderView = function (referenceElementId, insertionPosition) {
    document
      .getElementById(referenceElementId)
      .insertAdjacentHTML(
        insertionPosition,
        barcodeScannerView.barcodeScannerHtml(usedStyling_)
      );

    subscriberId_ = observer.subscribe(
      OBSERVER_TOPICS.BARCODE_TOPIC,
      (productCode) => {
        addProduct_(productCode);
      }
    );

    document
      .getElementById("scan-button")
      .addEventListener("click", publishProductBarcodes);
    document
      .getElementById("clear-button")
      .addEventListener("click", clearProductsList_);
  };

  return {
    finalizeWork,
    renderView,
    myId,
    myTitle,
  };
})();
