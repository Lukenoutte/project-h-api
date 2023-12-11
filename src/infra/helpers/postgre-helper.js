import { Client } from "pg";

export default {
  /**
   * @param {string} uri
   */
  async connect(uri) {
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

  /**
   * @param {string} query
   * @param {Array} values
   * @returns {object}
   */
  executeQuery(query, values) {
    return this.client.query(query, values);
  },
};
