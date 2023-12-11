import bcrypt from "bcrypt";

export default class BcryptHelper {
  /**
   * @param {string} password
   * @returns {string}
   */
  async hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * @param {string} plainPassword
   * @param {string} hashedPassword
   * @returns {boolean}
   */
  async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
