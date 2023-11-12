import { Client } from "pg";

export default {
  async connect(uri) {
    this.uri = uri;
    this.client = new Client(uri);
    this.clientPromise = await this.client.connect();
  },

  async disconnect() {
    await this.clientPromise.close();
    this.clientPromise = null;
  },

  async executeQuery(query, values) {
    await this.client.query(query, values);
  },
};
