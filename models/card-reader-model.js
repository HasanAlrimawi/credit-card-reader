/**
 * This applies the revealing module pattern in order to organize
 * the access and modification of the model.
 *
 * @returns {function} setCardDetails
 * @returns {function} getCardDetails
 */
export const cardDetails = (function () {
  // private members
  let _card;

  function getCardDetails() {
    return _card;
  }

  function setCardDetails(newCardDetails) {
    _card = newCardDetails;
  }

  // public members
  return {
    setCardDetails: setCardDetails,
    getCardDetails: getCardDetails,
  };
})();
