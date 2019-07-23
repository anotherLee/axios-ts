import { ResolvedFn, RejectedFn } from '../types'

// 只给当前类使用
interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> {
  private interceptors: (Interceptor<T> | null)[]
  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  /**
   * 内部遍历拦截器
   * @param {(interceptor: Interceptor<T>) => void} fn
   */
  forEach(fn: (interceptor: Interceptor<T>) => void) {
    this.interceptors.forEach((i: Interceptor<T> | null): void => {
      if (i !== null) {
        fn(i)
      }
    })
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
