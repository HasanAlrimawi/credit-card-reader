import { peripheralsTagControl } from "./ui-components/peripherals.js";

export const indexView = (function () {
  /**
   * Renders the barcode scanner page after clearing the preceding peripheral page if found, and rehighlights the peripheral selected.
   *
   * @public
   *
   * @see _clearPrecedingDevice, peripheralsTagControl.highlightPeripheralSelected
   */
  const renderBarcodeScanner = function () {
    _clearPrecedingDevice();
    document.getElementById("container")?.insertAdjacentHTML(
      "beforeend",
      `<div class="card-form">
    <span class="subtitle">Scanned products</span>
    <ul id="listOfScannedProducts">
    </ul>
  </div>
  <div class="card-form">
    <span class="subtitle">Instantanuous Scan</span>
    <input type="text" id="CCN" disabled="true" />
    <div class="form-row">
      <input type="button" id="scanButton" class="button" value="Scan" />
      <input type="button" id="clearButton" class="button" value="Clear" />
    </div>
  </div>`
    );
    peripheralsTagControl.highlightPeripheralSelected("barcodeScanner");
    _updateTitle("Barcode Scanner");
  };

  /**
   * Renders the card reader page after clearing the preceding peripheral page if found, and rehighlights the peripheral selected.
   *
   * @public
   *
   * @see _clearPrecedingDevice, peripheralsTagControl.highlightPeripheralSelected
   */
  const renderCardReader = function () {
    _clearPrecedingDevice();
    document.getElementById("container")?.insertAdjacentHTML(
      "beforeend",
      `<div class="card-form">
        <div class="form-row">
          <div class="form-group">
            <span class="label">First Name</span>
            <input type="text" name="cardHolderName" id="firstName" />
          </div>
          <div class="form-group">
            <span class="label">Middle Name</span>
            <input type="text" name="cardHolderName" id="middleName" />
          </div>
          <div class="form-group">
            <span class="label">Last Name</span>
            <input type="text" name="cardHolderName" id="lastName" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <span class="label">Account Number</span>
            <input type="text" name="cardDetails" id="accountNumber" />
          </div>
          <div class="form-group">
            <span class="label">Expiration Date</span>
            <input type="text" name="cardDetails" id="expirationDate" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <span class="label">CCN/CVV</span>
            <input type="text" name="cardDetails" id="CCN" />
          </div>
          <div class="form-group">
            <span class="label">Country Code</span>
            <input type="text" name="cardDetails" id="countryCode" />
          </div>
        </div>
      </div>`
    );
    peripheralsTagControl.highlightPeripheralSelected("cardReader");
    _updateTitle("Card Reader");
  };

  function _updateTitle(newTitle) {
    document.getElementById("openedDevice").innerText = newTitle;
  }
  function _clearPrecedingDevice() {
    const container = document.getElementById("container");
    let childsCount = container.childElementCount;
    while (childsCount > 1) {
      container.removeChild(container.children[1]);
      childsCount = container.childElementCount;
    }
  }
  return {
    renderBarcodeScanner: renderBarcodeScanner,
    renderCardReader: renderCardReader,
  };
})();
