export default class StoreEntity {
  /**
   * @param {string} name
   * @param {string} address
   * @param {string} city
   * @param {string} country
   */
  constructor({ name, address, city, country }) {
    this.name = name;
    this.address = address;
    this.city = city;
    this.country = country;
  }

  getArray() {
    return [this.name, this.address, this.city, this.country];
  }
}
