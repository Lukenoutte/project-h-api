import PostgreHelper from "infra/helpers/postgre-helper";
import { IFindUserRepository } from "../@interfaces/users-respository.interfaces";

export default class FindUserRepository implements IFindUserRepository {
  async execute({ email }: { email: string }) {
    const { rows } = await PostgreHelper.executeQuery(
      `
      SELECT * FROM users WHERE email = $1;
      `,
      [email],
    );
    return rows[0];
  }
}
