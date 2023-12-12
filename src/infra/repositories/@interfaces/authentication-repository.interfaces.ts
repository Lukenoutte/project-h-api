export interface ICreateRefreshTokenRepository {
  execute: (params: { userId: string, token: string }) => Promise<void>;
}

export interface IDeleteRefreshTokenRepository {
  execute: (params: { userId: string; }) => Promise<void>;
}

export interface IFindRefreshTokenRepository {
  execute: (params: { userId: string, token: string }) => Promise<object[]>;
}

export interface IUpdateRefreshTokenRepository {
  execute: (params: {
    currentToken: string;
    newToken: string;
  }) => Promise<void>;
}

