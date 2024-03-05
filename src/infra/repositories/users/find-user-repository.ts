import PostgreHelper from 'infra/helpers/postgre-helper';
import CamelCaseHelper from 'infra/helpers/camel-case-helper'
import {
  IFindUserRepository,
} from '../@interfaces/users-respository.interfaces';
import { IUser } from 'domain/entities/@interfaces/user-entity.interfaces';

export default class FindUserRepository implements IFindUserRepository {
  async execute({
    email,
    userId,
  }: {
    email: string;
    userId: string;
  }): Promise<IUser> {
    let query: string = '';
    let queryParams: any[] = [];
    if (email) {
      query = 'SELECT * FROM users WHERE email = $1;';
      queryParams = [email];
    } else if (userId) {
      query = 'SELECT * FROM users WHERE id = $1;';
      queryParams = [userId];
    }
    const { rows } = await PostgreHelper.executeQuery(query, queryParams);
    const camelCaseHelper = new CamelCaseHelper()
    const [ firstItem ] = rows
    return camelCaseHelper.convert(firstItem);
  }
}
