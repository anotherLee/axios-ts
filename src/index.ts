import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders} from './helpers/headers'

/**
 * 用户使用的axios方法
 * @param {AxiosRequestConfig} config axios配置
 */
function axios(config: AxiosRequestConfig): void {
  processConfig(config);
  xhr(config)
}

/**
 * 处理用户传过来的配置
 * @param {AxiosRequestConfig} config
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
  config.headers = transformHeaders(config); // headers的处理必须写到data处理之前，因为后续data可能会被处理成JSON字符串
  config.data = transformRequestData(config);
}

/**
 * 使用buildURL来处理url
 * @param {AxiosRequestConfig} config
 * @returns {string} 处理过后的url
 */
function transformURL(config: AxiosRequestConfig): string {
  let { url, params } = config;
  return buildURL(url, params);
}

/**
 * 用transformRequest来处理body(只对普通对象进行处理)
 * @param {AxiosRequestConfig} config
 * @returns {any} 处理过后的data
 */
function transformRequestData(config: AxiosRequestConfig): any {
  let { data } = config;
  return transformRequest(data);
}

/**
 * 处理headers
 * @param {AxiosRequestConfig} config
 * @returns {any} 处理过后的headers
 */
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers={}, data } = config; // 这里注意headers的默认值，在不传headers的情况下，如果data传了普通类型的对象也要加Content-Type
  return processHeaders(headers, data);
}

export default axios