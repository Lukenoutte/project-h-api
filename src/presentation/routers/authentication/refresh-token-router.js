import HttpResponse from "../../helpers/http-response";
import { MissingParamError } from "../../errors";
import logger from "../../../main/config/logger";

export default class RefreshTokenRouter {
  #refreshTokenUseCase;

  #requiredFields = ["refreshToken"];

  constructor({ refreshTokenUseCase }) {
    this.#refreshTokenUseCase = refreshTokenUseCase;
  }

  #validate(httpRequest) {
    for (const field of this.#requiredFields) {
      if (!httpRequest[field]) return new MissingParamError(field);
    }
    return false;
  }

  async route(httpRequest) {
    try {
      if (!httpRequest || !httpRequest.body) throw new Error("Invalid Request");
      const body = { ...httpRequest.body };
      const error = this.#validate(body);
      if (error) return HttpResponse.badRequest(error);
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
