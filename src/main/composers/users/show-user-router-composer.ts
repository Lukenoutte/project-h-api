import ShowUserUseCase from 'domain/usecases/users/show-user-usecase';
import FindUserRepository from 'infra/repositories/users/find-user-repository';
import ShowUserRouter from 'presentation/routers/users/show-user-router';

export default class ShowUserRouterComposer {
  static compose() {
    const findUserRepository = new FindUserRepository();
    const showUserUseCase = new ShowUserUseCase({
      findUserRepository,
    });
    return new ShowUserRouter({ showUserUseCase });
  }
}
