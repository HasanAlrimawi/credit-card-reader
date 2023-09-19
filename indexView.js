/**
 * @fileoverview Provides functionality to update the main view, whether
 * updating the title or deleting components.
 */
export const indexView = (function () {
  /**
   * Updates the title of the page to represent what peripheral is selected.
   *
   * @param {string} newTitle the name of the device's opened UI
   */
  function updateTitle(newTitle) {
    document.getElementById("opened-device").innerText = newTitle;
  }

  /**
   * Removes the UI of the device that has been opened in order to permit
   *     rendering the just selected device.
   */
  function clearPrecedingDevice() {
    const container = document.getElementById("container");
    let childsCount = container.childElementCount;
    while (childsCount > 1) {
      container.removeChild(container.children[1]);
      childsCount = container.childElementCount;
    }
  }

  /**
   * Adds a color picker with its label to the dropdown list
   *     for selecting the preferred color.
   * @param {string} pickerTitle Represents the name of
   *     what will get colored upon selection
   * @param {string} pickerId Represents the id of the element that will be colored
   */
  const addColorPicker = function (pickerTitle, pickerId) {
    const dropdownContentDiv = document.getElementById(
      "dropdown-content-holder"
    );
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

  return {
    updateTitle,
    clearPrecedingDevice,
    addColorPicker,
  };
})();
