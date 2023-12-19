import PostgreHelper from "infra/helpers/postgre-helper";
import { IStoreEntity } from "domain/entities/@interfaces/store-entity.interfaces"
import { ISignUpStoreRepository } from "../@interfaces/stores-repository.interfaces";

export default class SignUpStoreRepository implements ISignUpStoreRepository {
  async execute(storeEntity: IStoreEntity) {
    await PostgreHelper.executeQuery(
      `
      INSERT INTO stores
        (name, address, city, country, phone, category, subdomain)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7);
      `,
      storeEntity.getArray(),
    );
  }
}
