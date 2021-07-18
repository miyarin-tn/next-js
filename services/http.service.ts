import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class HttpService {
  private axios: AxiosInstance = axios.create();

  constructor() {}

  public get<T>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axios.get<T>(url, options);
  }

  public post<T>(
    url: string,
    payload?: any,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axios.post<T>(url, payload, options);
  }

  public patch<T>(
    url: string,
    payload?: any,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axios.patch<T>(url, payload, options);
  }

  public put<T>(
    url: string,
    payload?: any,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axios.put<T>(url, payload, options);
  }

  public delete<T>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axios.delete<T>(url, options);
  }
}
