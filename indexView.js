export const indexView = (function () {
  /**
   * Updates the title of the page to represent what peripheral is selected.
   *
   * @public
   * 
   * @param {String} newTitle the name of the device's opened UI
   */
  function updateTitle(newTitle) {
    document.getElementById("openedDevice").innerText = newTitle;
  }

  /**
   * Removes the UI of the device that has been opened in order to permit rendering the just selected device.
   * 
   * @public
   */
  function clearPrecedingDevice() {
    const container = document.getElementById("container");
    let childsCount = container.childElementCount;
    while (childsCount > 1) {
      container.removeChild(container.children[1]);
      childsCount = container.childElementCount;
    }
  }

  return {
    updateTitle: updateTitle,
    clearPrecedingDevice: clearPrecedingDevice,
  };
})();
