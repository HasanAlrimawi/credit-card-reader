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
