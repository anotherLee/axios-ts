import { AxiosRequestConfig } from '../types'

const strats = Object.create(null)

function defaultStrat(value1: any, value2: any) : any{
  return typeof value2 !== 'undefined' ? value2 : value1
}

function fromValue2Strat(value1: any, value2: any) : any{
  if (typeof value2 !== 'undefined') {
    return value2
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data']
stratKeysFromVal2.forEach(key => {
  strats[key] = fromValue2Strat
})


export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string) {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
