import PostgreHelper from "src/infra/helpers/postgre-helper";

export default class CreateRefreshTokenRepository {
  /**
   * @param {string} userId
   * @param {string} token
   */
  async execute({ userId, token }) {
    await PostgreHelper.executeQuery(
      `
      INSERT INTO refresh_tokens
        (user_id, token)
      VALUES
        ($1, $2);
      `,
      [userId, token],
    );
  }
}
