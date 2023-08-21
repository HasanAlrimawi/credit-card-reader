import { tracksRetriever } from "../communicators/Communicator.js";
import { cardDetails } from "../model/CardReaderModel.js";
import { observer } from "../communicators/Observer.js";
import { cardReaderView } from "../views/CardReaderView.js";
import { cardDetailsService } from "../services/CardReaderExtractor.js";

document.getElementById("readButton").addEventListener("click", readCard);
document.addEventListener("DOMContentLoaded", () => {
  cardReaderView.showPeripheralSelected();
});

observer.subscribe("MAGNETIC_CARD_READ", (data) => {
  console.log(
    `I'm the one who is listening to any event of MAGNETIC_CARD_READ type, and the data passed is: ${data}`
  );
  try {
    cardDetails.setCardDetails(cardDetailsService.extractCardDetails(data));
    cardReaderView.autoFillForm(cardDetails.getCardDetails());
  } catch (err) {
    console.log(err);
  }
});

function readCard() {
  tracksRetriever().then((readStripe) => {
    try {
      // cardDetails.setCardDetails(cardDetailsService.extractCardDetails(readStripe));
      // autoFillForm(cardDetails.getCardDetails());
    } catch (err) {
      console.log(err);
    }
  });
}
