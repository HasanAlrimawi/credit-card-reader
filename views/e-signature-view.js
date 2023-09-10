/**
 * @fileoverview Provides functionality to render/update the view of
 * the e-signature view.
 */
export const eSignatureView = (function () {
  /**
   * Represents the e-signature's HTML code.
   * 
   * @const {string}
   */
  const esignatureHtml = `
  <div class="card-form">
    <span class="subtitle">E-Signature type</span>
    <div class="dropdown">
      <span class="dropdown-title">Select type</span>
      <div class="dropdown-content">
        <p class="dropdown-elements" id="image-based">Image based</p>
        <p class="dropdown-elements" id="coordinates-based">Coordinates based</p>
      </div>
    </div>
  </div>`;

  /**
   * Renders the specified e-signature device type.
   */
  const renderEsignatureImageType = function () {
    document.getElementById("container")?.insertAdjacentHTML(
      "beforeend",
      `<div class="card-form">
        <span class="subtitle">Scanned signature</span>
        <span class="download">
        <span>Download signature:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <a href="/assets/signature.png" download="e-signature.png">
            e-signature.png
          </a>
        </span>
      </div>`
    );
  };

  /**
   * Renders the specified e-signature device type.
   */
  const renderEsignatureCoordinatesType = function () {
    document.getElementById("container")?.insertAdjacentHTML(
      "beforeend",
      `<div class="card-form">
              <span class="subtitle">Scanned signature co-ordinates</span>
              <input type="text" name="signatureCoordinates" id="signatureCoordinates" disabled="true"/>
              <input type="button" class="button" id="copy-button" value="Copy co-ordinates" />
            </div>`
    );
  };

  return {
    esignatureHtml,
    renderEsignatureImageType,
    renderEsignatureCoordinatesType,
  };
})();
