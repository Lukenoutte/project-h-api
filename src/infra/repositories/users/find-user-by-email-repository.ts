import PostgreHelper from "infra/helpers/postgre-helper";
import { IFindUserByEmailRepository } from "../@interfaces/users-respository.interfaces";
import { IUserResponseWithPass } from "domain/entities/@interfaces/user-entity.interfaces";

export default class FindUserByEmailRepository implements IFindUserByEmailRepository {
  async execute({ email }: { email: string }): Promise<IUserResponseWithPass> {
    const { rows } = await PostgreHelper.executeQuery(
      `
      SELECT * FROM users WHERE email = $1;
      `,
      [email],
    );
    return rows[0];
  }
}
