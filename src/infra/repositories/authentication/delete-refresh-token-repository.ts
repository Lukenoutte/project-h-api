import PostgreHelper from "src/infra/helpers/postgre-helper";

export default class DeleteRefreshTokenRepository {
  async execute({ userId }: { userId: string; }) {
    await PostgreHelper.executeQuery(
      `
      DELETE FROM refresh_tokens
      WHERE user_id = $1;
      `,
      [userId],
    );
  }
}