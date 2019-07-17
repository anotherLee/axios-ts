import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstance(): AxiosInstance {
  const context = new Axios()
  // 这里使用bind基于Axios.prototype.request创建了一个新的函数，而且在新函数里，this为context
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}

let axios: AxiosInstance = createInstance()

export default axios
