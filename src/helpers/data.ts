import { isPlainObject } from './util'

/**
 * 将普通对象转换成JSON字符串
 * @param data
 * @returns {any}
 */
export function transformRequest(data: any) {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

/**
 * @param response 请求拿到的数据
 * @returns {any}
 */
export function transformResponse(response: any): any {
  if (response && typeof response === 'string') {
    response = JSON.parse(response)
  }
  return response
}
