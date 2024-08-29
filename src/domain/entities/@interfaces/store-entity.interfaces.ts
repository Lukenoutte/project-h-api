export interface IStore {
  name: string;
  category: string;
  subdomain: string;
  masterId: number;
}

export interface IStoreEntity extends IStore {
  getArray: () => string[];
}

export interface IStoreResponse extends IStore {
  id: number;
}