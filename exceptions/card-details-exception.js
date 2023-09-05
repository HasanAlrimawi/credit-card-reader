/**
 * @fileoverview Exception that's thrown when the credit card's data extracted from tracks
 *     of the magnetic stripe is different.
 */
export class CardDetailsException extends Error {
  constructor(message) {
    super(message);
    this.name = "Card Details Exception";
  }
}
