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
    .getElementById("barcode-scanner")
    .addEventListener("click", renderBarcodeScanner);

  document
    .getElementById("card-reader")
    .addEventListener("click", renderCardReader);

  document
    .getElementById("e-signature")
    .addEventListener("click", renderEsignature);
});

function renderBarcodeScanner() {
  indexView.clearPrecedingDevice();
  barcodeScannerController.renderBarcodeScannerView();
  indexView.updateTitle("Barcode Scanner");
  peripheralsTagControl.highlightPeripheralSelected("barcode-scanner");

  document
    .getElementById("card-reader")
    .addEventListener("click", barcodeScannerController.finalizeWork, {
      once: true,
    });
  document
    .getElementById("e-signature")
    .addEventListener("click", cardReaderController.finalizeWork, {
      once: true,
    });
}

function renderCardReader() {
  indexView.clearPrecedingDevice();
  cardReaderController.renderCardReaderView();
  indexView.updateTitle("Card Reader");
  peripheralsTagControl.highlightPeripheralSelected("card-reader");

  document
    .getElementById("barcode-scanner")
    .addEventListener("click", cardReaderController.finalizeWork, {
      once: true,
    });
  document
    .getElementById("e-signature")
    .addEventListener("click", cardReaderController.finalizeWork, {
      once: true,
    });
}

function renderEsignature() {
  indexView.clearPrecedingDevice();
  eSignatureController.renderEsignatureView();
  indexView.updateTitle("E-Signature");
  peripheralsTagControl.highlightPeripheralSelected("e-signature");

  document
    .getElementById("barcode-scanner")
    .addEventListener("click", eSignatureController.finalizeWork, {
      once: true,
    });
  document
    .getElementById("card-reader")
    .addEventListener("click", cardReaderController.finalizeWork, {
      once: true,
    });
}
