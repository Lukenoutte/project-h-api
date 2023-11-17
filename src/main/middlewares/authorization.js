import { UnauthorizedError } from "../../presentation/errors";
import JwtHelper from "../../infra/helpers/jwt-helper";
import { accessTokenSecret } from "../config/env";

export default async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new UnauthorizedError();
    const [, token] = authorization.split("Bearer: ");
    if (!token) throw new UnauthorizedError();
    const jwtHelper = new JwtHelper(accessTokenSecret);
    const decodedToken = await jwtHelper.verifyToken(token);
    req.userId = decodedToken.id;
    return next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
