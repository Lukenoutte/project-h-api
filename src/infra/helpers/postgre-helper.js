import { Client } from "pg";

class PostgreHelper {
  #client;

  constructor() {
    this.#client = null;
  }

  async connect(uri) {
    this.#client = new Client({ connectionString: uri });
    await this.#client.connect();
  }

  async disconnect() {
    if (this.#client) await this.#client.end();
  }
}

export default PostgreHelper;
