import PostgreHelper from "src/infra/helpers/postgre-helper";

export default class UpdateRefreshTokenRepository {
  /**
   * @param {string} currentToken
   * @param {string} newToken
   */
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
