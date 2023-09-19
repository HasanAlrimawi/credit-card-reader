import { generateCoordinates } from "../communicators/communicator.js";
import { observer } from "../communicators/observer.js";
import { BUTTON_STYLING } from "../constants/button-styling-constants.js";
import { DEVICES_TITLE_ID } from "../constants/device-title-id.js";
import { OBSERVER_TOPICS } from "../constants/observer-topics.js";
import { eSignatureView } from "../views/e-signature-view.js";

/**
 * @fileoverview Exposes functions to handle the device when view rendered and
 * destroyed,it also uses the communicator to make interaction with the device
 * and uses the observer pattern to listen to any data sent by the device.
 */
export const eSignatureController = (function () {
  /** @private {number} */
  let subscriberId_ = undefined;
  /** @type {string} represents the title that represents the device */
  const myTitle = DEVICES_TITLE_ID.ESIGNATURE.TITLE;
  /** @type {string} represents the id that represents the device's title
   *     the peripherals tag component
   */
  const myId = DEVICES_TITLE_ID.ESIGNATURE.PERIPHERAL_ID;
  /** {?object<string>}  represents the button styling specified */
  let usedStyling_ = undefined;

  // To watch any changes occuring to the theme.
  observer.subscribe(OBSERVER_TOPICS.THEME_CHANGED, () => {
    usedStyling_ = BUTTON_STYLING.CURRENT;
  });

  observer.subscribe(OBSERVER_TOPICS.BUTTONS_COLOR_CHANGED, () => {
    usedStyling_ = BUTTON_STYLING.CURRENT;
  });

  /**
   * Makes important changes to the e-signature UI before destruction.
   *
   * Unsubscribes from the observer.
   *
   * @see observer.unsubscribe
   */
  const finalizeWork = function () {
    observer.unsubscribe(OBSERVER_TOPICS.ESIGNATURE_IMAGE_TOPIC, subscriberId_);
    observer.unsubscribe(
      OBSERVER_TOPICS.ESIGNATURE_COORDINATES_TOPIC,
      subscriberId_
    );
  };

  /**
   * Updates the e-Signature view.
   *
   * @param {string} type Represents the type of the e-signature used
   * @param {string} data Represents the string read from the co-ordinates
   *     e-signature device or some kind of data related to
   *     image based e-signature.
   */
  const updateEsignatureView_ = function (type, data) {
    if (type === "imageBased") {
    } else if (type === "coordinatesBased") {
      document.getElementById("signatureCoordinates").value = data;
    }
  };

  /**
   * Renders the e-signature page, highlights the peripheral
   *     selected, and emits event listeners where needed.
   *
   * @see renderImageBased_, renderCoordinatesBased_
   * @param {string} referenceElementId Represents the element id who will be
   *     used as a reference to insert the HTML code
   * @param {string} insertionPosition Defines the location where the HTML code
   *     will be inserted to the reference element's perspective
   */
  const renderView = function (referenceElementId, insertionPosition) {
    document
      .getElementById(referenceElementId)
      .insertAdjacentHTML(insertionPosition, eSignatureView.esignatureHtml);

    document.getElementById("image-based").addEventListener("click", () => {
      renderImageBased_(referenceElementId, insertionPosition);
    });
    document
      .getElementById("coordinates-based")
      .addEventListener("click", () => {
        renderCoordinatesBased_(referenceElementId, insertionPosition);
      });
  };

  /**
   * Renders the e-signature image based view after clearing the meant
   *     space of the viewport, and subscribing/unsubscribing from
   *     not needed topics.
   *
   * @see clearSelection_, observer.subscribe,
   *     eSignatureView.renderEsignatureImageType, observer.unsubscribe
   * 
   * @param {string} referenceElementId Represents the element's id where the
   *     device HTML will be rendered in reference to
   * @param {string} insertionPosition Reperesents the position where to insert
   *     device's HTML in reference to the element specified
   */
  const renderImageBased_ = function (referenceElementId, insertionPosition) {
    clearSelection_();
    observer.unsubscribe(
      OBSERVER_TOPICS.ESIGNATURE_COORDINATES_TOPIC,
      subscriberId_
    );
    document
      .getElementById(referenceElementId)
      .insertAdjacentHTML(
        insertionPosition,
        eSignatureView.esignatureImageTypeHtml
      );
    subscriberId_ = observer.subscribe(
      OBSERVER_TOPICS.ESIGNATURE_IMAGE_TOPIC,
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
   *
   * @param {string} referenceElementId Represents the element's id where the
   *     device HTML will be rendered in reference to
   * @param {string} insertionPosition Reperesents the position where to insert
   *     device's HTML in reference to the element specified
   */
  const renderCoordinatesBased_ = function (
    referenceElementId,
    insertionPosition
  ) {
    clearSelection_();
    observer.unsubscribe(OBSERVER_TOPICS.ESIGNATURE_IMAGE_TOPIC, subscriberId_);
    document
      .getElementById(referenceElementId)
      .insertAdjacentHTML(
        insertionPosition,
        eSignatureView.esignatureCoordinatesTypeHtml(usedStyling_)
      );
    document.getElementById("copy-button").addEventListener("click", copy_);
    subscriberId_ = observer.subscribe(
      OBSERVER_TOPICS.ESIGNATURE_COORDINATES_TOPIC,
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
