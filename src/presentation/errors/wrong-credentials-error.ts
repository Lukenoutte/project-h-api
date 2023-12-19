export default class WrongCredentialsError extends Error {
  constructor() {
    super("WrongCredentials");
    this.name = "WrongCredentialsError";
  }
}
