export const cardReaderView = (function () {
  /**
   * This fills the card information model data into the corresponding fields.
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
   * Highlights the selected peripheral page.
   * @access public
   * @memberof CardReaderView
   */
  const showPeripheralSelected = function () {
    const selectedPeripheral = document.getElementById("cardReader");
    selectedPeripheral.style.color = "#ff9800";
    selectedPeripheral.style.boxShadow = "0 0 4px rgba(0, 0, 0, 0.1)";
  };
  return {
    autoFillForm: autoFillForm,
    showPeripheralSelected: showPeripheralSelected,
  };
})();
