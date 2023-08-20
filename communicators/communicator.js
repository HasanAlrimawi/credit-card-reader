import { observer } from "./Observer.js";

setTimeout(() => {
  observer.publish(
    "MAGNETIC_CARD_READ",
    "%B1234 5678 9101 1223Alrimawi/Hasan^1226?;1234 5678 9101 1223=1226?"
  );
}, 1000);

export const tracksRetriever = function getTracks() {
  return new Promise((resolve, reject) => {
    let tracks =
      "%B1234 5678 9101 1223Alrimawi/Hasan^1226?;1234 5678 9101 1223=1226?";
    setTimeout(() => {
      resolve(tracks);
    }, 1000);
  });
};
//%B5934 5678 9101 1223564Alrimawi/Hasan Mohammed.works^1226hello?;5934 5678 9101 1223=5641226hello?
//%B1234 5678 9101 1223Alrimawi/Hasan^1226?;1234 5678 9101 1223=1226?
