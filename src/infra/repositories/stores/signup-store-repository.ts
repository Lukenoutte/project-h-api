import PostgreHelper from "infra/helpers/postgre-helper";
import { IStoreEntity } from "domain/entities/@interfaces/store-entity.interfaces"
import { ISignUpStoreRepository } from "../@interfaces/stores-repository.interfaces";

export default class SignUpStoreRepository implements ISignUpStoreRepository {
  async execute(storeEntity: IStoreEntity) {
    const data = await PostgreHelper.executeQuery(
      `
      INSERT INTO stores
        (name, category, subdomain)
      VALUES
        ($1, $2, $3)
      RETURNING id;
      `,
      storeEntity.getArray(),
    );
    if (!data) return 0
    const { rows } = data
    const firstItem = rows[0]
    if (!firstItem) return 0
    return firstItem.id; 
  }
}
