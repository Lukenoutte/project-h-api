export default class AlreadyExistsError extends Error {
  constructor() {
    super("AlreadyExists");
    this.name = "AlreadyExistsError";
  }
}
