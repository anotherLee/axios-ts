import { AxiosRequestConfig } from './types'

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    },
  }
}

const methodNoData = ['get', 'delete', 'head', 'options']
methodNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodWithoutData = ['post', 'put', 'patch']

methodWithoutData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
