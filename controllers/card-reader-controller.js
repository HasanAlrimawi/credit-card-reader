import { cardDetails } from "../models/card-reader-model.js";
import { cardReaderView } from "../views/card-reader-view.js";
import { cardDetailsService } from "../services/card-reader-extractor.js";
import { observer } from "../communicators/observer.js";

export const cardReaderController = (function () {
  let subscriberId = undefined;

  /**
   * Subscribes to the observer using the topic specified within.
   *
   * @see _updateCardReaderViewAndModel, observer.subscibe
   *
   * @access public
   */
  const makeSubscription = function () {
    subscriberId = observer.subscribe(
      "MAGNETIC_CARD_READ",
      (magneticStripeRead) => {
        _updateCardReaderViewAndModel(magneticStripeRead);
      }
    );
  };

  /**
   * Should be called before hiding the Barcode UI, to make important changes before destruction.
   *
   * Unsubscribes from the observer.
   *
   * @see observer.unsubscribe
   *
   * @access public
   */
  const finalizeWork = function () {
    observer.unsubscribe("MAGNETIC_CARD_READ", subscriberId);
  };

  /**
   * Updates the card details model with the newly extracted read data off the card after, and updates the view.
   *
   * @access private
   *
   * @see cardDetailsService.extractCardDetails
   *
   * @param {String} magneticStripeRead represents the string that is read from the credit card magnetic stripe's tracks
   */
  const _updateCardReaderViewAndModel = function (magneticStripeRead) {
    try {
      cardDetails.setCardDetails(
        cardDetailsService.extractCardDetails(magneticStripeRead)
      );
      cardReaderView.autoFillForm(cardDetails.getCardDetails());
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Renders the card reader page and rehighlights the peripheral selected.
   *
   * @access public
   *
   */
  const renderCardReaderView = function () {
    cardReaderView.renderCardReader();
  };

  return {
    makeSubscription: makeSubscription,
    finalizeWork: finalizeWork,
    renderCardReaderView: renderCardReaderView,
  };
})();
