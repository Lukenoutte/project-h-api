import PostgreHelper from "infra/helpers/postgre-helper";
import { IUpdateRefreshTokenRepository } from "../@interfaces/authentication-repository.interfaces"


interface IRefreshTokenParams {
  currentToken: string;
  newToken: string;
}

export default class UpdateRefreshTokenRepository implements IUpdateRefreshTokenRepository {
  async execute({ currentToken, newToken }: IRefreshTokenParams) {
    await PostgreHelper.executeQuery(
      `
      UPDATE refresh_tokens
      SET token = $2
      WHERE token = $1;
      `,
      [currentToken, newToken],
    );
  }
}
