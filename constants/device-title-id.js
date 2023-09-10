export const devicesTitleId = (function () {
  const cardReader = {
    title: "Card Reader",
    peripheralId: "card-reader",
  };

  const barcodeScanner = {
    title: "Barcode Scanner",
    peripheralId: "barcode-scanner",
  };

  const eSignature = {
    title: "E-Signature",
    peripheralId: "e-signature",
  };

  return {
    cardReader,
    barcodeScanner,
    eSignature,
  };
})();
