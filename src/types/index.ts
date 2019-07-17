export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

// 配置类型
export interface AxiosRequestConfig {
  url?: string // 将axios写作混合对象时改成可选参数
  method?: Method
  params?: any
  data?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType // 只有固定的那几种类型
  timeout?: number
}

// 返回类型
export interface AxiosResponse {
  data: any // 返回的数据
  status: number // 状态码
  statusText: string // 状态提示
  headers: any // 响应头
  config: AxiosRequestConfig // 请求的config
  request: any // 请求实例
}

// 返回Promise泛型类
export interface AxiosPromise extends Promise<AxiosResponse> {}

// 新的错误类型，目前还没用
export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

// Axios接口，内含所有的属性方法
export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise
  get(url: string, config?: AxiosRequestConfig): AxiosPromise
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise
  head(url: string, config?: AxiosRequestConfig): AxiosPromise
  options(url: string, config?: AxiosRequestConfig): AxiosPromise
  post(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise
  put(url: string, data: any, config?: AxiosRequestConfig): AxiosRequestConfig
  patch(url: string, data: any, config?: AxiosRequestConfig): AxiosRequestConfig
}

// axios混合对象实例，包含重载
export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
  (url: string, config?: AxiosRequestConfig): AxiosPromise
}
