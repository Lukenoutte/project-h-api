import logger from "src/main/configs/logger";
import HttpResponse from "../../helpers/http-response";
import { MissingParamError } from "../../errors";

export default class SignInRouter {
  #signInUseCase;

  #requiredFields = ["email", "password"];

  constructor({ signInUseCase }) {
    this.#signInUseCase = signInUseCase;
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
      const tokens = await this.#signInUseCase.execute(body);
      return HttpResponse.ok(tokens);
    } catch (error) {
      if (error.name !== "WrongCredentialsError")
        logger.error("SignInError", error);
      return HttpResponse.unauthorizedError(error);
    }
  }
}
