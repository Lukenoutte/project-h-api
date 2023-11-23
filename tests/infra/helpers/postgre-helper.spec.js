import PostgreHelper from "src/infra/helpers/postgre-helper";
import { postgreUrl } from "src/main/configs/env";

describe("Postgre Helper", () => {
  afterAll(async () => {
    await PostgreHelper.disconnect();
  });
  test("Should connect", async () => {
    await PostgreHelper.connect(postgreUrl);
    expect(PostgreHelper.client._connected).toBeTruthy();
  });

  test("Should disconnect", async () => {
    await PostgreHelper.connect(postgreUrl);
    expect(PostgreHelper.client._connected).toBeTruthy();
    await PostgreHelper.disconnect();
    expect(PostgreHelper.client).toBeFalsy();
  });

  test("Should execute SQL query", async () => {
    await PostgreHelper.connect(postgreUrl);
    const result = await PostgreHelper.executeQuery("SELECT CURRENT_DATE");
    expect(result).toBeDefined();
    await PostgreHelper.disconnect();
  });

  test("Should handle errors during connection", async () => {
    jest.setTimeout(20000);
    await expect(PostgreHelper.connect("invalid-url")).rejects.toThrow();
  }, 20000);

  test("Should handle errors during disconnection", async () => {
    jest.setTimeout(20000);
    await PostgreHelper.connect(postgreUrl);
    await expect(PostgreHelper.disconnect()).resolves.not.toThrow();
  }, 20000);

  test("Should handle errors during SQL query execution", async () => {
    jest.setTimeout(20000);
    await PostgreHelper.connect(postgreUrl);
    await expect(PostgreHelper.executeQuery("INVALID SQL")).rejects.toThrow();
    await PostgreHelper.disconnect();
  }, 20000);

  test("Should handle executing multiple SQL queries", async () => {
    await PostgreHelper.connect(postgreUrl);
    const createTableQuery =
      "CREATE TABLE test_table (id SERIAL PRIMARY KEY, name VARCHAR(255));";
    const insertDataQuery =
      "INSERT INTO test_table (name) VALUES ('John Doe');";
    const selectDataQuery = "SELECT * FROM test_table;";

    try {
      await PostgreHelper.executeQuery(createTableQuery);
      await PostgreHelper.executeQuery(insertDataQuery);
      const result = await PostgreHelper.executeQuery(selectDataQuery);
      expect(result.rows.length).toBe(1);
      expect(result.rows[0].name).toBe("John Doe");
    } finally {
      await PostgreHelper.executeQuery("DROP TABLE IF EXISTS test_table;");
      await PostgreHelper.disconnect();
    }
  });
});
