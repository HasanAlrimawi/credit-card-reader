import { generateCoordinates } from "../communicators/communicator.js";
import { observer } from "../communicators/observer.js";
import { eSignatureView } from "../views/e-signature-view.js";

/**
 * @fileoverview Exposes functions to handle the device when view rendered and
 * destroyed,it also uses the communicator to make interaction with the device
 * and uses the observer pattern to listen to any data sent by the device.
 *
 * @public
 */
export const eSignatureController = (function () {
  /** @private {number} */
  let subscriberId_ = undefined;

  /**
   * Subscribes to the observer using the topic specified within.
   *
   * @see updateEsignatureView_, observer.subscibe
   */
  const makeSubscription_ = function (type) {
    if (type === "imageBased") {
      subscriberId_ = observer.subscribe(
        "IMAGE_ESIGNATURE_RECEIVED",
        (imageReceived) => {
          updateEsignatureView_("imageBased", imageReceived);
        }
      );
    } else if (type === "coordinatesBased") {
      subscriberId_ = observer.subscribe(
        "COORDINATES_ESIGNATURE_RECEIVED",
        (coordinatesReceived) => {
          updateEsignatureView_("coordinatesBased", coordinatesReceived);
        }
      );
    }
  };

  /**
   * Makes important changes to the e-signature UI before destruction.
   *
   * Unsubscribes from the observer.
   *
   * @see observer.unsubscribe
   */
  const finalizeWork = function () {
    observer.unsubscribe("MAGNETIC_CARD_READ", subscriberId_);
    observer.unsubscribe("COORDINATES_ESIGNATURE_RECEIVED", subscriberId_);
  };

  /**
   * Updates the e-Signature view.
   *
   * @param {string} type Represents the type of the e-signature used
   * @param {string} eSignature Represents the string read from the e-signature
   *     device
   */
  const updateEsignatureView_ = function (type, eSignature) {
    if (type === "imageBased") {
    } else if (type === "coordinatesBased") {
      document.getElementById("signatureCoordinates").value = eSignature;
    }
  };

  /**
   * Renders the e-signature page, highlights the peripheral
   *     selected.
   *
   * @see makeSubscription_, renderImageBased_, renderCoordinatesBased_
   */
  const renderEsignatureView = function () {
    eSignatureView.renderEsignature();
    document
      .getElementById("image-based")
      .addEventListener("click", renderImageBased_);
    document
      .getElementById("coordinates-based")
      .addEventListener("click", renderCoordinatesBased_);
  };

  /**
   * Renders the e-signature image based view after clearing the meant
   *     space of the viewport, and subscribing/unsubscribing from
   *     not needed topics.
   *
   * @see clearSelection_, makeSubscription_, 
   *     eSignatureView.renderEsignatureImageType, observer.unsubscribe
   */
  const renderImageBased_ = function () {
    clearSelection_();
    observer.unsubscribe("COORDINATES_ESIGNATURE_RECEIVED", subscriberId_);
    eSignatureView.renderEsignatureImageType();
    makeSubscription_("imageBased");
  };

  /**
   * Renders the e-signature coordinates based view after clearing the meant
   *     space of the viewport, and subscribing/unsubscribing from
   *     not needed topics.
   *
   * @see clearSelection_, observer.unsubscribe, generateCoordinates
   *     eSignatureView.renderEsignatureCoordinatesType, makeSubscription_
   */
  const renderCoordinatesBased_ = function () {
    clearSelection_();
    observer.unsubscribe("IMAGE_ESIGNATURE_RECEIVED", subscriberId_);
    eSignatureView.renderEsignatureCoordinatesType();

    document.getElementById("copy-button").addEventListener("click", copy_);

    makeSubscription_("coordinatesBased");
    generateCoordinates();
  };

  /**
   * Copies the string written in the coordinates field to the clipboard.
   */
  const copy_ = () => {
    navigator.clipboard.writeText(
      document.getElementById("signatureCoordinates").value
    );
  };

  /**
   * Clears part of the viewport in order to make space for the selected
   *     e-signature type.
   */
  const clearSelection_ = function () {
    const container = document.getElementById("container");
    let childsCount = container.childElementCount;
    while (childsCount > 2) {
      container.removeChild(container.children[2]);
      childsCount = container.childElementCount;
    }
  };

  return {
    finalizeWork,
    renderEsignatureView,
  };
})();
