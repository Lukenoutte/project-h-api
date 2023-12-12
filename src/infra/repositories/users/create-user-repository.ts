import PostgreHelper from "src/infra/helpers/postgre-helper";
import IUserEntity from "../../../domain/entities/interfaces/user-entity.interface";

export default class SignUpUserRepository {
  execute(userEntity: IUserEntity) {
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
