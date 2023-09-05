/**
 * @fileoverview Applies the revealing module pattern in order to organize
 * the access and modification of the cardDetails model.
 */
export const cardDetails = (function () {
  /** @private {string} */
  let cardDetails_;

  /**
   * Returns the private attribute value that holds the card information data.
   *
   * @returns { !CardInformation } the object containing the private attribute
   *     representing card information.
   */
  function getCardDetails() {
    return cardDetails_;
  }

  /**
   * Manipulates the private attribute content that holds
   *     the card information data.
   *
   * @param {!CardInformation} newCardDetails
   */
  function setCardDetails(newCardDetails) {
    cardDetails_ = newCardDetails;
  }

  return {
    setCardDetails,
    getCardDetails,
  };
})();
