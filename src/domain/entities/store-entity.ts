import { IStore, IStoreEntity } from './@interfaces/store-entity.interfaces';

export default class StoreEntity implements IStoreEntity {
  userId: number;
  name: string;
  category: string;
  subdomain: string;

  constructor({
    userId,
    name,
    category,
    subdomain,
  }: IStore) {
    this.userId = userId;
    this.name = name;
    this.category = category;
    this.subdomain = subdomain;
  }

  getArray(): any[] {
    return [
      this.name,
      this.category,
      this.subdomain,
    ];
  }
}
