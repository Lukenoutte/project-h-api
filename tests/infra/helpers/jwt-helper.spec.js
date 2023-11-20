import JwtHelper from "../../../src/infra/helpers/jwt-helper";
import {
  accessTokenSecret,
  refreshTokenSecret,
} from "../../../src/main/config/env";

describe("JWT Helper", () => {
  const accessJwtHelper = new JwtHelper(accessTokenSecret);
  const refreshJwtHelper = new JwtHelper(refreshTokenSecret);

  test("Should be able to generate an access token with the correct length", () => {
    const token = accessJwtHelper.generateToken({ userId: 1 });
    expect(token).toBeDefined();
    expect(token.length).toBeGreaterThan(0);
    expect(token.length).toBeLessThanOrEqual(143);
  });

  test("Should be able to generate a refresh token with the correct length", () => {
    const token = refreshJwtHelper.generateToken({ userId: 1 });
    expect(token).toBeDefined();
    expect(token.length).toBeGreaterThan(0);
    expect(token.length).toBeLessThanOrEqual(143);
  });

  test("Should be able to verify a valid access token", () => {
    const payload = { userId: 1 };
    const token = accessJwtHelper.generateToken(payload);
    const decodedPayload = accessJwtHelper.verifyToken(
      token,
      accessTokenSecret,
    );
    expect(decodedPayload.userId).toEqual(payload.userId);
  });

  test("Should throw an error when trying to verify an invalid access token", () => {
    const invalidToken = "invalidToken";

    expect(() =>
      accessJwtHelper.verifyToken(invalidToken, accessTokenSecret),
    ).toThrowError("jwt");
  });
});
