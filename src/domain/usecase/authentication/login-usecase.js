export default class LoginUseCase {
  constructor({ findUserRepository, bcryptHelper, UnauthorizedError, jwtHelper }) {
    this.findUserRepository = findUserRepository;
    this.bcryptHelper = bcryptHelper;
    this.UnauthorizedError = UnauthorizedError;
    this.jwtHelper = jwtHelper;
  }

  async execute(params) {
    const userOnDatabase = await this.findUserRepository.execute(params);
    if (!userOnDatabase) throw new this.UnauthorizedError();
    const isPassCorrect = await this.bcryptHelper.comparePassword(
      params.password,
      userOnDatabase.password,
    );
    if (!isPassCorrect) throw new this.UnauthorizedError();
    return this.jwtHelper.generateToken(userOnDatabase);
  }
}
