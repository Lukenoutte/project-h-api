export interface IStoreEntity {
  userId: number;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  category: string;
  subdomain: string;
  getArray: () => any[];
}

export interface IStore {
  userId: number;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  category: string;
  subdomain: string;
}
