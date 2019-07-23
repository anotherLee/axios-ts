import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  RejectedFn,
  ResolvedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './InterceptorManager'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

export default class Axios {
  interceptors: Interceptors

  constructor() {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  /**
   * request配置所有参数, 重载方法
   * @param {AxiosRequestConfig} config
   * @returns {AxiosPromise}
   */
  request(config: AxiosRequestConfig): AxiosPromise
  request(url: string, config?: AxiosRequestConfig): AxiosPromise
  request(url: any, config?: any) {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url // 注意这里
    }

    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)
    while (chain.length) {
      let { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }

  /**
   * 内部辅助方法，帮助那些不需要加data:{}的方法
   * @param {string} url
   * @param {string} method
   * @param {AxiosRequestConfig} config
   * @returns {AxiosPromise}
   * @private
   */
  _requestMethodWithoutData(
    url: string,
    method: Method,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        url,
        method
      })
    )
  }

  /**
   * 辅助函数，帮助带data: {}的方法
   * @param {string} url
   * @param {Method} method
   * @param {AxiosRequestConfig} config
   * @param data
   * @returns {AxiosPromise}
   * @private
   */
  _requestMethodWithData(
    url: string,
    method: Method,
    config?: AxiosRequestConfig,
    data?: any
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        url,
        method,
        data
      })
    )
  }

  /**
   * get方法简写
   * @param {string} url
   * @param {AxiosRequestConfig} config
   * @returns {AxiosPromise}
   */
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData(url, 'get', config)
  }

  /**
   * delete方法简写
   * @param {string} url
   * @param {AxiosRequestConfig} config
   * @returns {AxiosPromise}
   */
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData(url, 'delete', config)
  }

  /**
   * options方法简写
   * @param {string} url
   * @param {AxiosRequestConfig} config
   * @returns {AxiosPromise}
   */
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData(url, 'options', config)
  }

  /**
   * head方法简写
   * @param {string} url
   * @param {AxiosRequestConfig} config
   * @returns {AxiosPromise}
   */
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData(url, 'head', config)
  }

  /**
   * post方法简写
   * @param {string} url
   * @param {AxiosRequestConfig} config
   * @param data
   * @returns {AxiosPromise}
   */
  post(url: string, config?: AxiosRequestConfig, data?: any): AxiosPromise {
    return this._requestMethodWithData(url, 'post', config, data)
  }

  /**
   * put方法简写
   * @param {string} url
   * @param {AxiosRequestConfig} config
   * @param data
   * @returns {AxiosPromise}
   */
  put(url: string, config?: AxiosRequestConfig, data?: any): AxiosPromise {
    return this._requestMethodWithData(url, 'put', config, data)
  }

  /**
   * patch方法简写
   * @param {string} url
   * @param {AxiosRequestConfig} config
   * @param data
   * @returns {AxiosPromise}
   */
  patch(url: string, config?: AxiosRequestConfig, data?: any): AxiosPromise {
    return this._requestMethodWithData(url, 'patch', config, data)
  }
}
