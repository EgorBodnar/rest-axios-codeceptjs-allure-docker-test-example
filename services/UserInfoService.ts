import HttpService from '../utils/HttpService';

export class UserInfoService extends HttpService {
  private readonly path = '/api/userInfo';

  public requestGetUserInfo = async (): Promise<void> => {
    await this.get(this.path);
  };
}
