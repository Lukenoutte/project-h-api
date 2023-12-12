import bcrypt from "bcrypt";
import { IBcryptHelper } from "./interfaces/bcrypt-helper.interface";

export default class BcryptHelper implements IBcryptHelper{
  async hashPassword(password: string) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(plainPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
