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
  indexView.renderBarcodeScanner();
  document
    .getElementById("clearButton")
    .addEventListener("click", barcodeScannerController.clearProductsList);
  const barcodeScannerSubscriberId = observer.subscribe(
    "BARCODE_NEW_PRODUCT_SCANNED",
    (productCode) => {
      barcodeScannerController.addProduct(productCode);
      publishProductBarcodes;
    }
  );
  document.getElementById("cardReader").addEventListener("click", () => {
    observer.unsubscribe(
      "BARCODE_NEW_PRODUCT_SCANNED",
      barcodeScannerSubscriberId
    );
  });
}

function renderCardReader() {
  indexView.renderCardReader();
  const cardReaderSubscriberId = observer.subscribe(
    "MAGNETIC_CARD_READ",
    (magneticStripeRead) => {
      cardReaderController.updateCardReaderViewAndModel(magneticStripeRead);
    }
  );
  document.getElementById("barcodeScanner").addEventListener("click", () => {
    observer.unsubscribe("MAGNETIC_CARD_READ", cardReaderSubscriberId);
  });
}
