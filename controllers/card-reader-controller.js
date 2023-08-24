import { cardDetails } from "../models/card-reader-model.js";
import { observer } from "../communicators/observer.js";
import { cardReaderView } from "../views/card-reader-view.js";
import { cardDetailsService } from "../services/card-reader-extractor.js";
import { tracksRetriever } from "../communicators/communicator.js";
import { peripheralsTagControl } from "../ui-components/peripherals.js";

document.getElementById("readButton").addEventListener("click", readCard);

// on DOM content loaded the selected peripheral will be highlighted using the specified function
document.addEventListener("DOMContentLoaded", () => {
  peripheralsTagControl.highlightPeripheralSelected("cardReader");
});

// When publish function of the observer is executed somewhere then the function specified within the subscribe 
// method will be executed and update both the model and the view
observer.subscribe("MAGNETIC_CARD_READ", (data) => {
  console.log("SUBSCRIBED");
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
      cardDetails.setCardDetails(cardDetailsService.extractCardDetails(readStripe));
      autoFillForm(cardDetails.getCardDetails());
    } catch (err) {
      console.log(err);
    }
  });
}
