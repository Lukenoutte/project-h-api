export default class StoreEntity {
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
