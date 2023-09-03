/**
 * This applies the revealing module pattern in order to organize
 * the access and modification of the model.
 *
 * @returns {function} setCardDetails
 * @returns {function} getCardDetails
 */
export const cardDetails = (function () {
  /** @private {string} */
  let _card;

  /**
   * Returns the private attribute value that holds the card information data.
   *
   * @returns { CardInformation } the object containing the private attribute representing card information.
   */
  function getCardDetails() {
    return _card;
  }

  /**
   * Manipulates the private attribute content that holds the card information data.
   *
   * @param {CardInformation} newCardDetails
   */
  function setCardDetails(newCardDetails) {
    _card = newCardDetails;
  }

  return {
    setCardDetails,
    getCardDetails,
  };
})();
