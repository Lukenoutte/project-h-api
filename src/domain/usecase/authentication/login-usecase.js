export default class LoginUseCase {
  constructor({
    findUserRepository,
    bcryptHelper,
    unauthorizedError,
    jwtHelper,
  }) {
    this.findUserRepository = findUserRepository;
    this.bcryptHelper = bcryptHelper;
    this.unauthorizedError = unauthorizedError;
    this.jwtHelper = jwtHelper;
  }

  async execute(params) {
    const userOnDatabase = await this.findUserRepository.execute(params);
    if (!userOnDatabase) throw this.unauthorizedError;
    const isPassCorrect = await this.bcryptHelper.comparePassword(
      params.password,
      userOnDatabase.password,
    );
    if (!isPassCorrect) throw this.unauthorizedError;
    return this.jwtHelper.generateToken(userOnDatabase);
  }
}
