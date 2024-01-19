import { string, object } from 'yup';
import logger from 'main/configs/logger';
import HttpResponse from '../../helpers/http-response';
import {
  IShowUserUseCase,
  ISignUpUserUseCase,
} from 'domain/usecases/@interfaces/users-usecases.interfaces';
import { IHttpResponse } from 'presentation/helpers/@interfaces/helper.interfaces';
import { IRequest } from '../@interfaces/router.interfaces';

interface IShowUserParams {
  userId: string;
}

export default class ShowMasterRouter {
  #showUserUseCase;

  constructor({ showUserUseCase }: { showUserUseCase: IShowUserUseCase }) {
    this.#showUserUseCase = showUserUseCase;
  }

  async validate(
    params: IShowUserParams
  ): Promise<{ isValid: boolean; error: object }> {
    try {
      const userSchema = object({
        userId: string().required(),
      });
      await userSchema.validate(params);
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
      const body = { userId: httpRequest.userId };
      const { isValid, error } = await this.validate(body);
      if (!isValid) return HttpResponse.badRequest(error);
      const user = await this.#showUserUseCase.execute(body);
      return HttpResponse.ok(user);
    } catch (error) {
      logger.error('ShowUserError', error);
      if (error instanceof Error) {
        if (error.name === 'AlreadyExistsError')
          return HttpResponse.conflict(error);
        return HttpResponse.serverError(error.message);
      }
      return HttpResponse.serverError('ShowUserError');
    }
  }
}
