import { Client } from "pg";

export interface IBcryptHelper {
  hashPassword: (password: string) => Promise<string>;
  comparePassword: (plainPassword: string, hashedPassword: string) => Promise<boolean>;
}

export interface VerifyResponse {
  userId: string;
}

export interface IJwtHelper {
  generateToken: (payload: object) => string;
  verifyToken: (token: string) => VerifyResponse;
}

export interface IPostgreHelper {
  uri: string;
  client: Client | null;
  clientPromise: void | null;
  connect: (uri: string) => Promise<void>;
  disconnect: () => Promise<void>;
  executeQuery: (query: string, values: any[]) => Promise<any> | undefined;
 }
