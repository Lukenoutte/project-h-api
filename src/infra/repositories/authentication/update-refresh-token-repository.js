import PostgreHelper from "../../helpers/postgre-helper";

export default class UpdateRefreshTokenRepository {
  async execute({ currentToken, newToken }) {
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
