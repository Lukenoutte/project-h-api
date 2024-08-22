import PostgreHelper from "infra/helpers/postgre-helper";
import { IStoreEntity } from "domain/entities/@interfaces/store-entity.interfaces"
import { ISignUpStoreRepository } from "../@interfaces/stores-repository.interfaces";

export default class SignUpStoreRepository implements ISignUpStoreRepository {
  async execute(storeEntity: IStoreEntity) {
    await PostgreHelper.executeQuery(
      `
      INSERT INTO stores
        (name, category, subdomain, master_id)
      VALUES
        ($1, $2, $3, $4);
      `,
      storeEntity.getArray(),
    );
  }
}
