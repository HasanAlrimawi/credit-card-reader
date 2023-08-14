async function getTracks() {
    const data = await new Promise((resolve, reject) => {
        let tracks = [
            "%B5934 5678 9101 1223594Alrimawi/Hasan Mohammed.title^1226?",
            ";5934 56789101 1223=5941226optional?"
        ]
        setTimeout(() => {
            resolve(tracks)
        }, 1000
        )
    })
    const firstTrackData = firstTrack(data);
    const secondTrackData = secondTrack(data);
    const tracksData = [firstTrackData, secondTrackData]
    checkCorrespondance(tracksData);
}

function firstTrack(data) {
    data[0] = data[0].replace("%B", "");
    let number;
    let countryCode;
    const afterAccountNumber = data[0].search(/[a-z/A-Z]/);
    if (data[0][0] === '5' && data[0][1] === '9') {
        number = data[0].substring(0, afterAccountNumber - 3);
        countryCode = data[0].substring(number.length, afterAccountNumber);
    }
    else {
        number = data[0].substring(0, afterAccountNumber);
    }
    const surnameEnd = data[0].search('/');
    const surName = data[0].substring(afterAccountNumber, surnameEnd);
    const spcIndex = data[0].lastIndexOf(' ');
    let firstName, middleName, title;
    const caretIndex = data[0].lastIndexOf('^');
    if (spcIndex !== -1 && surnameEnd < spcIndex) {
        firstName = data[0].substring(surnameEnd + 1, spcIndex);
        const beforeTitle = data[0].lastIndexOf('.');
        middleName = data[0].substring(spcIndex + 1, beforeTitle);
        title = data[0].substring(beforeTitle + 1, caretIndex);
    }
    else {
        firstName = data[0].substring(surnameEnd + 1, caretIndex);
    }
    const expiryDate = data[0].substring((caretIndex + 1), (caretIndex + 5));
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
    data[1] = data[1].replace(";", "");
    let number, countryCode, expiryDate, optionalData;
    const afterAccountNumber = data[1].lastIndexOf('=');
    const questionIndex = data[1].lastIndexOf("?");
    if (data[1][0] === '5' && data[1][1] === '9') { //check if the country code is written -> get other attributes based on that
        countryCode = data[1].substring(afterAccountNumber + 1, afterAccountNumber + 4);
        expiryDate = data[1].substring(afterAccountNumber + 4, afterAccountNumber + 8);
        if (afterAccountNumber + 8 != questionIndex) {
            optionalData = data[1].substring(afterAccountNumber + 8, questionIndex);
        }
    }
    else {
        expiryDate = data[1].substring(afterAccountNumber + 1, afterAccountNumber + 5);
        if (afterAccountNumber + 5 !== questionIndex) {
            optionalData = data[1].substring(afterAccountNumber + 8, questionIndex);
        }
    }
    number = data[1].substring(0, afterAccountNumber);
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
        
    }
    else {
        console.log("Credit card or card reader is damaged");
    }
    drawCards(data);
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

