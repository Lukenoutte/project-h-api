import { UnauthorizedError } from "../../presentation/errors";
import JwtHelper from "../../infra/helpers/jwt-helper";
import { accessTokenSecret } from "../config/env";
import publicRoutes from "../config/public-routes";
import HttpResponse from "../../presentation/helpers/http-response";

const isPublicRoute = (path) => publicRoutes.includes(path);

export default async (req, res, next) => {
  try {
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
    return HttpResponse.unauthorizedError(error);
  }
};
