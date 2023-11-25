import logger from "src/main/configs/logger";
import HttpResponse from "../../helpers/http-response";
import { MissingParamError } from "../../errors";

export default class SignUpStoreRouter {
  #signUpStoreUseCase;

  #requiredFields = ["name", "address", "city", "country"];

  constructor({ signUpStoreUseCase }) {
    this.#signUpStoreUseCase = signUpStoreUseCase;
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
      const result = await this.#signUpStoreUseCase.execute(body);
      return HttpResponse.created(result);
    } catch (error) {
      logger.error("SignUpStoreError", error);
      return HttpResponse.serverError(error);
    }
  }
}
