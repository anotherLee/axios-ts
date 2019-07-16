import { AxiosRequestConfig, AxiosResponse } from '../types'

/**
 * AxiosError类
 */
export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

/**
 * 创建AxiosError实例的工厂函数
 * @param {string} message
 * @param {AxiosRequestConfig} config
 * @param {string | null} code
 * @param request
 * @param {AxiosResponse} response
 * @returns {AxiosError}
 */
export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
) {
  return new AxiosError(message, config, code, request, response)
}
