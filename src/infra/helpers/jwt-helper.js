const jwt = require('jsonwebtoken');

export default class JwtHelper {
  constructor(secret) {
    this.secret = secret;
  }

  generateToken(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: "1h" });
  }

  verifyToken(token) {
    return jwt.verify(token, this.secret);
  }
}
