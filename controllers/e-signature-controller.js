import { generateCoordinates } from "../communicators/communicator.js";
import { observer } from "../communicators/observer.js";
import { devicesTitleId } from "../constants/device-title-id.js";
import { observerTopics } from "../constants/observer-topics.js";
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
  const myTitle = devicesTitleId.eSignature.title;
  const myId = devicesTitleId.eSignature.peripheralId;
  /**
   * Makes important changes to the e-signature UI before destruction.
   *
   * Unsubscribes from the observer.
   *
   * @see observer.unsubscribe
   */
  const finalizeWork = function () {
    observer.unsubscribe(observerTopics.ESIGNATURE_IMAGE_TOPIC, subscriberId_);
    observer.unsubscribe(
      observerTopics.ESIGNATURE_COORDINATES_TOPIC,
      subscriberId_
    );
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
   *     selected, and omits event listeners where needed.
   *
   * @see renderImageBased_, renderCoordinatesBased_
   * @param {string} referenceElementId Represents the element id who will be
   *     used as a reference to add the HTML code
   * @param {string} insertionPosition Defines the location where the HTML code
   *     will be added to the reference element's perspective
   */
  const renderView = function (referenceElementId, insertionPosition) {
    document
      .getElementById(referenceElementId)
      .insertAdjacentHTML(insertionPosition, eSignatureView.esignatureHtml);
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
   * @see clearSelection_, observer.subscribe,
   *     eSignatureView.renderEsignatureImageType, observer.unsubscribe
   */
  const renderImageBased_ = function () {
    clearSelection_();
    observer.unsubscribe(
      observerTopics.ESIGNATURE_COORDINATES_TOPIC,
      subscriberId_
    );
    eSignatureView.renderEsignatureImageType();
    subscriberId_ = observer.subscribe(
      observerTopics.ESIGNATURE_IMAGE_TOPIC,
      (imageReceived) => {
        updateEsignatureView_("imageBased", imageReceived);
      }
    );
  };

  /**
   * Renders the e-signature coordinates based view after clearing the meant
   *     space of the viewport, and subscribing/unsubscribing from
   *     not needed topics.
   *
   * @see clearSelection_, observer.unsubscribe, generateCoordinates,
   *     eSignatureView.renderEsignatureCoordinatesType, observer.subscribe
   */
  const renderCoordinatesBased_ = function () {
    clearSelection_();
    observer.unsubscribe(observerTopics.ESIGNATURE_IMAGE_TOPIC, subscriberId_);
    eSignatureView.renderEsignatureCoordinatesType();

    document.getElementById("copy-button").addEventListener("click", copy_);

    subscriberId_ = observer.subscribe(
      observerTopics.ESIGNATURE_COORDINATES_TOPIC,
      (coordinatesReceived) => {
        updateEsignatureView_("coordinatesBased", coordinatesReceived);
      }
    );
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
    renderView,
    myTitle,
    myId,
  };
})();
