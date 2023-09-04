import { observer } from "./observer.js";

setTimeout(() => {
  observer.publish(
    "MAGNETIC_CARD_READ",
    "%B5934 5678 9101 1223564Alrimawi/Hasan Mohammed.works^1226hello?;5934 5678 9101 1223=5641226hello?"
  );
  console.log("I PUBLISHED");
}, 1000);

export const publishProductBarcodes = setTimeout(() => {
  setInterval(() => {
    let sample = (Math.random() + 1).toString(36).substring(7);
    observer.publish("BARCODE_NEW_PRODUCT_SCANNED", sample);
    console.log(sample);
  }, 2000);
}, 2000);

/**
 * Simulates card reader device returned data, and returns data within a promise.
 *
 * @returns {Promise}
 */
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
