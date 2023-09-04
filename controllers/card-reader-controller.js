import { cardDetails } from "../models/card-reader-model.js";
import { cardReaderView } from "../views/card-reader-view.js";
import { cardDetailsService } from "../services/card-reader-extractor.js";
import { observer } from "../communicators/observer.js";
import { CardDetailsException } from "../exceptions/card-details-exception.js";

export const cardReaderController = (function () {
  /** @private {number} */
  let subscriberId_ = undefined;

  /**
   * Subscribes to the observer using the topic specified within.
   *
   * @see updateCardReaderViewAndModel_, observer.subscibe
   *
   * @access public
   */
  const makeSubscription_ = function () {
    subscriberId_ = observer.subscribe(
      "MAGNETIC_CARD_READ",
      (magneticStripeRead) => {
        updateCardReaderViewAndModel_(magneticStripeRead);
      }
    );
  };

  /**
   * Makes important changes to the card reader UI before destruction.
   *
   * Unsubscribes from the observer.
   *
   * @see observer.unsubscribe
   *
   * @access public
   */
  const finalizeWork = function () {
    observer.unsubscribe("MAGNETIC_CARD_READ", subscriberId_);
  };

  /**
   * Updates the card details model with the newly extracted read data off
   *     the card after, and updates the view.
   *
   * @access private
   *
   * @see cardDetailsService.extractCardDetails
   *
   * @param {string} magneticStripeRead represents the string that is read from
   *     the credit card magnetic stripe's tracks
   */
  const updateCardReaderViewAndModel_ = function (magneticStripeRead) {
    try {
      cardDetails.setCardDetails(
        cardDetailsService.extractCardDetails(magneticStripeRead)
      );
      cardReaderView.autoFillForm(cardDetails.getCardDetails());
    } catch (err) {
      if (err instanceof CardDetailsException) {
        console.log(err.message);
      } else {
        console.log("Unknown error occured");
      }
    }
  };

  /**
   * Renders the card reader page, highlights the peripheral
   *     selected, and makes subscription.
   *
   * @access public
   *
   * @see makeSubscription_
   */
  const renderCardReaderView = function () {
    cardReaderView.renderCardReader();
    makeSubscription_();
  };

  return {
    finalizeWork,
    renderCardReaderView,
  };
})();
