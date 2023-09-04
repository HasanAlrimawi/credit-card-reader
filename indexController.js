import { barcodeScannerController } from "./controllers/barcode-scanner-controller.js";
import { cardReaderController } from "./controllers/card-reader-controller.js";
import { indexView } from "./indexView.js";
import { peripheralsTagControl } from "./ui-components/peripherals.js";

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("barcode-scanner")
    .addEventListener("click", renderBarcodeScanner);

  document
    .getElementById("card-reader")
    .addEventListener("click", renderCardReader);
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
}
