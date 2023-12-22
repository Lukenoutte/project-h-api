import { string, object, number } from 'yup';
import logger from 'main/configs/logger';
import HttpResponse from '../../helpers/http-response';
import { ISignUpStoreUseCase } from 'domain/usecases/@interfaces/stores-usecases.interfaces';
import { IHttpResponse } from 'presentation/helpers/@interfaces/helper.interfaces';
import { IStore } from 'domain/entities/@interfaces/store-entity.interfaces';
import { IRequest } from '../@interfaces/router.interfaces';

export default class SignUpStoreRouter {
  #signUpStoreUseCase;

  constructor({
    signUpStoreUseCase,
  }: {
    signUpStoreUseCase: ISignUpStoreUseCase;
  }) {
    this.#signUpStoreUseCase = signUpStoreUseCase;
  }

  async validate(params: IStore): Promise<{ isValid: boolean; error: object }> {
    try {
      const storeSchema = object({
        userId: number().required(),
        name: string().required(),
        address: string().required(),
        city: string().required(),
        country: string().required(),
        phone: string().required(),
        category: string().required(),
        subdomain: string().required(),
      });
      await storeSchema.validate(params);
      return { isValid: true, error: {} };
    } catch (error) {
      if (error instanceof Error) {
        const { name, message } = error;
        return { error: { name, message }, isValid: false };
      }
      return {
        error: {
          name: 'ValidationError',
          message: 'Something went wrong!',
        },
        isValid: false,
      };
    }
  }

  async route(httpRequest: IRequest): Promise<IHttpResponse> {
    try {
      if (!httpRequest || !httpRequest.body)
        throw new Error('InvalidRequestError');
      const body = { ...httpRequest.body };
      const userId = parseInt(httpRequest.userId);
      const storeData = { userId, ...body };
      const { isValid, error } = await this.validate(storeData);
      if (!isValid) return HttpResponse.badRequest(error);
      const result = await this.#signUpStoreUseCase.execute(storeData);
      return HttpResponse.created(result);
    } catch (error) {
      logger.error('SignUpStoreError', error);
      if (error instanceof Error)
        return HttpResponse.serverError(error.message);
      return HttpResponse.serverError('SignUpStoreError');
    }
  }
}
