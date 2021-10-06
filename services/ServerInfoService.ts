import HttpService from '../utils/HttpService';

export class ServerInfoService extends HttpService {
  private readonly path = '/api/serverInfo';

  public requestGetServerInfo = async (): Promise<void> => {
    await this.get(this.path);
  };
}
