import { string, object } from "yup";
import logger from "src/main/configs/logger";
import HttpResponse from "../../helpers/http-response";

export default class SignUpStoreRouter {
  #signUpStoreUseCase;

  constructor({ signUpStoreUseCase }) {
    this.#signUpStoreUseCase = signUpStoreUseCase;
  }

  async validate(httpRequest) {
    try {
      const storeSchema = object({
        name: string().required(),
        address: string().required(),
        city: string().required(),
        country: string().required(),
      });
      await storeSchema.validate(httpRequest);
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
      const result = await this.#signUpStoreUseCase.execute(body);
      return HttpResponse.created(result);
    } catch (error) {
      logger.error("SignUpStoreError", error);
      return HttpResponse.serverError(error);
    }
  }
}
