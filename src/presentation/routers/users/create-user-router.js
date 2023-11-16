import HttpResponse from "../../helpers/http-response";
import { MissingParamError } from "../../errors";

export default class CreateUserRouter {
  #createUserUseCase;

  #requiredFields = ["name", "email", "password", "country"];

  constructor({ createUserUseCase }) {
    this.#createUserUseCase = createUserUseCase;
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
      const result = await this.#createUserUseCase.execute(body);
      return HttpResponse.created(result);
    } catch (error) {
      return HttpResponse.serverError(error);
    }
  }
}