import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(function(resolve, reject) {
    const { url, method = 'get', params = null, data = null, headers, responseType } = config

    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    request.open(method.toUpperCase(), url, true)

    // 注意setRequestHeader的位置
    Object.keys(headers).forEach((name: string): void => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    /**
     * 监听请求的返回,只有当reayState为4的时候，才返回结果
     */
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders()) // 将headers的字符串转换为对象
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

    request.send(data)
  })
}
