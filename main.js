async function getTracks() {
    const data = await new Promise((resolve, reject) => {
        let tracks = [
            "%B1234 5678 9101 1223Alrimawi/Hasan^1226?",
            ";1234 5675 9101 1223=1226?"
        ]
        setTimeout(() => {
            resolve(tracks)
        }, 1000
        )
    })
    const firstTrackData = firstTrack(data[0]);
    const secondTrackData = secondTrack(data[1]);
    const tracksData = [firstTrackData, secondTrackData]
    checkCorrespondance(tracksData);
}

function firstTrack(data) {
    data = data.replace("%B", "");
    let number;
    let countryCode;
    const afterAccountNumber = data.search(/[a-z/A-Z]/);
    if (data[0] === '5' && data[1] === '9') {
        number = data.substring(0, afterAccountNumber - 3);
        countryCode = data.substring(number.length, afterAccountNumber);
    }
    else {
        number = data.substring(0, afterAccountNumber);
    }
    const surnameEnd = data.search('/');
    const surName = data.substring(afterAccountNumber, surnameEnd);
    const spcIndex = data.lastIndexOf(' ');
    let firstName, middleName, title;
    const caretIndex = data.lastIndexOf('^');
    if (spcIndex !== -1 && surnameEnd < spcIndex) {
        firstName = data.substring(surnameEnd + 1, spcIndex);
        const beforeTitle = data.lastIndexOf('.');
        middleName = data.substring(spcIndex + 1, beforeTitle);
        title = data.substring(beforeTitle + 1, caretIndex);
    }
    else {
        firstName = data.substring(surnameEnd + 1, caretIndex);
    }
    const expiryDate = data.substring((caretIndex + 1), (caretIndex + 5));
    console.log(`firstname: ${firstName} \nlastName: ${surName}\n Country Code: ${countryCode} \nnumber: ${number} \nExpiryDate: ${expiryDate} \nMiddle Name: ${middleName} \ntitle: ${title} `);
    return {
        "firstName": firstName,
        "lastName": surName,
        "middleName": middleName,
        "accountNumber": number,
        "expirationDate": expiryDate,
        "title": title,
        "countryCode": countryCode
    }
}


function secondTrack(data) {
    data = data.replace(";", "");
    let number, countryCode, expiryDate, optionalData;
    const afterAccountNumber = data.lastIndexOf('=');
    const questionIndex = data.lastIndexOf("?");
    if (data[0] === '5' && data[1] === '9') { //check if the country code is written -> get other attributes based on that
        countryCode = data.substring(afterAccountNumber + 1, afterAccountNumber + 4);
        expiryDate = data.substring(afterAccountNumber + 4, afterAccountNumber + 8);
        if (afterAccountNumber + 8 != questionIndex) {
            optionalData = data.substring(afterAccountNumber + 8, questionIndex);
        }
    }
    else {
        expiryDate = data.substring(afterAccountNumber + 1, afterAccountNumber + 5);
        if (afterAccountNumber + 5 !== questionIndex) {
            optionalData = data.substring(afterAccountNumber + 8, questionIndex);
        }
    }
    number = data.substring(0, afterAccountNumber);
    console.log(`Account number: ${number} \nCountry Code: ${countryCode} \nExpiry Date: ${expiryDate} \n optional data: ${optionalData}`);
    return {
        "accountNumber": number,
        "countryCode": countryCode,
        "expirationDate": expiryDate,
        "optionalData": optionalData
    }
}

function checkCorrespondance(data) {
    if (data[0].accountNumber === data[1].accountNumber &&
        data[0].expirationDate === data[1].expirationDate &&
        data[0].countryCode === data[1].countryCode) {
        drawCards(data);
    }
    else {
        console.log("Credit card or card reader is damaged");
    }
}

function drawCards(data) {
    document.getElementById("firstName").value = data[0].firstName;

    if (data[0].middleName == undefined) {
        const middleNameField = document.getElementById("middleName")
        middleNameField.disabled = true;
        middleNameField.value = "Not Required";
    }
    else {
        document.getElementById("middleName").value = data[0].middleName;
    }

    document.getElementById("lastName").value = data[0].lastName;
    document.getElementById("accountNumber").value = data[0].accountNumber;
    document.getElementById("expirationDate").value = data[0].expirationDate;

    if (data[0].countryCode == undefined) {
        const countryCodeField = document.getElementById("countryCode")
        countryCodeField.disabled = true;
        countryCodeField.value = "Not Required";
    }
    else {
        document.getElementById("countryCode").value = data[0].countryCode;
    }
}

