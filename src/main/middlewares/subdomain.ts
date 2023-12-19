import { Response, NextFunction, Request } from 'express';


export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { headers } = req
    const { origin } = headers
    if (!origin) return next()
    const splittedOrigin = origin.split(".")
    if (splittedOrigin.length < 2) return next()
    req.subdomain = splittedOrigin[0].replace("http://", "")
    // const { host } = headers
    // if (!host) return next()
    // const splittedHost = host.split(".")
    // if (splittedHost.length < 2) return next()
    // req.subdomain = splittedHost[0]
    return next();
  } catch (error) {
    let errorMessage = "UnauthorizedError";
    if (error instanceof Error) errorMessage = error.message
    return res.status(401).json({ message: errorMessage });
  }
};
