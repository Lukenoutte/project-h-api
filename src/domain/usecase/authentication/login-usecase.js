export default class LoginUseCase {
  constructor({ findUserRepository, bcryptHelper, UnauthorizedError }) {
    this.findUserRepository = findUserRepository;
    this.bcryptHelper = bcryptHelper;
    this.UnauthorizedError = UnauthorizedError;
  }

  async execute(params) {
    const userOnDatabase = await this.findUserRepository.execute(params);
    if (!userOnDatabase) throw new this.UnauthorizedError();
    const correctPass = await this.bcryptHelper.comparePassword(
      params.password,
      userOnDatabase.password,
    );
    if (!correctPass) throw new this.UnauthorizedError();
  }
}
