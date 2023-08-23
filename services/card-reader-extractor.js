import { CardInformation } from "../models/card-information.js";

export const cardDetailsService = (function () {
  /**
   * This receives the read string off the card reader, then extracts and returns the information contained in it.
   *
   * It extracts the data from the two tracks one by one, then makes sure that the shared data across the tracks
   * are the same in order to return the card information or throw exception to indicate some problem
   * with the card reader or the card itself
   *
   * @access public
   *
   * @see _extractFirstTrackData, _extractSecondTrackData, _checkCorrespondance
   *
   * @param {String} readStripe The string read from the card magnetic stripe's tracks.
   * @returns {CardInformation} The object containing the final card information extracted from the card's tracks.
   */
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

  /**
   * This checks if the shared data across the magnetic stripe's two tracks are the same.
   *
   * @access private
   * @param {Object} trackOneData
   * @param {Object trackTwoData
   * @returns {boolean}   Indicates whether the two tracks' shared data are the same.
   */
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

  /**
   * This extracts the plastic money cards' data contained within the string passed to it.
   *
   * It uses the fixed structure of data contained within the magnetic stripe's first track,
   * to extract the data (first name, middle name, last name, expiry date, account number,
   * country code, optional data) and returns it wrapped up within the object firstTrackData.
   *
   * @access private
   * @param {Object} firstTrack   Contains the read first track string of the magnetic stripe on the plastic money cards.
   * @returns {Object} firstTrackData   Contains the data extracted from the first track of the magnetic stripe.
   */
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

    // To check if the first two digits of the account number are 59, which means
    // that the country code exists whithin the track's data
    const countryCodeExists = firstDigitsPairAccountNumber === "59";

    if (countryCodeExists) {
      /** @memberof! firstTrackData */
      firstTrackData.accountNumber = firstTrack.substring(
        0,
        postAccountNumberIndex - 3
      );
      /** @memberof! firstTrackData */
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

    /** @memberof! firstTrackData */
    firstTrackData.lastName = firstTrack.substring(
      postAccountNumberIndex,
      postLastNameIndex
    );

    if (spaceIndex !== -1 && postLastNameIndex < spaceIndex) {
      /** @memberof! firstTrackData */
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
        /** @memberof! firstTrackData */
        firstTrackData.middleName = firstTrack.substring(
          spaceIndex + 1,
          preTitleIndex
        );
        /** @memberof! firstTrackData */
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

    /** @memberof! firstTrackData */
    firstTrackData.expirationDate = firstTrack.substring(
      caretIndex + 1,
      postExpiryDateIndex
    );

    const optionalDataExists = postExpiryDateIndex < questionMarkIndex;

    if (optionalDataExists) {
      /** @memberof! firstTrackData */
      firstTrackData.optionalData = firstTrack.substring(
        postExpiryDateIndex,
        questionMarkIndex
      );
    }

    return firstTrackData;
  }

  /**
   * This extracts the plastic money cards' data contained within the string passed to it.
   *
   * It uses the fixed structure of data contained within the magnetic stripe's second track,
   * to extract the data (expiry date, account number, country code, optional data)
   * and returns it wrapped up within the object secondTrackData.
   *
   * @access private
   * @param {Object} secondTrack   Contains the read second track string of the magnetic stripe on the plastic money cards.
   * @returns {Object} secondTrackData   Contains the data extracted from the second track of the magnetic stripe.
   */
  function _extractSecondTrackData(secondTrack) {
    secondTrack = secondTrack.replace(";", "");
    let secondTrackData = {};
    const postAccountNumberIndex = secondTrack.lastIndexOf("=");
    const questionIndex = secondTrack.lastIndexOf("?");
    const firstDigitsPairAccountNumber = secondTrack[0] + secondTrack[1];
    const countryCodeExists = firstDigitsPairAccountNumber === "59";

    if (countryCodeExists) {
      /** @memberof! secondTrackData */
      secondTrackData.countryCode = secondTrack.substring(
        postAccountNumberIndex + 1,
        postAccountNumberIndex + 4
      );
      /** @memberof! secondTrackData */
      secondTrackData.expirationDate = secondTrack.substring(
        postAccountNumberIndex + 4,
        postAccountNumberIndex + 8
      );

      const optionalDataExists = postAccountNumberIndex + 8 != questionIndex;

      if (optionalDataExists) {
        /** @memberof! secondTrackData */
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

    /** @memberof! secondTrackData */
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
