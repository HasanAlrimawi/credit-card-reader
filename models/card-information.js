export class CardInformation {
  constructor(
    accountNumber,
    firstName,
    middleName,
    lastName,
    countryCode,
    expirationDate,
    title,
    optionalData
  ) {
    /** @type {string} */
    this.accountNumber = accountNumber;
    /** @type {string} */
    this.firstName = firstName;
    /** @type {string} */
    this.middleName = middleName;
    /** @type {string} */
    this.lastName = lastName;
    /** @type {string} */
    this.countryCode = countryCode;
    /** @type {string} */
    this.expirationDate = expirationDate;
    /** @type {string} */
    this.title = title;
    /** @type {string} */
    this.optionalData = optionalData;
  }
}
