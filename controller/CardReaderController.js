import { tracksRetriever } from "../communicator/communicator.js";
import { extractCardDetails } from "../service/CardReaderExtractor.js";
import { autoFillForm } from "../view/CardReaderView.js";
import { card } from "../model/CardReaderModel.js";
import { observer } from "../communicator/Observer.js";

document.getElementById("readButton").addEventListener("click", readCard);

function readCard() {
  tracksRetriever().then((readStripe) => {
    try {
      // card.setCardInformation(extractCardDetails(readStripe));
      // autoFillForm(card.getCardInformation());
    } catch (err) {
      console.log(err);
    }
  });
}

observer.subscribe("MAGNETIC_CARD_READ", (data) => {
  console.log(
    `I'm the one who is listening to any event of MAGNETIC_CARD_READ type, and the data passed is: ${data}`
  );
  try {
    card.setCardInformation(extractCardDetails(data));
    autoFillForm(card.getCardInformation());
  } catch (err) {
    console.log(err);
  }
});
