import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { url, method = 'get', params = null, data = null, headers } = config;

  const request = new XMLHttpRequest();
  request.open(method.toUpperCase(), url, true);

  // 注意setRequestHeader的位置
  Object.keys(headers).forEach((name: string): void => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name];
    } else {
      request.setRequestHeader(name, headers[name]);
    }
  })

  request.send(data);
}
