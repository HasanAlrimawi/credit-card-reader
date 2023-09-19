/**
 * @fileoverview Applies the revealing module pattern in order to organize
 * the access and modification of the cardDetails model.
 */
export const cardDetails = (function () {
  /** @private {CardInformation} */
  let cardDetails_;

  /**
   * Returns the private attribute value that holds the card information data.
   *
   * @returns { !CardInformation } The object containing details of the card.
   */
  function getCardDetails() {
    return cardDetails_;
  }

  /**
   * Updates the attributes of the card details saved.
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
