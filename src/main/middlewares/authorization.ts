import JwtHelper from 'infra/helpers/jwt-helper';
import { UnauthorizedError } from 'presentation/errors';
import publicRoutes from 'main/configs/public-routes';
import { accessTokenSecret } from '../configs/env';
import {
  INextFunction,
  IRequest,
  IResponse,
} from 'presentation/routers/@interfaces/router.interfaces';

const isPublicRoute = (path: string) => publicRoutes.includes(path);

export default async (req: IRequest, res: IResponse, next: INextFunction) => {
  try {
    if (req.method === 'OPTIONS') return next();
    if (isPublicRoute(req.path)) return next();
    const { authorization } = req.headers;
    if (!authorization) throw new UnauthorizedError();
    const [, token] = authorization.split('Bearer ');
    if (!token) throw new UnauthorizedError();
    const jwtHelperAccessToken = new JwtHelper(accessTokenSecret);
    const decodedToken = jwtHelperAccessToken.verifyToken(token);
    if (!decodedToken) throw new UnauthorizedError();
    req.userId = decodedToken.userId;
    return next();
  } catch (error) {
    let errorMessage = 'UnauthorizedError';
    if (error instanceof Error) errorMessage = error.message;
    return res.status(401).json({ message: errorMessage });
  }
};
