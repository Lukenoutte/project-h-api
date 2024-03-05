import ShowUserStoreUseCase from 'domain/usecases/users/show-user-store-usecase';
import FindUserRepository from 'infra/repositories/users/find-user-repository';
import FindStoreByIdRepository from 'infra/repositories/stores/find-store-by-id-repository';
import ShowUserStoreRouter from 'presentation/routers/users/show-user-store-router';
import { InvalidStoreError } from 'presentation/errors';

export default class ShowUserRouterComposer {
  static compose() {
    const findUserRepository = new FindUserRepository();
    const findStoreByIdRepository = new FindStoreByIdRepository();
    const invalidStoreError = new InvalidStoreError();
    const showUserStoreUseCase = new ShowUserStoreUseCase({
      findUserRepository,
      findStoreByIdRepository,
      invalidStoreError
    });
    return new ShowUserStoreRouter({ showUserStoreUseCase });
  }
}
