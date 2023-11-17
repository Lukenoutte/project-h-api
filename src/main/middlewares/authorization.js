import { UnauthorizedError } from "../../presentation/errors";

export default async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
