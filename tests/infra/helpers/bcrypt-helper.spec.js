import BcryptHelper from "src/infra/helpers/bcrypt-helper";

describe("Bcrypt Helper", () => {
  const bcryptHelper = new BcryptHelper();
  test("Should be able to hash a password", async () => {
    const hashedPass = await bcryptHelper.hashPassword("123");
    expect(hashedPass.length).toBe(60);
  });

  it("Should hash a password and return a string", async () => {
    const password = "password123";
    const hashedPassword = await bcryptHelper.hashPassword(password);

    expect(hashedPassword).toBeDefined();
    expect(typeof hashedPassword).toBe("string");
    expect(hashedPassword).not.toEqual(password);
  });

  test("Should be able to compare hashed password and return true", async () => {
    const password = "12345678";
    const hashedPass = await bcryptHelper.hashPassword(password);
    const isValid = await bcryptHelper.comparePassword(password, hashedPass);
    expect(isValid).toBeTruthy();
  });

  test("Should be able to compare hashed password and return false", async () => {
    const password = "12345678";
    const hashedPass = await bcryptHelper.hashPassword(password);
    const isValid = await bcryptHelper.comparePassword("1234", hashedPass);
    expect(isValid).toBeFalsy();
  });
});
