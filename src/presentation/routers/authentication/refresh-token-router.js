import { string, object } from "yup";
import logger from "src/main/configs/logger";
import HttpResponse from "../../helpers/http-response";

export default class RefreshTokenRouter {
  #refreshTokenUseCase;

  constructor({ refreshTokenUseCase }) {
    this.#refreshTokenUseCase = refreshTokenUseCase;
  }

  async validate(httpRequest) {
    try {
      const tokenSchema = object({
        refreshToken: string().required(),
      });
      await tokenSchema.validate(httpRequest);
      return { isValid: true };
    } catch (error) {
      const { name, message } = error;
      return { error: { name, message }, isValid: false };
    }
  }

  async route(httpRequest) {
    try {
      if (!httpRequest || !httpRequest.body) throw new Error("Invalid Request");
      const body = { ...httpRequest.body };
      const { isValid, error } = await this.validate(body);
      if (!isValid) return HttpResponse.badRequest(error);
      const accessToken = await this.#refreshTokenUseCase.execute({
        userId: httpRequest.userId,
        refreshToken: body.refreshToken,
      });
      return HttpResponse.ok({ accessToken });
    } catch (error) {
      logger.error("RefreshTokenError", error);
      return HttpResponse.serverError(error);
    }
  }
}
