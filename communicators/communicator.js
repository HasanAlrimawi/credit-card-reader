import { observer } from "./observer.js";

/**
 * Makes a new string of numbers randomly of fixed length (12 characters)
 */
export const publishProductBarcodes = () => {
  const sample = (Math.random() + 1).toString().substring(2, 14);
  observer.publish("BARCODE_NEW_PRODUCT_SCANNED", sample);
};

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

/**
 * Publishes imaginary coordinates representing the user's signature, on
 *     the topic COORDINATES_ESIGNATURE_RECEIVED.
 */
export const generateCoordinates = function () {
  observer.publish(
    "COORDINATES_ESIGNATURE_RECEIVED",
    "Point 1: (X=120, Y=75)Point 2: (X=122, Y=76)Point 3: (X=124, Y=77)Point 4: (X=127, Y=78)"
  );
};

export const generateImage = function () {
  observer.publish("IMAGE_ESIGNATURE_RECEIVED", "/assets/signature.png");
};

//%B5934 5678 9101 1223564Alrimawi/Hasan Mohammed.works^1226hello?;5934 5678 9101 1223=5641226hello?
//%B1234 5678 9101 1223Alrimawi/Hasan^1226?;1234 5678 9101 1223=1226?

// To simulate the idea of receiving data without the user's interaction
//     with any UI component
// setTimeout(() => {
//   observer.publish(
//     "MAGNETIC_CARD_READ",
//     "%B5934 5678 9101 1223564Alrimawi/Hasan Mohammed.works^1226hello?;5934 5678 9101 1223=5641226hello?"
//   );
//   console.log("I PUBLISHED");
// }, 2000);
