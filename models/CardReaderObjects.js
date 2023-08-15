class FirstTrackData {
    constructor(accountNumber, firstName, middleName, lastName, countryCode, expirationDate, title, optionalData) {
        this.accountNumber = accountNumber;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.countryCode = countryCode;
        this.expirationDate = expirationDate;
        this.title = title;
        this.optionalData = optionalData;
    }
}

class SecondTrackData {
    constructor(accountNumber, countryCode, expirationDate, optionalData) {
        this.accountNumber = accountNumber;
        this.countryCode = countryCode;
        this.expirationDate = expirationDate;
        this.optionalData = optionalData;
    }
}

class CardReaderReadStripe {
    constructor(tracks) {
        this.tracks = tracks
    }
}