import { observer } from "../communicators/observer.js";
import { peripheralsTagControl } from "../ui-components/peripherals.js";
import { barcodeScannerView } from "../views/barcode-scanner-view.js";
import { publishProductBarcodes } from "../communicators/communicator.js";
import { productsList } from "../models/products-list.js";
document.addEventListener("DOMContentLoaded", () => {
  peripheralsTagControl.highlightPeripheralSelected("qrCodeScanner");
});

document
  .getElementById("clearButton")
  .addEventListener("click", clearProductsList);

observer.subscribe("BARCODE_NEW_PRODUCT_SCANNED", (productCode) => {
  addProduct(productCode);
  publishProductBarcodes;
});

/**
 * Makes the effect of scanning new product's code be reflected on both the model and the view
 *
 * @access global
 *
 * @see productsList.appendToList, barcodeScannerView.addProductCode
 *
 * @param {String} productCode
 */
function addProduct(productCode) {
  productsList.appendToList(productCode);
  barcodeScannerView.addProductCode(productCode);
}

/**
 * Makes the effect of clearing the products' list be reflected on both the model and the view
 *
 * @access global
 *
 * @see productsList.clearList, barcodeScannerView.clearProductsList
 *
 * @param {String} productCode
 */
function clearProductsList() {
  productsList.clearList();
  barcodeScannerView.clearProductsList();
}
