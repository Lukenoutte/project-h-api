import SignUpUserUseCase from 'domain/usecases/users/signup-user-usecase';
import SignUpUserRouter from 'presentation/routers/users/signup-master-router';
import SignUpUserRepository from 'infra/repositories/users/signup-user-repository';
import BcryptHelper from 'infra/helpers/bcrypt-helper';
import FindUserRepository from 'infra/repositories/users/find-user-repository';
import { AlreadyExistsError } from 'presentation/errors';

export default class SignUpUserRouterComposer {
  static compose() {
    const bcryptHelper = new BcryptHelper();
    const findUserRepository = new FindUserRepository();
    const alreadyExistsError = new AlreadyExistsError();
    const signUpUserUseCase = new SignUpUserUseCase({
      signUpUserRepository: new SignUpUserRepository(),
      bcryptHelper,
      findUserRepository,
      alreadyExistsError,
    });
    return new SignUpUserRouter({ signUpUserUseCase });
  }
}
