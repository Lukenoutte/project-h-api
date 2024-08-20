import PostgreHelper from "infra/helpers/postgre-helper";
import { IUserEntity } from "../../../domain/entities/@interfaces/user-entity.interfaces";
import { ISignUpUserRepository } from "../@interfaces/users-respository.interfaces";

export default class SignUpUserRepository implements ISignUpUserRepository{
  async execute(userEntity: IUserEntity) {
    await PostgreHelper.executeQuery(
      `
      INSERT INTO users
        (name, email, password)
      VALUES
        ($1, $2, $3);
      `,
      userEntity.getArray(),
    );
  }
}
