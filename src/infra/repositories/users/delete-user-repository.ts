import PostgreHelper from "src/infra/helpers/postgre-helper";
import { IDeleteUserRepository } from "../@interfaces/users-respository.interfaces";

export default class DeleteUserRepository implements IDeleteUserRepository {
  execute({ email }: { email: string }) {
    return PostgreHelper.executeQuery(
      `
      DELETE FROM users
      WHERE email = $1;
      `,
      [email],
    );
  }
}
