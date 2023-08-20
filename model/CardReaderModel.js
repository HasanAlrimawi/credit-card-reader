export const cardDetails = (function () {
  // private members
  let card;

  function getCardDetails() {
    return card;
  }

  function setCardDetails(newCardDetails) {
    card = newCardDetails;
  }

  // public members
  return {
    setCardDetails: setCardDetails,
    getCardDetails: getCardDetails,
  };
})();
