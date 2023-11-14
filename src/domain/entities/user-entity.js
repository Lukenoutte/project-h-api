export default class UserEntity {
  constructor({ name, email, address, city, country }) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.city = city;
    this.country = country;
  }

  getArray() {
    return [this.name, this.email, this.address, this.city, this.country];
  }
}
