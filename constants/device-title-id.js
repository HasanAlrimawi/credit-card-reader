/**
 * Wraps the the devices supported title and specified Id within the list
 * shown in the app, to ease access and prevent typos.
 */
export const DEVICES_TITLE_ID = Object.freeze({
  CARD_READER: Object.freeze({
    TITLE: "Card Reader",
    PERIPHERAL_ID: "card-reader",
  }),
  BARCODE_SCANNER: Object.freeze({
    TITLE: "Barcode Scanner",
    PERIPHERAL_ID: "barcode-scanner",
  }),
  ESIGNATURE: Object.freeze({
    TITLE: "E-Signature",
    PERIPHERAL_ID: "e-signature",
  }),
});
