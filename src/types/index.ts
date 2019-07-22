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
export interface AxiosResponse<T = any> {
  data: T // 返回的数据
  status: number // 状态码
  statusText: string // 状态提示
  headers: any // 响应头
  config: AxiosRequestConfig // 请求的config
  request: any // 请求实例
}

// 返回Promise泛型类
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

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
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T>(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T>(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T>(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

// axios混合对象实例，包含重载
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

// 拦截器管理类对外接口
export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected: RejectedFn): number
  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}
export interface RejectedFn {
  (error: any): any
}
