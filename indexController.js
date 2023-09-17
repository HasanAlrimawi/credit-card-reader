import { observer } from "./communicators/observer.js";
import { BUTTON_STYLING } from "./constants/button-styling-constants.js";
import { ELEMENT_INSERTION_POSITION } from "./constants/element-insertion-positions.js";
import { OBSERVER_TOPICS } from "./constants/observer-topics.js";
import { barcodeScannerController } from "./controllers/barcode-scanner-controller.js";
import { cardReaderController } from "./controllers/card-reader-controller.js";
import { eSignatureController } from "./controllers/e-signature-controller.js";
import { indexView } from "./indexView.js";
import { peripheralsTagControl } from "./ui-components/peripherals.js";

/**
 * @fileoverview Provides functionality to control how and when to render
 * any of the devices' views.
 */

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("toggle-theme-button")
    .addEventListener("click", toggler.changeTheme);

  document.getElementById("barcode-scanner").addEventListener("click", () => {
    showDevice(barcodeScannerController);
    eSignatureController.finalizeWork();
    cardReaderController.finalizeWork();
  });

  document.getElementById("card-reader").addEventListener("click", () => {
    showDevice(cardReaderController);
    eSignatureController.finalizeWork();
    barcodeScannerController.finalizeWork();
  });

  document.getElementById("e-signature").addEventListener("click", () => {
    showDevice(eSignatureController);
    cardReaderController.finalizeWork();
    barcodeScannerController.finalizeWork();
  });

  renderColorPickers();
});

/**
 * Renders the selected device's UI on the screen after clearing the preceding
 *     device's UI, then updates the title of the device shown and highlights
 *     its name in the list.
 *
 * @see indexView.clearPrecedingDevice, indexView.updateTitle,
 *     peripheralsTagControl.highlightPeripheralSelected
 *
 * @param {!object} deviceController Represents the selected device's controller.
 */
function showDevice(deviceController) {
  indexView.clearPrecedingDevice();
  deviceController.renderView(
    "container",
    ELEMENT_INSERTION_POSITION.BEFORE_END
  );
  indexView.updateTitle(deviceController.myTitle);
  peripheralsTagControl.highlightPeripheralSelected(deviceController.myId);
}

/**
 * Calls the function needed to append the color pickers after defining
 *     the color pickers needed accompanied with their event listeners.
 */
const renderColorPickers = function () {
  const colorPickers = [
    {
      title: "Background color:",
      id: "background-color-picker",
      changeEventHandler: () => {
        updateBackgroundColor("background-color-picker");
      },
    },
    {
      title: "Buttons color:",
      id: "buttons-color-picker",
      changeEventHandler: () => {
        updateButtonsColor("buttons-color-picker");
      },
    },
    {
      title: "Peripherals control color:",
      id: "peripherals-control-color-picker",
      changeEventHandler: () => {
        updatePeripheralsControlColor("peripherals-control-color-picker");
      },
    },
  ];

  for (const picker of colorPickers) {
    addColorPicker(picker.title, picker.id);
    document
      .getElementById(picker.id)
      .addEventListener("change", picker.changeEventHandler);
  }
};

/**
 * Adds a color picker with its label to the dropdown list
 *     for selecting the preferred color.
 * @param {string} pickerTitle Represents the name of
 *     what will get colored upon selection
 * @param {string} pickerId Represents the id of the element that will be colored
 */
const addColorPicker = function (pickerTitle, pickerId) {
  const dropdownContentDiv = document.getElementById("dropdown-content-holder");
  const rowElementsHolderDiv = document.createElement("div");
  const pickerTitleLabel = document.createElement("label");
  const colorPickerInput = document.createElement("input");

  rowElementsHolderDiv.setAttribute("class", "dropdown-elements form-row");
  pickerTitleLabel.setAttribute("for", pickerId);
  pickerTitleLabel.textContent = pickerTitle;
  colorPickerInput.setAttribute("type", "color");
  colorPickerInput.setAttribute("name", pickerId);
  colorPickerInput.setAttribute("id", pickerId);

  rowElementsHolderDiv.appendChild(pickerTitleLabel);
  rowElementsHolderDiv.appendChild(colorPickerInput);
  dropdownContentDiv.appendChild(rowElementsHolderDiv);
};

/**
 * Will reset the color of the background as selected by the user.
 * @param {string} colorPickerId Represents the id of the element that
 *     will be colored
 */
const updateBackgroundColor = function (colorPickerId) {
  const selectedColor = document.getElementById(colorPickerId).value;
  const root = document.querySelector(":root");
  root.style.setProperty("--main-color", selectedColor);
};

/**
 * Will reset the color of the background as selected by the user.
 * @param {string} colorPickerId Represents the id of the element that
 *     will be colored
 */
const updateButtonsColor = function (colorPickerId) {
  const selectedColor = document.getElementById(colorPickerId).value;
  observer.publish(OBSERVER_TOPICS.BUTTONS_COLOR_CHANGED, "");
  BUTTON_STYLING.CURRENT.BACKGROUND_COLOR = selectedColor;
  const buttons = document.getElementsByTagName("custom-button");
  for (const button of buttons) {
    button.setAttribute("background-color", selectedColor);
  }
};

/**
 * Will reset the color of the background as selected by the user.
 * @param {string} colorPickerId Represents the id of the element that
 *     will be colored
 */
const updatePeripheralsControlColor = function (colorPickerId) {
  const selectedColor = document.getElementById(colorPickerId).value;
  const root = document.querySelector(":root");
  root.style.setProperty("--white-to-black", selectedColor);
};

/**
 * Wraps the state of the toggle to represent if the dark theme is selected
 *     or not, in order to allow the operation of toggling.
 */
const toggler = (function () {
  /** @private {boolean} */
  let toggleState_ = false;

  /**
   * toggles the theme selected, by changing a document attribute.
   */
  const changeTheme = function () {
    toggleState_ = !toggleState_;
    const buttons = document.getElementsByTagName("custom-button");

    if (toggleState_) {
      document.documentElement.setAttribute("page-theme", "dark");
      BUTTON_STYLING.setCurrentToDark();
      observer.publish(OBSERVER_TOPICS.THEME_CHANGED, "");
      for (const button of buttons) {
        button.setAttribute("background-color", "#da0b0b");
        button.setAttribute("hover-background-color", "#8b0000");
      }
    } else {
      document.documentElement.setAttribute("page-theme", "light");
      BUTTON_STYLING.setCurrentToLight();
      observer.publish(OBSERVER_TOPICS.THEME_CHANGED, "");
      for (const button of buttons) {
        button.setAttribute("background-color", "#007bff");
        button.setAttribute("hover-background-color", "#0056b3");
      }
    }
  };

  return {
    changeTheme,
  };
})();
