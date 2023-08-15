function extractCardDetails(readStripe) {
    let cardTracks = readStripe.tracks.split(';');
    let trackOneData = extractFirstTrackData(cardTracks[0]);
    const trackTwoData = extractSecondTrackData(cardTracks[1]);
    if (this.checkCorrespondance(trackOneData, trackTwoData)) {
        return trackOneData
    }
    else {
        throw "Credit card or card reader is damaged";
    }
}

function checkCorrespondance(trackOneData, trackTwoData) {
    if (trackOneData.accountNumber === trackTwoData.accountNumber &&
        trackOneData.expirationDate === trackTwoData.expirationDate &&
        trackOneData.countryCode === trackTwoData.countryCode &&
        trackOneData.optionalData === trackTwoData.optionalData) {
        return true;
    }
    else {
        return false;
    }
}

function extractFirstTrackData(firstTrack) {
    firstTrack = firstTrack.replace("%B", "");
    let accountNumber, countryCode, firstName, middleName, title, optionalData;
    const alphabeticPresence = /[a-z]/i
    const postAccountNumberIndex = firstTrack.search(alphabeticPresence);
    const postLastNameIndex = firstTrack.search('/');
    const spaceIndex = firstTrack.lastIndexOf(' ');
    const caretIndex = firstTrack.lastIndexOf('^');
    const postExpiryDateIndex = caretIndex + 5;
    const questionMarkIndex = firstTrack.lastIndexOf('?');

    const firstDigitsPairAccountNumber = firstTrack[0] + firstTrack[1];
    const countryCodeExists = firstDigitsPairAccountNumber === "59";
    if (countryCodeExists) {
        accountNumber = firstTrack.substring(0, postAccountNumberIndex - 3);
        countryCode = firstTrack.substring(accountNumber.length, postAccountNumberIndex);
    }
    else {
        accountNumber = firstTrack.substring(0, postAccountNumberIndex);
    }

    const lastName = firstTrack.substring(postAccountNumberIndex, postLastNameIndex);

    if (spaceIndex !== -1 && postLastNameIndex < spaceIndex) {
        firstName = firstTrack.substring(postLastNameIndex + 1, spaceIndex);
        const preTitleIndex = firstTrack.lastIndexOf('.');
        const titleExists = preTitleIndex != -1 && preTitleIndex > spaceIndex && preTitleIndex < caretIndex;
        if (titleExists) {
            middleName = firstTrack.substring(spaceIndex + 1, preTitleIndex);
            title = firstTrack.substring(preTitleIndex + 1, caretIndex);
        }
        else {
            middleName = firstTrack.substring(spaceIndex + 1, caretIndex);
        }

    }
    else {
        firstName = firstTrack.substring(postLastNameIndex + 1, caretIndex);
    }

    const expiryDate = firstTrack.substring((caretIndex + 1), (postExpiryDateIndex));

    const optionalDataExists = (postExpiryDateIndex) < questionMarkIndex;
    if (optionalDataExists) {
        optionalData = firstTrack.substring((postExpiryDateIndex), questionMarkIndex);
    }
    return new FirstTrackData(accountNumber, firstName, middleName, lastName, countryCode, expiryDate, title, optionalData);
}

function extractSecondTrackData(secondTrack) {
    secondTrack = secondTrack.replace(";", "");
    let accountNumber, countryCode, expiryDate, optionalData;
    const postAccountNumberIndex = secondTrack.lastIndexOf('=');
    const questionIndex = secondTrack.lastIndexOf("?");

    const firstDigitsPairAccountNumber = secondTrack[0] + secondTrack[1];
    const countryCodeExists = firstDigitsPairAccountNumber === "59";
    if (countryCodeExists) { //check if the country code is written -> get other attributes based on that
        countryCode = secondTrack.substring(postAccountNumberIndex + 1, postAccountNumberIndex + 4);
        expiryDate = secondTrack.substring(postAccountNumberIndex + 4, postAccountNumberIndex + 8);
        const optionalDataExists = postAccountNumberIndex + 8 != questionIndex
        if (optionalDataExists) {
            optionalData = secondTrack.substring(postAccountNumberIndex + 8, questionIndex);
        }
    }
    else {
        expiryDate = secondTrack.substring(postAccountNumberIndex + 1, postAccountNumberIndex + 5);
        const optionalDataExists = postAccountNumberIndex + 5 !== questionIndex
        if (optionalDataExists) {
            optionalData = secondTrack.substring(postAccountNumberIndex + 8, questionIndex);
        }
    }
    accountNumber = secondTrack.substring(0, postAccountNumberIndex);
    return new SecondTrackData(accountNumber, countryCode, expiryDate, optionalData);
}