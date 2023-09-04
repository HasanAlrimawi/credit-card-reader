import { peripheralsTagControl } from "../ui-components/peripherals.js";

export const cardReaderView = (function () {
  /**
   * Fills the card information model data into the corresponding fields.
   *
   * It takes the model data, fills in the defined attributes of it,
   * and disables the fields of the undefined ones.
   *
   * @access public
   * @memberof CardReaderView
   *
   * @param {CardInformation} cardDetails
   */
  const autoFillForm = function (cardDetails) {
    document.getElementById("firstName").value = cardDetails.firstName;

    if (cardDetails.middleName == undefined) {
      const middleNameField = document.getElementById("middleName");
      middleNameField.disabled = true;
      middleNameField.value = "Not Required";
    } else {
      document.getElementById("middleName").value = cardDetails.middleName;
    }

    document.getElementById("lastName").value = cardDetails.lastName;
    document.getElementById("accountNumber").value = cardDetails.accountNumber;
    document.getElementById("expirationDate").value =
      cardDetails.expirationDate;

    if (cardDetails.countryCode == undefined) {
      const countryCodeField = document.getElementById("countryCode");
      countryCodeField.disabled = true;
      countryCodeField.value = "Not Required";
    } else {
      document.getElementById("countryCode").value = cardDetails.countryCode;
    }
  };

  /**
   * Renders the card reader page, and rehighlights the peripheral selected.
   *
   * @access public
   */
  const renderCardReader = function () {
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
  };

  return {
    renderCardReader,
    autoFillForm,
  };
})();
