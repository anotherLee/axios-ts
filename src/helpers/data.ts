import { isPlainObject } from './util'

/**
 * 将普通对象转换成JSON字符串
 * @param data
 * @returns {any}
 */
export function transformRequest(data: any) {
  if (isPlainObject(data)) {
    return JSON.stringify(data);
  }
  return data;
}
