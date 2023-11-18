import HttpResponse from "../../helpers/http-response";
import { MissingParamError } from "../../errors";
import logger from "../../../main/config/logger";

export default class LoginRouter {
  #loginUseCase;

  #requiredFields = ["email", "password"];

  constructor({ loginUseCase }) {
    this.#loginUseCase = loginUseCase;
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
      const tokens = await this.#loginUseCase.execute(body);
      return HttpResponse.ok(tokens);
    } catch (error) {
      if (error.name !== "UnauthorizedError") logger.error("LoginError", error);
      return HttpResponse.unauthorizedError(error);
    }
  }
}
