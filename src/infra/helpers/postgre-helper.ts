import { Client } from "pg";

export default {
  async connect(uri: string) {
    this.uri = uri;
    this.client = new Client(uri);
    this.clientPromise = await this.client.connect();
  },

  async disconnect() {
    if (!this.client) return;
    await this.client.end();
    this.client = null;
    this.clientPromise = null;
  },

  executeQuery(query: string, values: any[]): Promise<any>  {
    return this.client.query(query, values);
  },
};
