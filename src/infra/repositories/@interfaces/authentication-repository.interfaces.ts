export interface ICreateRefreshTokenRepository {
  execute: (params: { userId: number, token: string }) => Promise<void>;
}

export interface IDeleteRefreshTokenRepository {
  execute: (params: { userId: number; }) => Promise<void>;
}

export interface IFindRefreshTokenRepository {
  execute: (params: { userId?: number, token?: string }) => Promise<IRefreshTokenResponse>;
}

export interface IUpdateRefreshTokenRepository {
  execute: (params: {
    currentToken: string;
    newToken: string;
  }) => Promise<void>;
}

interface IRefreshTokenResponse {
  id: number;
  userId: number;
  token: string;
}

