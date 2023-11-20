import sut from "../../../src/infra/helpers/postgre-helper";
import { postgreUrl } from "../../../src/main/config/env";

describe("Postgre Helper", () => {
  afterAll(async () => {
    await sut.disconnect();
  });
  test("Should connect", async () => {
    await sut.connect(postgreUrl);
    expect(sut.client._connected).toBeTruthy();
  });

  test("Should disconnect", async () => {
    await sut.connect(postgreUrl);
    expect(sut.client._connected).toBeTruthy();
    await sut.disconnect();
    expect(sut.client).toBeFalsy();
  });

  test("Should execute SQL query", async () => {
    await sut.connect(postgreUrl);
    const result = await sut.executeQuery("SELECT CURRENT_DATE");
    expect(result).toBeDefined();
    await sut.disconnect();
  });

  test("Should handle errors during connection", async () => {
    jest.setTimeout(20000);
    await expect(sut.connect("invalid-url")).rejects.toThrow();
  }, 20000);

  test("Should handle errors during disconnection", async () => {
    jest.setTimeout(20000);
    await sut.connect(postgreUrl);
    await expect(sut.disconnect()).resolves.not.toThrow();
  }, 20000);

  test("Should handle errors during SQL query execution", async () => {
    jest.setTimeout(20000);
    await sut.connect(postgreUrl);
    await expect(sut.executeQuery("INVALID SQL")).rejects.toThrow();
    await sut.disconnect();
  }, 20000);

  test("Should handle executing multiple SQL queries", async () => {
    await sut.connect(postgreUrl);
    const createTableQuery =
      "CREATE TABLE test_table (id SERIAL PRIMARY KEY, name VARCHAR(255));";
    const insertDataQuery =
      "INSERT INTO test_table (name) VALUES ('John Doe');";
    const selectDataQuery = "SELECT * FROM test_table;";

    try {
      await sut.executeQuery(createTableQuery);
      await sut.executeQuery(insertDataQuery);
      const result = await sut.executeQuery(selectDataQuery);
      expect(result.rows.length).toBe(1);
      expect(result.rows[0].name).toBe("John Doe");
    } finally {
      await sut.executeQuery("DROP TABLE IF EXISTS test_table;");
      await sut.disconnect();
    }
  });
});
