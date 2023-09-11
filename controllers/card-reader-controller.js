import { cardDetails } from "../models/card-reader-model.js";
import { cardReaderView } from "../views/card-reader-view.js";
import { cardDetailsService } from "../services/card-reader-extractor.js";
import { observer } from "../communicators/observer.js";
import { CardDetailsException } from "../exceptions/card-details-exception.js";
import { OBSERVER_TOPICS } from "../constants/observer-topics.js";
import { DEVICES_TITLE_ID } from "../constants/device-title-id.js";

/**
 * @fileoverview Connects both the view and the model of the card reader,
 * exposes function to handle the device when view rendered and destroyed,
 * it also uses the communicator to make interaction with the device
 * and uses the observer pattern to listen to any data sent by the device.
 *
 * @public
 */
export const cardReaderController = (function () {
  /** @private {number} */
  let subscriberId_ = undefined;
  /** @type {string} represents the title that represents the device */
  const myTitle = DEVICES_TITLE_ID.CARD_READER.TITLE;
  /** @type {string} represents the id that represents the device's title
   *     the peripherals tag component
   */
  const myId = DEVICES_TITLE_ID.CARD_READER.PERIPHERAL_ID;

  /**
   * Makes important changes to the card reader UI before destruction.
   *
   * Unsubscribes from the observer.
   *
   * @see observer.unsubscribe
   */
  const finalizeWork = function () {
    observer.unsubscribe(OBSERVER_TOPICS.CARD_READER_TOPIC, subscriberId_);
  };

  /**
   * Updates the card details model with the newly extracted read data off
   *     the card after, and updates the view.
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
   * @see makeSubscription_
   *
   * @param {string} referenceElementId Represents the element id who will be
   *     used as a reference to add the HTML code
   * @param {string} insertionPosition Defines the location where the HTML code
   *     will be added to the reference element's perspective
   */
  const renderView = function (referenceElementId, insertionPosition) {
    document
      .getElementById(referenceElementId)
      .insertAdjacentHTML(insertionPosition, cardReaderView.cardReaderHtml);

    subscriberId_ = observer.subscribe(
      OBSERVER_TOPICS.CARD_READER_TOPIC,
      (magneticStripeRead) => {
        updateCardReaderViewAndModel_(magneticStripeRead);
      }
    );
  };

  return {
    finalizeWork,
    renderView,
    myTitle,
    myId,
  };
})();
