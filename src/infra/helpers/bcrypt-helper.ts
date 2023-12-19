import bcrypt from "bcrypt";
import { IBcryptHelper } from "./@interfaces/helper.interfaces";

export default class BcryptHelper implements IBcryptHelper{
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
