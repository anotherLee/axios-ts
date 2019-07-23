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
  console.log('response: ', response)
  if (isJSON(response)) {
    response = JSON.parse(response)
  }
  console.log('处理过的返回:', response)
  return response
}

/**
 * 判断是否是JSON字符串
 * @param {string} str
 * @returns {boolean}
 */
function isJSON(str: any): boolean {
  if (typeof str === 'string') {
    try {
      JSON.parse(str)
      return true
    } catch (e) {
      return false
    }
  }
  return false
}
