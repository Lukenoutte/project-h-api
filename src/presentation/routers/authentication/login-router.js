import HttpResponse from "../../helpers/http-response";
import { MissingParamError, UnauthorizedError } from "../../errors";

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
      const result = await this.#loginUseCase.execute(body);
      if (!result) return new UnauthorizedError();
      return HttpResponse.ok(result);
    } catch (error) {
      return HttpResponse.serverError(error);
    }
  }
}
