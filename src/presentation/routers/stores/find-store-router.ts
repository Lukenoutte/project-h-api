import { string, object } from "yup";
import logger from "main/configs/logger";
import HttpResponse from "../../helpers/http-response";
import { IFindStoreUseCase } from "domain/usecases/@interfaces/stores-usecases.interfaces";
import { IHttpResponse } from "presentation/helpers/@interfaces/helper.interfaces";
import { Request } from "express";

export default class FindStoreRouter {
  #findStoreUseCase;

  constructor({ findStoreUseCase }: { findStoreUseCase: IFindStoreUseCase }) {
    this.#findStoreUseCase = findStoreUseCase;
  }

  async validate(params: { masterId: string }): Promise<{ isValid: boolean, error: object }> {
    try {
      const storeSchema = object({
        masterId: string().required()
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
      const { isValid, error } = await this.validate({ 
        masterId: httpRequest.userId 
      });
      if (!isValid) return HttpResponse.badRequest(error);
      const store = await this.#findStoreUseCase.execute({ 
        masterId: parseInt(httpRequest.userId) 
      });
      return HttpResponse.ok(store);
    } catch (error) {
      logger.error("FindStoreError", error);
      if (error instanceof Error) return HttpResponse.serverError(error.message);
      return HttpResponse.serverError('FindStoreError');
    }
  }
}
