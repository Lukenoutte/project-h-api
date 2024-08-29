import PostgreHelper from "infra/helpers/postgre-helper";
import { IFindStoreByMasterIdRespository } from "../@interfaces/stores-repository.interfaces";
import { IStoreResponse } from "domain/entities/@interfaces/store-entity.interfaces";

export default class FindStoreByMasterIdRespository implements IFindStoreByMasterIdRespository {
  async execute(masterId: number): Promise<IStoreResponse> {
    const { rows } = await PostgreHelper.executeQuery(
      `
      SELECT * FROM stores WHERE master_id = $1;
      `,
      [masterId],
    );
    return rows[0];
  }
}
