export interface ICreateRefreshTokenRepository {
  execute: (params: { userId: number, token: string }) => Promise<void>;
}

export interface IDeleteRefreshTokenRepository {
  execute: (params: { userId: number; }) => Promise<void>;
}

export interface IFindRefreshTokenRepository {
  execute: (params: { userId?: number, token?: string }) => Promise<{ userId: number, token: string }>;
}

export interface IUpdateRefreshTokenRepository {
  execute: (params: {
    currentToken: string;
    newToken: string;
  }) => Promise<void>;
}

