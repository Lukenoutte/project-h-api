import PostgreHelper from "../../helpers/postgre-helper";

export default class DeleteRefreshTokenRepository {
  async execute({ userId }) {
    await PostgreHelper.executeQuery(
      `
      DELETE FROM refresh_tokens
      WHERE user_id = $1;
      `,
      [userId],
    );
  }
}
