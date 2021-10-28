import axios, { AxiosError, AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';
import HttpService from '../utils/HttpService';

jest.mock('axios');
mocked(axios.create).mockImplementation(() => axios);
const mockedAxios = axios as jest.Mocked<typeof axios>;

const httpService = new HttpService('https://doodle.bom');

/* Mocking private reporting methods to skit it */
jest.spyOn(httpService as any, 'logHttpRequest').mockImplementation(() => true);
jest
  .spyOn(httpService as any, 'logHttpResponse')
  .mockImplementation(() => true);

describe('HTTP Service client', () => {
  test('GET should perform the request and receive a list of clients', async () => {
    const serverResponse: AxiosResponse = {
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
    mockedAxios.get.mockResolvedValue(serverResponse);
    await httpService.get('/clients');

    expect(httpService.response.status).toBe(200);
    expect(httpService.response.statusText).toBe('SUCCESS');
    expect(httpService.response.data.length).toBe(3);
    expect(httpService.response.data).toEqual(serverResponse.data);
  });

  test('POST should perform the request and create a client', async () => {
    const serverResponse: AxiosResponse = {
      status: 201,
      statusText: 'CREATED',
      data: { clientId: 678 },
      config: {},
      headers: {},
    };
    mockedAxios.post.mockResolvedValue(serverResponse);
    await httpService.post(
      '/client',
      '{"clientId":678, "name":"Tom", "age":32}'
    );

    expect(httpService.response.status).toBe(201);
    expect(httpService.response.statusText).toBe('CREATED');
    expect(httpService.response.data).not.toBeUndefined();
    expect(httpService.response.data.clientId).toEqual(678);
  });

  test('DELETE should perform the request and delete a client', async () => {
    const serverResponse: AxiosResponse = {
      status: 200,
      statusText: 'User was deleted by id 734',
      data: { deleted: true },
      config: {},
      headers: {},
    };
    mockedAxios.delete.mockResolvedValue(serverResponse);
    await httpService.delete('/client?clientId=734');

    expect(httpService.response.status).toBe(200);
    expect(httpService.response.statusText).toEqual(
      'User was deleted by id 734'
    );
    expect(httpService.response.data).not.toBeUndefined();
    expect(httpService.response.data.deleted).toBeTruthy();
  });

  test('PUT should perform the request and update a client', async () => {
    const serverResponse: AxiosResponse = {
      status: 200,
      statusText: 'UPDATED',
      data: { clientId: 678 },
      config: {},
      headers: {},
    };
    mockedAxios.put.mockResolvedValue(serverResponse);
    await httpService.put(
      '/client',
      '{"clientId":678, "name":"Billy", "age":52}'
    );

    expect(httpService.response.status).toBe(200);
    expect(httpService.response.statusText).toBe('UPDATED');
    expect(httpService.response.data).not.toBeUndefined();
    expect(httpService.response.data.clientId).toEqual(678);
  });

  test('PATCH should perform the request and update a client field', async () => {
    const serverResponse: AxiosResponse = {
      status: 200,
      statusText: 'UPDATED',
      data: { clientId: 678 },
      config: {},
      headers: {},
    };
    mockedAxios.patch.mockResolvedValue(serverResponse);
    await httpService.patch('/client?clientId=678', '{"name":"Boris"}');

    expect(httpService.response.status).toBe(200);
    expect(httpService.response.statusText).toBe('UPDATED');
    expect(httpService.response.data).not.toBeUndefined();
    expect(httpService.response.data.clientId).toEqual(678);
  });

  test('OPTIONS should perform the request and receive HTTP methods support', async () => {
    const serverResponse: AxiosResponse = {
      status: 200,
      statusText: 'OK',
      data: undefined,
      config: {},
      headers: {
        Allow: 'GET,HEAD,POST,DELETE, OPTIONS',
        Date: 'Wed, 08 March 2022 13:00:03 GMT',
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': 0,
      },
    };
    mockedAxios.options.mockResolvedValue(serverResponse);
    await httpService.options('/client');

    expect(httpService.response.status).toBe(200);
    expect(httpService.response.statusText).toBe('OK');
    expect(httpService.response.data).toBeUndefined();
    expect(httpService.response.headers.Allow).toEqual(
      'GET,HEAD,POST,DELETE, OPTIONS'
    );
    expect(httpService.response.headers.Date).toEqual(
      'Wed, 08 March 2022 13:00:03 GMT'
    );
    expect(httpService.response.headers['Content-Type']).toEqual(
      'application/json; charset=UTF-8'
    );
    expect(httpService.response.headers['Content-Length']).toEqual(0);
  });

  test('HEAD should perform the request and receive resource has changed info, cached version of a resource', async () => {
    const serverResponse: AxiosResponse = {
      status: 200,
      statusText: 'OK',
      data: undefined,
      config: {},
      headers: {
        Date: 'Wed, 08 March 2022 13:00:03 GMT',
        ETag: '1232ask3-weft1-234few-23r23',
        'Last-Modified': 'Wed, 01 May 2022 15:00:00 GMT',
        'Accept-Ranges': 'bytes',
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': 1024,
      },
    };
    mockedAxios.head.mockResolvedValue(serverResponse);
    await httpService.head('/client');

    expect(httpService.response.status).toBe(200);
    expect(httpService.response.statusText).toBe('OK');
    expect(httpService.response.data).toBeUndefined();
    expect(httpService.response.headers).toEqual(serverResponse.headers);
  });

  test('should throw Error and save response if receive error status', async () => {
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

  test('should save token value as default to Authorization header', async () => {
    const tokenValue = 'valid_token';

    const httpServiceWithToken = new HttpService('https://dongle.com');
    const spyGetToken = jest.spyOn(httpServiceWithToken, 'token', 'get');
    const spySetToken = jest.spyOn(httpServiceWithToken, 'token', 'set');

    httpServiceWithToken.token = tokenValue;

    expect(spySetToken).toHaveBeenCalledTimes(1);
    expect(spyGetToken).toHaveBeenCalledTimes(0);
    expect(httpServiceWithToken.token).toEqual(tokenValue);
    expect(spyGetToken).toHaveBeenCalledTimes(1);
    expect(spySetToken).toHaveBeenCalledTimes(1);
  });

  test('should save cookie value as default to the cookie header', async () => {
    const cookieValue = 'valid_token';

    const httpServiceWithCookie = new HttpService('https://dongle.com');
    const spyGetCookie = jest.spyOn(httpServiceWithCookie, 'cookie', 'get');
    const spySetCookie = jest.spyOn(httpServiceWithCookie, 'cookie', 'set');

    httpServiceWithCookie.cookie = cookieValue;

    expect(spySetCookie).toHaveBeenCalled();
    expect(spyGetCookie).toHaveBeenCalledTimes(0);
    expect(httpServiceWithCookie.cookie).toEqual(cookieValue);
    expect(spyGetCookie).toHaveBeenCalledTimes(1);
    expect(spySetCookie).toHaveBeenCalledTimes(1);
  });
});
