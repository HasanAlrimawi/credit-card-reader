function readCard() {
    tracksRetriever().then((data) => {
        const readStripe = new CardReaderReadStripe(data);
        try {
            const cardDetails = extractCardDetails(readStripe);
            autoFillForm(cardDetails);
        }
        catch (err) {
            console.log(err);
        }

    })
}

function autoFillForm(cardDetails) {
    document.getElementById("firstName").value = cardDetails.firstName;

    if (cardDetails.middleName == undefined) {
        const middleNameField = document.getElementById("middleName")
        middleNameField.disabled = true;
        middleNameField.value = "Not Required";
    }
    else {
        document.getElementById("middleName").value = cardDetails.middleName;
    }

    document.getElementById("lastName").value = cardDetails.lastName;
    document.getElementById("accountNumber").value = cardDetails.accountNumber;
    document.getElementById("expirationDate").value = cardDetails.expirationDate;

    if (cardDetails.countryCode == undefined) {
        const countryCodeField = document.getElementById("countryCode")
        countryCodeField.disabled = true;
        countryCodeField.value = "Not Required";
    }
    else {
        document.getElementById("countryCode").value = cardDetails.countryCode;
    }
}