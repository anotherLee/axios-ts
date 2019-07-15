import { isDate, isPlainObject } from "./util"

/**
 * 判断字符串里有没有#，如果有只留前面的
 * @param {string} str
 * @returns {string}
 */
function excludeMark(str: string): string {
  let index = str.indexOf("#");
  if (index !== -1) {
    return str.slice(0, index);
  }
  return str;
}

/**
 * 使用encodeURIComponent编码，但是@:$,[]不用，空格用+表示
 * @param {string} val
 * @returns {string}
 */
function encode(val: string): string {
  return encodeURIComponent(val).replace(/%40/g, '@')
    .replace(/%3A/g, ':')
    .replace(/%24/ig, '$')
    .replace(/%2C/ig, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/ig, '[')
    .replace(/%5D/ig, ']')
}

/**
 * 根据各种情况将params拼接到url上作为查询参数
 * @param {string} url 用户写的url
 * @param params 用户写的params
 * @returns {string}
 */
export function buildURL(url: string, params?: any): string {
  // 如果没有params，直接返回url
  if (!params) {
    return url;
  }

  const parts: string[] = [];

  Object.keys(params).forEach((key: string): void => {
    let val: any = params[key];
    // 如果键值对里有值为null、undefined的直接舍弃
    if (val === null || typeof val === 'undefined') {
      return
    }
    // 如果是数组将key处理成key[]，并将val统一转成数组以
    let values: any[] = [];
    if (Array.isArray(val)) {
      key += '[]';
      values = val;
    } else {
      values = [val];
    }
    values.forEach((val: any): void => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val);
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join("&");
  if (serializedParams) {
    url = excludeMark(url);
    url += (url.indexOf('?') === -1 ? '?': '&') + serializedParams; // 这里是为了拼接getData/abc?a=a拼接的例子
  }
  return url;
}
