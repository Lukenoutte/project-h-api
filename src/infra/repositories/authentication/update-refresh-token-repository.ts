import PostgreHelper from "src/infra/helpers/postgre-helper";

interface IRefreshTokenParams {
  currentToken: string;
  newToken: string;
}

export default class UpdateRefreshTokenRepository {
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
