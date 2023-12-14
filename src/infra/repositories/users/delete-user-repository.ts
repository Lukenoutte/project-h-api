import PostgreHelper from "infra/helpers/postgre-helper";
import { IDeleteUserRepository } from "../@interfaces/users-respository.interfaces";

export default class DeleteUserRepository implements IDeleteUserRepository {
  async execute({ email }: { email: string }) {
    await PostgreHelper.executeQuery(
      `
      DELETE FROM users
      WHERE email = $1;
      `,
      [email],
    );
  }
}
