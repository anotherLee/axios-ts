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

export interface AxiosRequestConfig {
  url: string
  method?: Method
  params?: any
  data?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType // 只有固定的那几种类型
  timeout?: number
}

export interface AxiosResponse {
  data: any // 返回的数据
  status: number // 状态码
  statusText: string // 状态提示
  headers: any // 响应头
  config: AxiosRequestConfig // 请求的config
  request: any // 请求实例
}

export interface AxiosPromise extends Promise<AxiosResponse> {}
