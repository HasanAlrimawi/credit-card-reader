import { tracksRetriever } from "/communication/communicator.js";
import { extractCardDetails } from "/services/CardReaderExtractor.js";

function readCard() {
  tracksRetriever().then((readStripe) => {
    try {
      const cardDetails = extractCardDetails(readStripe);
      autoFillForm(cardDetails);
    } catch (err) {
      console.log(err);
    }
  });
}

function autoFillForm(cardDetails) {
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
  document.getElementById("expirationDate").value = cardDetails.expirationDate;

  if (cardDetails.countryCode == undefined) {
    const countryCodeField = document.getElementById("countryCode");
    countryCodeField.disabled = true;
    countryCodeField.value = "Not Required";
  } else {
    document.getElementById("countryCode").value = cardDetails.countryCode;
  }
}

function showPeripheralSelected() {
  const selectedPeripheral = document.getElementById("cardReader");
  selectedPeripheral.style.color = "#ff9800";
  selectedPeripheral.style.boxShadow = "0 0 4px rgba(0, 0, 0, 0.1)";
}

document.addEventListener("DOMContentLoaded", () => {
  showPeripheralSelected();
});
document.getElementById("readButton").addEventListener("click", () => {
  readCard();
});
