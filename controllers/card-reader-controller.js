import { cardDetails } from "../models/card-reader-model.js";
import { cardReaderView } from "../views/card-reader-view.js";
import { cardDetailsService } from "../services/card-reader-extractor.js";

export const cardReaderController = (function () {
  /**
   * Updates the card details model with the newly extracted read data off the card after, and updates the view.
   *
   * @access public
   *
   * @see cardDetailsService.extractCardDetails
   *
   * @param {String} magneticStripeRead represents the string that is read from the credit card magnetic stripe's tracks
   */
  const updateCardReaderViewAndModel = function (magneticStripeRead) {
    try {
      cardDetails.setCardDetails(
        cardDetailsService.extractCardDetails(magneticStripeRead)
      );
      cardReaderView.autoFillForm(cardDetails.getCardDetails());
    } catch (err) {
      console.log(err);
    }
  };
  return {
    updateCardReaderViewAndModel: updateCardReaderViewAndModel,
  };
})();
