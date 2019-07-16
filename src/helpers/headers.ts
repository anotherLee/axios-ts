import { isPlainObject } from './util'

/**
 * 改写headers中指定的key可能出现的大小写不一致
 * @param headers
 * @param {string} nomalizedName
 */
function normalizeHeaderName(headers: any, nomalizedName: string): void {
  if (!headers) return
  Object.keys(headers).forEach((name: string): void => {
    if (name !== nomalizedName && name.toUpperCase() === nomalizedName.toUpperCase()) {
      headers[nomalizedName] = headers[name]
      delete headers[name]
    }
  })
}

/**
 * 处理headers，如果data为普通对象且headers里没有Content-Type，添加一个
 * @param headers
 * @param data
 * @returns {any}
 */
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=uft-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string): any {
  let parsed: any = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach((line: string): void => {
    let [key, value] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    if (value) {
      value = value.trim().toLowerCase()
    }
    parsed[key] = value
  })

  return parsed
}
