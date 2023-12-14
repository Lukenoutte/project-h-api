import { string, object } from "yup";
import logger from "main/configs/logger";
import HttpResponse from "../../helpers/http-response";
import { ISignUpStoreUseCase } from "domain/usecases/@interfaces/stores-usecases.interfaces";
import { IHttpResponse } from "presentation/helpers/@interfaces/helper.interfaces";
import { Request } from "express";

interface ISignUpStoreParams {
  name: string;
  address: string;
  city: string;
  country: string;
}

export default class SignUpStoreRouter {
  #signUpStoreUseCase;

  constructor({ signUpStoreUseCase }: { signUpStoreUseCase: ISignUpStoreUseCase }) {
    this.#signUpStoreUseCase = signUpStoreUseCase;
  }

  async validate(params: ISignUpStoreParams): Promise<{ isValid: boolean, error: object }> {
    try {
      const storeSchema = object({
        name: string().required(),
        address: string().required(),
        city: string().required(),
        country: string().required(),
      });
      await storeSchema.validate(params);
      return { isValid: true, error: {} };
    } catch (error) {
      if (error instanceof Error) {
        const { name, message } = error;
        return { error: { name, message }, isValid: false };
      }
      return { error: { 
        name: 'ValidationError', 
        message: 'Something went wrong!' 
      }, 
        isValid: false 
      };
    }
  }

  async route(httpRequest: Request): Promise<IHttpResponse> {
    try {
      if (!httpRequest || !httpRequest.body) throw new Error("Invalid Request");
      const body = { ...httpRequest.body };
      const { isValid, error } = await this.validate(body);
      if (!isValid) return HttpResponse.badRequest(error);
      const result = await this.#signUpStoreUseCase.execute(body);
      return HttpResponse.created(result);
    } catch (error) {
      logger.error("SignUpStoreError", error);
      if (error instanceof Error) return HttpResponse.serverError(error.message);
      return HttpResponse.serverError('SignUpStoreError');
    }
  }
}
