import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import codeceptjs from 'codeceptjs';
import _ from 'lodash';

const allure = codeceptjs.container.plugins('allure');

const LOCAL_HOST_BASE_URL = 'http://localhost:38391';

export default class HttpService {
  private readonly baseUrl: string;

  private instance: AxiosInstance;

  private latestResponse: AxiosResponse;

  constructor(baseUrl: string = LOCAL_HOST_BASE_URL) {
    this.baseUrl = baseUrl;
    this.instanceInit();
  }

  private instanceInit(): void {
    const requestDefaultConfig: AxiosRequestConfig = {
      baseURL: this.baseUrl,
      responseType: 'json',
      headers: {
        Accept: '*/*',
        Authorization: '<correctAuthorizationHash>',
        'Content-Type': 'application/json',
      },
    };

    this.instance = axios.create(requestDefaultConfig);
  }

  public get response(): AxiosResponse {
    return this.latestResponse;
  }

  public set response(response: AxiosResponse) {
    this.latestResponse = response;
  }

  public get token(): string {
    return this.instance.defaults.headers.Authorization;
  }

  public set token(token: string) {
    this.instance.defaults.headers.Authorization = token;
  }

  public get cookie(): string {
    return this.instance.defaults.headers.cookie;
  }

  public set cookie(cookie: string) {
    this.instance.defaults.headers.cookie = cookie;
  }

  public async get(url: string, config?: AxiosRequestConfig): Promise<void> {
    try {
      this.logHttpRequest('GET', url, config);
      this.response = await this.instance.get(url, config);
      this.logHttpResponse();
    } catch (error) {
      this.handleResponseError(error);
    }
  }

  public async delete(url: string, config?: AxiosRequestConfig): Promise<void> {
    try {
      this.logHttpRequest('DELETE', url, config);
      this.response = await this.instance.delete(url, config);
      this.logHttpResponse();
    } catch (error) {
      this.handleResponseError(error);
    }
  }

  public async head(url: string, config?: AxiosRequestConfig): Promise<void> {
    try {
      this.logHttpRequest('HEAD', url, config);
      this.response = await this.instance.head(url, config);
      this.logHttpResponse();
    } catch (error) {
      this.handleResponseError(error);
    }
  }

  public async options(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<void> {
    try {
      this.logHttpRequest('OPTIONS', url, config);
      this.response = await this.instance.options(url, config);
      this.logHttpResponse();
    } catch (error) {
      this.handleResponseError(error);
    }
  }

  public async post(
    url: string,
    data: string,
    config?: AxiosRequestConfig
  ): Promise<void> {
    try {
      this.logHttpRequest('POST', url, config);
      this.response = await this.instance.post(url, data, config);
      this.logHttpResponse();
    } catch (error) {
      this.handleResponseError(error);
    }
  }

  public async patch(
    url: string,
    data: string,
    config?: AxiosRequestConfig
  ): Promise<void> {
    try {
      this.logHttpRequest('PATCH', url, config);
      this.response = await this.instance.patch(url, data, config);
      this.logHttpResponse();
    } catch (error) {
      this.handleResponseError(error);
    }
  }

  public async put(
    url: string,
    data: string,
    config?: AxiosRequestConfig
  ): Promise<void> {
    try {
      this.logHttpRequest('PUT', url, config);
      this.response = await this.instance.put(url, data, config);
      this.logHttpResponse();
    } catch (error) {
      this.handleResponseError(error);
    }
  }

  private handleResponseError = (error: AxiosError): void => {
    if (error.response) {
      this.response = error.response;
    }
    throw error;
  };

  private logHttpRequest = (
    httpMethod: string,
    url: string,
    config?: AxiosRequestConfig,
    data?: string
  ): void => {
    const instanceDefaults: AxiosRequestConfig = this.instance.defaults;
    instanceDefaults.headers = _.omit(
      instanceDefaults.headers,
      'delete',
      'get',
      'head',
      'post',
      'put',
      'patch',
      'common'
    );
    allure.createStep(
      `When I send a ${httpMethod} request with url: <${url}>`,
      () => {
        if (config) {
          Object.assign(instanceDefaults, config);
        }
        if (data) {
          instanceDefaults.data = JSON.parse(data);
        }
        allure.addAttachment(
          'Request params',
          JSON.stringify(instanceDefaults, null, 4),
          'application/json'
        );
      }
    );
  };

  private logHttpResponse = (): void => {
    const purifiedResponse = _.omit(this.response, 'config', 'request');
    allure.createStep('Then I get the server response', () => {
      allure.addAttachment(
        'Response params',
        JSON.stringify(purifiedResponse, null, 4),
        'application/json'
      );
    });
  };
}
