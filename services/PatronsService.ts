import HttpService from '../utils/HttpService';
import { Patron } from '../models/Patron';

export class PatronsService extends HttpService {
  private readonly path = '/patrons';

  public requestPatrons = async (): Promise<void> => {
    await this.get(this.path);
  };

  public getPatrons = async (): Promise<Patron[]> => {
    await this.requestPatrons();
    return this.response.data.patrons;
  };
}
