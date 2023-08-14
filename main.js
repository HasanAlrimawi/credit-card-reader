function readCard() {
    tracksRetriever().then((data) => {
        const string = new CardReaderString(data);
        try {
            const cardDetails = string.extractCardDetails();
            drawCards(cardDetails);
        }
        catch (err) {
            console.log(err);
        }

    })
}

function drawCards(data) {
    document.getElementById("firstName").value = data.firstName;

    if (data.middleName == undefined) {
        const middleNameField = document.getElementById("middleName")
        middleNameField.disabled = true;
        middleNameField.value = "Not Required";
    }
    else {
        document.getElementById("middleName").value = data.middleName;
    }

    document.getElementById("lastName").value = data.lastName;
    document.getElementById("accountNumber").value = data.accountNumber;
    document.getElementById("expirationDate").value = data.expirationDate;

    if (data.countryCode == undefined) {
        const countryCodeField = document.getElementById("countryCode")
        countryCodeField.disabled = true;
        countryCodeField.value = "Not Required";
    }
    else {
        document.getElementById("countryCode").value = data.countryCode;
    }
}