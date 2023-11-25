import PostgreHelper from "src/infra/helpers/postgre-helper";

export default class SignUpUserRepository {
  execute(userEntity) {
    return PostgreHelper.executeQuery(
      `
      INSERT INTO users
        (name, email, password, address, city, country)
      VALUES
        ($1, $2, $3, $4, $5, $6);
      `,
      userEntity.getArray(),
    );
  }
}
