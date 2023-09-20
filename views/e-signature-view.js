/**
 * @fileoverview Provides functionality to render/update the view of
 * the e-signature.
 */
export const eSignatureView = (function () {
  /**
   * Represents the e-signature's HTML code.
   *
   * @const {string}
   */
  const esignatureHtml = function (themeUsed) {
    return `
      <div class="card-form">
      <span class="subtitle">E-Signature type</span>
      <div class="dropdown">
        <span class="dropdown-title">Select type</span>
        <div class="dropdown-content">
          <p class="dropdown-elements" id="image-based">Image based</p>
          <p class="dropdown-elements" id="coordinates-based">Coordinates based</p>
        </div>
      </div>
      <custom-button value="Scan" id="scan-signature-button"
        background-color="${themeUsed?.BACKGROUND_COLOR}"
        hover-background-color="${themeUsed?.HOVER_BACKGROUND_COLOR}"
        class="hidden">
      </custom-button>
    </div>`;
  };

  /**
   * Represents the e-signature image based type HTML code.
   */
  const esignatureImageTypeHtml = `
  <div class="card-form">
    <span class="subtitle">Scanned signature</span>
    <span class="download">
    <a id="signature-download" href="" download="e-signature.png"></a>
    </span>
    <div id="signature-wrapper">
      <img id="signature-img" alt="Signature to be scanned">
    </div
  </div>`;

  /**
   * Returns the e-signature coordinates based type HTML code.
   *
   * @param {!object} themeUsed Holds the value of the BUTTON_STYLING.CURRENT
   *     constant
   */
  const esignatureCoordinatesTypeHtml = function (themeUsed) {
    return `
    <div class="card-form">
      <span class="subtitle">Scanned signature co-ordinates</span>
      <input type="text" name="signatureCoordinates" id="signatureCoordinates" disabled="true"/>
      <div id="coordinate-signature-renderer"></div>
      <custom-button background-color="${themeUsed?.BACKGROUND_COLOR}" hover-background-color="${themeUsed?.HOVER_BACKGROUND_COLOR}"
        id="copy-button" value="Copy co-ordinates"></custom-button>
    </div>`;
  };

  return {
    esignatureHtml,
    esignatureImageTypeHtml,
    esignatureCoordinatesTypeHtml,
  };
})();
