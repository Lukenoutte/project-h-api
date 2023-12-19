export interface IStoreEntity {
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  category: string;
  subdomain: string;
  getArray: () => string[];
}

export interface IStore {
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  category: string;
  subdomain: string;
}