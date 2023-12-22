import FindStoreBySubdomainRepository from 'infra/repositories/stores/find-store-by-subdomain-repository';
import {
  INextFunction,
  IRequest,
  IResponse,
} from 'presentation/routers/@interfaces/router.interfaces';

export default async (req: IRequest, res: IResponse, next: INextFunction) => {
  try {
    const subdomain = getSubdomain(req);
    if (!subdomain) return next();
    if (!subdomainIsValid(subdomain)) throw new Error('InvalidStoreError');
    req.subdomain = subdomain;
    return next();
  } catch (error) {
    let errorMessage = 'UnauthorizedError';
    if (error instanceof Error) errorMessage = error.message;
    return res.status(401).json({ message: errorMessage });
  }
};

const clearSubdomain = (subdomain: string) => {
  const httpRemoved = subdomain.replace('http://', '');
  return httpRemoved.replace('https://', '');
};

const subdomainIsValid = async (subdomain: string): Promise<Boolean> => {
  const findStoreBySubdomainRepository = new FindStoreBySubdomainRepository();
  const store = await findStoreBySubdomainRepository.execute({ subdomain });
  return !!store;
};

const getSubdomain = (req: IRequest): string | void => {
  const { headers } = req;
  const { origin } = headers;
  if (!origin) return;
  const splittedOrigin = origin.split('.');
  if (splittedOrigin.length < 2) return;
  return clearSubdomain(splittedOrigin[0]);
};
