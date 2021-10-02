import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import codeceptjs from 'codeceptjs';

const allure = codeceptjs.container.plugins('allure');

const LOCAL_HOST_BASE_URL = 'http://localhost:38391';

export default class HttpService {
  private readonly baseUrl: string;

  private requestInstance: AxiosInstance;

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

    this.requestInstance = axios.create(requestDefaultConfig);
  }

  public get response(): AxiosResponse {
    return this.latestResponse;
  }

  public set response(response: AxiosResponse) {
    this.latestResponse = response;
  }

  public get token(): string {
    return this.requestInstance.defaults.headers.Authorization;
  }

  public set token(token: string) {
    this.requestInstance.defaults.headers.Authorization = token;
  }

  public async get(url: string, config?: AxiosRequestConfig): Promise<void> {
    try {
      this.response = await this.requestInstance.get(url, config);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
