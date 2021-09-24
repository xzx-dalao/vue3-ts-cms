import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { XZXRequestInterceptors, XZXrequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/components/loading/src/loading.type'

const DEAFULT_LOADING = true
class XZXrequest {
  instance: AxiosInstance
  interceptors?: XZXRequestInterceptors
  loading?: ILoadingInstance
  showLoading: boolean
  constructor(config: XZXrequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.showLoading = config.showLoading ?? DEAFULT_LOADING //默认显示loading
    this.interceptors = config.interceptors
    //每一个实例的拦截
    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 默认所有实例的全局拦截
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据中。。。。'
          })
        }

        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        //移除loading
        this.loading?.close()
        const data = res.data
        if (data.returnCode === '-1001') {
          // console.log('请求失败~, 错误信息')
        } else {
          return data
        }
      },
      (err) => {
        this.loading?.close()
        return err
      }
    )
  }
  // 1.单个请求的拦截处理
  request<T>(config: XZXrequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showLoading === false) {
        this.showLoading = false
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          this.showLoading = DEAFULT_LOADING

          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEAFULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: XZXrequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: XZXrequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: XZXrequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: XZXrequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default XZXrequest
