import JwtHelper from "infra/helpers/jwt-helper";
import { accessTokenSecret, refreshTokenSecret } from "main/configs/env";

describe("JWT Helper", () => {
  const accessJwtHelper = new JwtHelper(accessTokenSecret);
  const refreshJwtHelper = new JwtHelper(refreshTokenSecret);

  test("should be able to generate an access token with the correct length", () => {
    const token = accessJwtHelper.generateToken({ userId: 1 });
    expect(token).toBeDefined();
    expect(token.length).toBeGreaterThan(0);
    expect(token.length).toBeLessThanOrEqual(143);
  });

  test("should be able to generate a refresh token with the correct length", () => {
    const token = refreshJwtHelper.generateToken({ userId: 1 });
    expect(token).toBeDefined();
    expect(token.length).toBeGreaterThan(0);
    expect(token.length).toBeLessThanOrEqual(143);
  });

  test("should be able to verify a valid access token", () => {
    const payload = { userId: 1 };
    const token = accessJwtHelper.generateToken(payload);
    const decodedPayload = accessJwtHelper.verifyToken(
      token,
    );
    expect(decodedPayload.userId).toEqual(payload.userId);
  });

  test("should throw an error when trying to verify an invalid access token", () => {
    const invalidToken = "invalidToken";

    expect(() =>
      accessJwtHelper.verifyToken(invalidToken),
    ).toThrow("jwt");
  });
});
