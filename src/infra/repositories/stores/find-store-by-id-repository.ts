import PostgreHelper from 'infra/helpers/postgre-helper';
import { IFindStoreByIdRepository } from '../@interfaces/stores-repository.interfaces';
import { IStore } from 'domain/entities/@interfaces/store-entity.interfaces';
import CamelCaseHelper from 'infra/helpers/camel-case-helper'

export default class FindStoreByIdRepository
  implements IFindStoreByIdRepository
{
  async execute({ storeId }: { storeId: number }): Promise<IStore> {
    const { rows } = await PostgreHelper.executeQuery(
      `
      SELECT * FROM stores WHERE id = $1;
      `,
      [storeId]
    );
    const [ firstItem ] = rows
    const camelCaseHelper = new CamelCaseHelper()
    return camelCaseHelper.convert(firstItem);
  }
}
