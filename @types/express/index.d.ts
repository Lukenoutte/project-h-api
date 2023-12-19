declare namespace Express {
  export interface Request {
    userId: string;
    subdomain: string;
  }
}