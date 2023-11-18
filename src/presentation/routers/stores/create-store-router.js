import HttpResponse from "../../helpers/http-response";
import { MissingParamError } from "../../errors";
import logger from "../../../main/config/logger";

export default class CreateStoreRouter {
  #createStoreUseCase;

  #requiredFields = ["name", "address", "city", "country"];

  constructor({ createStoreUseCase }) {
    this.#createStoreUseCase = createStoreUseCase;
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
      const result = await this.#createStoreUseCase.execute(body);
      return HttpResponse.created(result);
    } catch (error) {
      logger.error("CreateStoreError", error);
      return HttpResponse.serverError(error);
    }
  }
}
