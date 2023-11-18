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
    console.log("Test");
    const jwtHelperAccessToken = new JwtHelper(accessTokenSecret);
    console.log("Test2");
    const decodedToken = jwtHelperAccessToken.verifyToken(token);
    console.log("Test3", decodedToken);
    if (!decodedToken) throw new UnauthorizedError();
    req.userId = decodedToken.userId;
    return next();
  } catch (error) {
    return HttpResponse.unauthorizedError(error);
  }
};
