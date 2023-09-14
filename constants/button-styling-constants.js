export const BUTTON_STYLING = (function () {
  const DARK = Object.freeze({
    BACKGROUND_COLOR: "#da0b0b",
    HOVER_BACKGROUND_COLOR: "#8b0000",
    FONT_COLOR: "#fff",
  });

  const LIGHT = Object.freeze({
    BACKGROUND_COLOR: "#007bff",
    HOVER_BACKGROUND_COLOR: "#0056b3",
    FONT_COLOR: "#fff",
  });

  const CURRENT = {
    BACKGROUND_COLOR: "#007bff",
    HOVER_BACKGROUND_COLOR: "#0056b3",
    FONT_COLOR: "#fff",
  };

  const setCurrentToLight = function () {
    for (const key in CURRENT) {
      CURRENT[key] = LIGHT[key];
    }
  };

  const setCurrentToDark = function () {
    for (const key in CURRENT) {
      CURRENT[key] = DARK[key];
    }
  };

  return {
    DARK,
    LIGHT,
    CURRENT,
    setCurrentToDark,
    setCurrentToLight,
  };
})();
// export const BUTTON_STYLING = Object.freeze({
//   DARK: Object.freeze({
//     BACKGROUND_COLOR: "#da0b0b",
//     HOVER_BACKGROUND_COLOR: "#8b0000",
//     FONT_COLOR: "#fff",
//   }),
//   LIGHT: Object.freeze({
//     BACKGROUND_COLOR: "#007bff",
//     HOVER_BACKGROUND_COLOR: "#0056b3",
//     FONT_COLOR: "#fff",
//   }),
//   CURRENT: {
//     BACKGROUND_COLOR: "#007bff",
//     HOVER_BACKGROUND_COLOR: "#0056b3",
//     FONT_COLOR: "#fff",
//   },
// });
