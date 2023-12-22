import { IStore, IStoreEntity } from './@interfaces/store-entity.interfaces';

export default class StoreEntity implements IStoreEntity {
  userId: number;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  category: string;
  subdomain: string;

  constructor({
    userId,
    name,
    address,
    city,
    country,
    phone,
    category,
    subdomain,
  }: IStore) {
    this.userId = userId;
    this.name = name;
    this.address = address;
    this.city = city;
    this.country = country;
    this.phone = phone;
    this.category = category;
    this.subdomain = subdomain;
  }

  getArray(): any[] {
    return [
      this.userId,
      this.name,
      this.address,
      this.city,
      this.country,
      this.phone,
      this.category,
      this.subdomain,
    ];
  }
}
