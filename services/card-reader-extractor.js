import { CardInformation } from "../objects-templates/card-information.js";

export const cardDetailsService = (function () {
  function extractCardDetails(readStripe) {
    const cardTracks = readStripe.split(";");
    const trackOneData = _extractFirstTrackData(cardTracks[0]);
    const trackTwoData = _extractSecondTrackData(cardTracks[1]);
    if (_checkCorrespondance(trackOneData, trackTwoData)) {
      return new CardInformation(
        trackOneData.accountNumber,
        trackOneData.firstName,
        trackOneData.middleName,
        trackOneData.lastName,
        trackOneData.countryCode,
        trackOneData.expirationDate,
        trackOneData.title,
        trackOneData.optionalData
      );
    } else {
      throw "Credit card or card reader is damaged";
    }
  }

  function _checkCorrespondance(trackOneData, trackTwoData) {
    if (
      trackOneData.accountNumber === trackTwoData.accountNumber &&
      trackOneData.expirationDate === trackTwoData.expirationDate &&
      trackOneData.countryCode === trackTwoData.countryCode &&
      trackOneData.optionalData === trackTwoData.optionalData
    ) {
      return true;
    } else {
      return false;
    }
  }

  function _extractFirstTrackData(firstTrack) {
    firstTrack = firstTrack.replace("%B", "");
    let firstTrackData = {};
    const alphabeticPresence = /[a-z]/i;
    const postAccountNumberIndex = firstTrack.search(alphabeticPresence);
    const postLastNameIndex = firstTrack.search("/");
    const spaceIndex = firstTrack.lastIndexOf(" ");
    const caretIndex = firstTrack.lastIndexOf("^");
    const postExpiryDateIndex = caretIndex + 5;
    const questionMarkIndex = firstTrack.lastIndexOf("?");
    const firstDigitsPairAccountNumber = firstTrack[0] + firstTrack[1];
    const countryCodeExists = firstDigitsPairAccountNumber === "59";

    if (countryCodeExists) {
      firstTrackData.accountNumber = firstTrack.substring(
        0,
        postAccountNumberIndex - 3
      );
      firstTrackData.countryCode = firstTrack.substring(
        firstTrackData.accountNumber.length,
        postAccountNumberIndex
      );
    } else {
      firstTrackData.accountNumber = firstTrack.substring(
        0,
        postAccountNumberIndex
      );
    }

    firstTrackData.lastName = firstTrack.substring(
      postAccountNumberIndex,
      postLastNameIndex
    );

    if (spaceIndex !== -1 && postLastNameIndex < spaceIndex) {
      firstTrackData.firstName = firstTrack.substring(
        postLastNameIndex + 1,
        spaceIndex
      );
      const preTitleIndex = firstTrack.lastIndexOf(".");
      const titleExists =
        preTitleIndex != -1 &&
        preTitleIndex > spaceIndex &&
        preTitleIndex < caretIndex;

      if (titleExists) {
        firstTrackData.middleName = firstTrack.substring(
          spaceIndex + 1,
          preTitleIndex
        );
        firstTrackData.title = firstTrack.substring(
          preTitleIndex + 1,
          caretIndex
        );
      } else {
        firstTrackData.middleName = firstTrack.substring(
          spaceIndex + 1,
          caretIndex
        );
      }
    } else {
      firstTrackData.firstName = firstTrack.substring(
        postLastNameIndex + 1,
        caretIndex
      );
    }

    firstTrackData.expirationDate = firstTrack.substring(
      caretIndex + 1,
      postExpiryDateIndex
    );

    const optionalDataExists = postExpiryDateIndex < questionMarkIndex;

    if (optionalDataExists) {
      firstTrackData.optionalData = firstTrack.substring(
        postExpiryDateIndex,
        questionMarkIndex
      );
    }

    return firstTrackData;
  }

  function _extractSecondTrackData(secondTrack) {
    secondTrack = secondTrack.replace(";", "");
    let secondTrackData = {};
    const postAccountNumberIndex = secondTrack.lastIndexOf("=");
    const questionIndex = secondTrack.lastIndexOf("?");
    const firstDigitsPairAccountNumber = secondTrack[0] + secondTrack[1];
    const countryCodeExists = firstDigitsPairAccountNumber === "59";

    if (countryCodeExists) {
      secondTrackData.countryCode = secondTrack.substring(
        postAccountNumberIndex + 1,
        postAccountNumberIndex + 4
      );
      secondTrackData.expirationDate = secondTrack.substring(
        postAccountNumberIndex + 4,
        postAccountNumberIndex + 8
      );

      const optionalDataExists = postAccountNumberIndex + 8 != questionIndex;

      if (optionalDataExists) {
        secondTrackData.optionalData = secondTrack.substring(
          postAccountNumberIndex + 8,
          questionIndex
        );
      }
    } else {
      secondTrackData.expirationDate = secondTrack.substring(
        postAccountNumberIndex + 1,
        postAccountNumberIndex + 5
      );

      const optionalDataExists = postAccountNumberIndex + 5 !== questionIndex;

      if (optionalDataExists) {
        secondTrackData.optionalData = secondTrack.substring(
          postAccountNumberIndex + 8,
          questionIndex
        );
      }
    }

    secondTrackData.accountNumber = secondTrack.substring(
      0,
      postAccountNumberIndex
    );

    return secondTrackData;
  }

  return {
    extractCardDetails: extractCardDetails,
  };
})();
