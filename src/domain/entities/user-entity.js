export default class UserEntity {
  /**
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @param {string} address
   * @param {string} city
   * @param {string} country
   * @param {BcryptHelper} bcryptHelper
   */
  constructor({ name, email, password, address, city, country, bcryptHelper }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.address = address;
    this.city = city;
    this.country = country;
    this.bcryptHelper = bcryptHelper;
  }

  async encryptPassword() {
    const encryptedPassword = await this.bcryptHelper.hashPassword(
      this.password,
    );
    this.password = encryptedPassword;
  }

  getArray() {
    return [
      this.name,
      this.email,
      this.password,
      this.address,
      this.city,
      this.country,
    ];
  }
}
