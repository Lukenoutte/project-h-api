import PostgreHelper from "infra/helpers/postgre-helper";
import { IFindUserByIdRepository } from "../@interfaces/users-respository.interfaces";
import { IUserResponse } from "domain/entities/@interfaces/user-entity.interfaces";

export default class FindUserByIdRepository implements IFindUserByIdRepository {
  async execute({ userId }: { userId: string }): Promise<IUserResponse> {
    const { rows } = await PostgreHelper.executeQuery(
      `
      SELECT * FROM users WHERE id = $1;
      `,
      [userId],
    );
    return rows[0];
  }
}
