import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface XZXRequestInterceptors<T = AxiosResponse> {
  requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch: (error: any) => any
  responseInterceptor: (res: T) => T
  responseInterceptorCatch: (error: any) => any
}
export interface XZXrequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: XZXRequestInterceptors<T>
  showLoading?: boolean
}
