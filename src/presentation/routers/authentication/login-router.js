import HttpResponse from "../../helpers/http-response";
import { MissingParamError } from "../../errors";

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
      const accessToken = await this.#loginUseCase.execute(body);
      return HttpResponse.ok({ accessToken });
    } catch (error) {
      return HttpResponse.unauthorizedError(error);
    }
  }
}
