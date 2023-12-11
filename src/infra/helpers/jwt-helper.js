const jwt = require("jsonwebtoken");

export default class JwtHelper {
  /**
   * @param {string} secret
   */
  constructor(secret) {
    this.secret = secret;
  }

  /**
   * @param {object} payload
   * @returns {string}
   */
  generateToken(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: "15m" });
  }

  /**
   * @param {object} payload
   * @returns {boolean}
   */
  verifyToken(token) {
    return jwt.verify(token, this.secret);
  }
}
