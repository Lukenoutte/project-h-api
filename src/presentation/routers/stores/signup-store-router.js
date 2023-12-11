import { string, object } from "yup";
import logger from "src/main/configs/logger";
import HttpResponse from "../../helpers/http-response";

export default class SignUpStoreRouter {
  #signUpStoreUseCase;

  /**
   * @param {SignUpStoreUseCase} signUpStoreUseCase
   */
  constructor({ signUpStoreUseCase }) {
    this.#signUpStoreUseCase = signUpStoreUseCase;
  }

  /**
   * @typedef {object} ParamsSignUpStore
   * @property {string} name
   * @property {string} address
   * @property {string} city
   * @property {string} country
   */

  /**
   * @param {ParamsSignUpStore} params
   * @returns {object}
   */
  async validate(params) {
    try {
      const storeSchema = object({
        name: string().required(),
        address: string().required(),
        city: string().required(),
        country: string().required(),
      });
      await storeSchema.validate(params);
      return { isValid: true };
    } catch (error) {
      const { name, message } = error;
      return { error: { name, message }, isValid: false };
    }
  }

  /**
   * @param {HttpResponse} httpRequest
   */
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
