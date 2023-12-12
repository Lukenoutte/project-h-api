import PostgreHelper from "src/infra/helpers/postgre-helper";

export default class DeleteUserRepository {
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
