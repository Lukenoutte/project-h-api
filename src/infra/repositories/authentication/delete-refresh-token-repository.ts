import PostgreHelper from "infra/helpers/postgre-helper";
import { IDeleteRefreshTokenRepository } from "../@interfaces/authentication-repository.interfaces"

export default class DeleteRefreshTokenRepository implements IDeleteRefreshTokenRepository {
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
