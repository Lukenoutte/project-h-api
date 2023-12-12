const jwt = require("jsonwebtoken");

export default class JwtHelper {
  secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: "15m" });
  }

  verifyToken(token: string) {
    return jwt.verify(token, this.secret);
  }
}
