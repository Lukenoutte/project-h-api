export default class LoginUseCase {
  constructor({ findUserRepository }) {
    this.findUserRepository = findUserRepository;
  }

  execute(params) {
    const userExist = this.findUserRepository.execute(params);
    if (!userExist) return false;
    return userExist;
  }
}
