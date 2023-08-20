export const card = (function () {
  // private members
  let cardDetails;

  function getCardInformation() {
    return cardDetails;
  }

  function setCardInformation(newCardDetails) {
    cardDetails = newCardDetails;
  }

  // public members
  return {
    setCardInformation: setCardInformation,
    getCardInformation: getCardInformation,
  };
})();
