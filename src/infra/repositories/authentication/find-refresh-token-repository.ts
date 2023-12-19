import PostgreHelper from "infra/helpers/postgre-helper";
import { IFindRefreshTokenRepository } from "../@interfaces/authentication-repository.interfaces"

export default class FindRefreshTokenRepository implements IFindRefreshTokenRepository {
  async execute({ userId, token }: { userId: string, token: string }) {
    let query: string = '';
    let queryParams: any[] = [];
    if (userId) {
      query = "SELECT * FROM refresh_tokens WHERE user_id = $1;";
      queryParams = [userId];
    } else if (token) {
      query = "SELECT * FROM refresh_tokens WHERE token = $1;";
      queryParams = [token];
    }
    const { rows } = await PostgreHelper.executeQuery(query, queryParams);
    return rows[0];
  }
}
