class CardDetails {
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

class CardReaderString {
    constructor(tracks) {
        this.tracks = tracks
    }
    extractCardDetails() {
        let arr = this.tracks.split(';');
        const trackOne = function firstTrack(data) {
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
            return new CardDetails(number, firstName, middleName, surName, countryCode, expiryDate, title, undefined)
        }
        let trackOneData = trackOne(arr[0]);

        const trackTwo = function secondTrack(data) {
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
        const trackTwoData = trackTwo(arr[1]);
        if (this.checkCorrespondance(trackOneData, trackTwoData)) {
            trackOneData.optionalData = trackTwoData.optionalData;
        }
        else {
            throw "Credit card or card reader is damaged";
        }
        return trackOneData;

    }

    checkCorrespondance(trackOneData, trackTwoData) {
        if (trackOneData.accountNumber === trackTwoData.accountNumber &&
            trackOneData.expirationDate === trackTwoData.expirationDate &&
            trackOneData.countryCode === trackTwoData.countryCode) {
            return true;
        }
        else {
            return false
        }
    }
}