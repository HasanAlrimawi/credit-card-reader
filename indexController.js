import { ELEMENT_INSERTION_POSITION } from "./constants/element-insertion-positions.js";
import { barcodeScannerController } from "./controllers/barcode-scanner-controller.js";
import { cardReaderController } from "./controllers/card-reader-controller.js";
import { eSignatureController } from "./controllers/e-signature-controller.js";
import { indexView } from "./indexView.js";
import { peripheralsTagControl } from "./ui-components/peripherals.js";

/**
 * @fileoverview Provides functionality to control how and when to render
 * any of the devices' views.
 */

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("toggle-theme-button")
    .addEventListener("click", toggler.changeTheme);

  document.getElementById("barcode-scanner").addEventListener("click", () => {
    showDevice(barcodeScannerController);
    eSignatureController.finalizeWork();
    cardReaderController.finalizeWork();
  });

  document.getElementById("card-reader").addEventListener("click", () => {
    showDevice(cardReaderController);
    eSignatureController.finalizeWork();
    barcodeScannerController.finalizeWork();
  });

  document.getElementById("e-signature").addEventListener("click", () => {
    showDevice(eSignatureController);
    cardReaderController.finalizeWork();
    barcodeScannerController.finalizeWork();
  });
});

/**
 * Renders the selected device's UI on the screen after clearing the preceding
 *     device's UI, then updates the title of the device shown and highlights
 *     its name in the list.
 *
 * @see indexView.clearPrecedingDevice, indexView.updateTitle,
 *     peripheralsTagControl.highlightPeripheralSelected
 *
 * @param {object} deviceController Represents the selected device's controller.
 */
function showDevice(deviceController) {
  indexView.clearPrecedingDevice();
  deviceController.renderView(
    "container",
    ELEMENT_INSERTION_POSITION.BEFORE_END
  );
  indexView.updateTitle(deviceController.myTitle);
  peripheralsTagControl.highlightPeripheralSelected(deviceController.myId);
}

/**
 * Wraps the state of the toggle to represent if the dark theme is selected
 *     or not, in order to allow the operation of toggling.
 */
const toggler = (function () {
  /** @private {boolean} */
  let toggleState_ = false;

  /**
   * toggles the theme selected, by changing a document attribute.
   */
  const changeTheme = function () {
    toggleState_ = !toggleState_;
    if (toggleState_) {
      document.documentElement.setAttribute("page-theme", "dark");
    } else {
      document.documentElement.setAttribute("page-theme", "light");
    }
  };
  return {
    changeTheme,
  };
})();
