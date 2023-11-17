export default class LoginUseCase {
  constructor({ findUserRepository, bcryptHelper }) {
    this.findUserRepository = findUserRepository;
    this.bcryptHelper = bcryptHelper;
  }

  async execute(params) {
    const user = await this.findUserRepository.execute(params);
    if (!user) return false;
    const correctPass = await this.bcryptHelper.comparePassword(
      params.password,
      user.password,
    );
    if (!correctPass) return false;
    return true;
  }
}
