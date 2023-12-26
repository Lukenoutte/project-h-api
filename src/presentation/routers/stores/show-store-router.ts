import { string, object } from 'yup';
import logger from 'main/configs/logger';
import HttpResponse from '../../helpers/http-response';
import { IShowStoreUseCase } from 'domain/usecases/@interfaces/stores-usecases.interfaces';
import { IHttpResponse } from 'presentation/helpers/@interfaces/helper.interfaces';
import { IRequest } from '../@interfaces/router.interfaces';

export default class ShowStoreRouter {
  #showStoreUseCase;

  constructor({
    showStoreUseCase,
  }: {
    showStoreUseCase: IShowStoreUseCase;
  }) {
    this.#showStoreUseCase = showStoreUseCase;
  }

  async validate(params: { subdomain: string }): Promise<{ isValid: boolean; error: object }> {
    try {
      const storeSchema = object({
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
      const subdomain = httpRequest.subdomain;
      const { isValid, error } = await this.validate({ subdomain });
      if (!isValid) return HttpResponse.badRequest(error);
      const result = await this.#showStoreUseCase.execute({ subdomain });
      return HttpResponse.ok(result);
    } catch (error) {
      logger.error('ShowStoreError', error);
      if (error instanceof Error)
        return HttpResponse.serverError(error.message);
      return HttpResponse.serverError('ShowStoreError');
    }
  }
}
