/**
 * @fileoverview Provides functionality to render/update the view of
 * the card reader view.
 */
export const cardReaderView = (function () {
  /**
   * Fills the card information model data into the corresponding fields.
   *
   * It takes the model data, fills in the defined attributes of it,
   * and disables the fields of the undefined ones.
   * @memberof CardReaderView
   *
   * @param {!CardInformation} cardDetails
   */
  const autoFillForm = function (cardDetails) {
    document.getElementById("first-name").value = cardDetails.firstName;

    if (cardDetails.middleName == undefined) {
      const middleNameField = document.getElementById("middle-name");
      middleNameField.disabled = true;
      middleNameField.value = "Not Required";
    } else {
      document.getElementById("middle-name").value = cardDetails.middleName;
    }

    document.getElementById("last-name").value = cardDetails.lastName;
    document.getElementById("account-number").value = cardDetails.accountNumber;
    document.getElementById("expiration-date").value =
      cardDetails.expirationDate;

    if (cardDetails.countryCode == undefined) {
      const countryCodeField = document.getElementById("country-code");
      countryCodeField.disabled = true;
      countryCodeField.value = "Not Required";
    } else {
      document.getElementById("country-code").value = cardDetails.countryCode;
    }
  };

  /**
   * Returns the card reader's HTML code.
   *
   * @param {!object} themeUsed Holds the value of the BUTTON_STYLING.CURRENT
   *     constant
   */
  const cardReaderHtml = function (themeUsed) {
    return `<div class="card-form">
  <div class="form-row">
    <div class="form-group">
      <span class="label">First Name</span>
      <input type="text" name="cardHolderName" id="first-name" />
    </div>
    <div class="form-group">
      <span class="label">Middle Name</span>
      <input type="text" name="cardHolderName" id="middle-name" />
    </div>
    <div class="form-group">
      <span class="label">Last Name</span>
      <input type="text" name="cardHolderName" id="last-name" />
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <span class="label">Account Number</span>
      <input type="text" name="cardDetails" id="account-number" />
    </div>
    <div class="form-group">
      <span class="label">Expiration Date</span>
      <input type="text" name="cardDetails" id="expiration-date" />
    </div>
  </div>

  <div class="form-row">
    <div class="form-group">
      <span class="label">CCN/CVV</span>
      <input type="text" name="cardDetails" id="CCN" />
    </div>
    <div class="form-group">
      <span class="label">Country Code</span>
      <input type="text" name="cardDetails" id="country-code" />
    </div>
  </div>
  <custom-button value="Scan card" id="scan-card-button"
  background-color="${themeUsed?.BACKGROUND_COLOR}"
  hover-background-color="${themeUsed?.HOVER_BACKGROUND_COLOR}"></custom-button>
</div>`;
  };

  return {
    autoFillForm,
    cardReaderHtml,
  };
})();
