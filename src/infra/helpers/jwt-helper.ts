import jwt from "jsonwebtoken";
import { IJwtHelper, VerifyResponse } from "./@interfaces/helper.interfaces"

export default class JwtHelper implements IJwtHelper {
  secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: "15m" });
  }

  verifyToken(token: string): VerifyResponse {
    return jwt.verify(token, this.secret) as VerifyResponse;
  }
}
