import axios, { AxiosError, AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';
import HttpService from '../utils/HttpService';

jest.mock('axios');
mocked(axios.create).mockImplementation(() => axios);
const mockedAxios = axios as jest.Mocked<typeof axios>;

const httpService = new HttpService('https://doodle.bom');

describe('HTTP Service client', () => {
  test('GET should perform the request and receive a list of clients', async () => {
    const mockedServerResponse: AxiosResponse = {
      status: 200,
      statusText: 'SUCCESS',
      data: [
        { clientId: 123, name: 'Alex', age: 37 },
        { clientId: 321, name: 'Ben', age: 52 },
        { clientId: 432, name: 'Jon', age: 24 },
      ],
      config: {},
      headers: {},
    };
    mockedAxios.get.mockResolvedValue(mockedServerResponse);
    await httpService.get('/clients');

    expect(httpService.response.status).toBe(200);
    expect(httpService.response.statusText).toBe('SUCCESS');
    expect(httpService.response.data.length).toBe(3);
    expect(httpService.response.data).toEqual(mockedServerResponse.data);
  });
  test('should throw Error if receive error status', async () => {
    const mockedErrorServerResponse: AxiosError = {
      code: '505',
      message: 'ERROR: HTTP Version Not Supported',
      response: {
        status: 505,
        statusText: 'HTTP Version Not Supported',
        data: {},
        config: {},
        headers: {},
      },
      config: {},
      name: '',
      stack: '',
      isAxiosError: true,
      toJSON(): object {
        return {};
      },
    };

    mockedAxios.get.mockRejectedValue(mockedErrorServerResponse);

    await expect(async () =>
      httpService.get('/error505')
    ).rejects.toHaveProperty('code', '505');
    expect(httpService.response).not.toBeUndefined();
    expect(httpService.response.status).toBe(505);
    expect(httpService.response.statusText).toBe('HTTP Version Not Supported');
  });
});
