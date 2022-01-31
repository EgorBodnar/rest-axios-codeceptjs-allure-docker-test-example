import HttpService from '../utils/HttpService';
import expect from 'expect';

import { Credentials } from '../models/auth/Credentials';
import { Token } from '../models/auth/Token';

export class LoginService extends HttpService {
  private readonly path = '/api/login';

  public requestGetToken = async (user: Credentials): Promise<void> => {
    const body = JSON.stringify(user);
    await this.post(this.path, body);
  };

  public getToken = async (user: Credentials): Promise<Token> => {
    await this.requestGetToken(user);

    expect(this.response.status).toBe(200);
    expect(this.response.data).not.toBeUndefined();

    return this.response.data;
  };
}
