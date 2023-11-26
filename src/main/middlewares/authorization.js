import { UnauthorizedError } from "src/presentation/errors";
import JwtHelper from "src/infra/helpers/jwt-helper";
import publicRoutes from "src/main/configs/public-routes";
import { accessTokenSecret } from "../configs/env";

const isPublicRoute = (path) => publicRoutes.includes(path);

export default async (req, res, next) => {
  try {
    if (req.method === "OPTIONS") return next();
    if (isPublicRoute(req.path)) return next();
    const { authorization } = req.headers;
    if (!authorization) throw new UnauthorizedError();
    const [, token] = authorization.split("Bearer ");
    if (!token) throw new UnauthorizedError();
    const jwtHelperAccessToken = new JwtHelper(accessTokenSecret);
    const decodedToken = jwtHelperAccessToken.verifyToken(token);
    if (!decodedToken) throw new UnauthorizedError();
    req.userId = decodedToken.userId;
    return next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
