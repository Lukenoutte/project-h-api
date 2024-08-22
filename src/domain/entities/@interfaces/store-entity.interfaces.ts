export interface IStoreEntity {
  name: string;
  category: string;
  subdomain: string;
  masterId: string;
  getArray: () => string[];
}

export interface IStore {
  name: string;
  category: string;
  subdomain: string;
  masterId: string;
}