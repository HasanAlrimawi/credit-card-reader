import { publishProductBarcodes } from "./communicators/communicator.js";
import { observer } from "./communicators/observer.js";
import { barcodeScannerController } from "./controllers/barcode-scanner-controller.js";
import { cardReaderController } from "./controllers/card-reader-controller.js";
import { indexView } from "./indexView.js";

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("barcodeScanner")
    .addEventListener("click", renderBarcodeScanner);

  document
    .getElementById("cardReader")
    .addEventListener("click", renderCardReader);
});

function renderBarcodeScanner() {
  indexView.clearPrecedingDevice();
  barcodeScannerController.renderBarcodeScannerView();
  indexView.updateTitle("Barcode Scanner");

  document
    .getElementById("clearButton")
    .addEventListener("click", barcodeScannerController.clearProductsList);

  barcodeScannerController.makeSubscription();

  document.getElementById("cardReader").addEventListener("click", () => {
    barcodeScannerController.finalizeWork();
  });
}

function renderCardReader() {
  indexView.clearPrecedingDevice();
  cardReaderController.renderCardReaderView();
  indexView.updateTitle("Card Reader");

  cardReaderController.makeSubscription();

  document.getElementById("barcodeScanner").addEventListener("click", () => {
    cardReaderController.finalizeWork();
  });
}
