import HttpService from '../utils/HttpService';

export class SimpleEndpointService extends HttpService {
  private readonly path = '/simpleEndpoint';

  public requestSimpleEndpoint = async (): Promise<void> => {
    await this.get(this.path);
  };
}
