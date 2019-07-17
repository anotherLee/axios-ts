// 缓存toString方法借类型判断方法使用
const toString = Object.prototype.toString

// 判断是否是日期类型
export function isDate(value: any): value is Date {
  return Object.prototype.toString.call(value) === '[object Date]'
}

// 判断是否是对象，FormData，Blob也是true
// export function isObject(value: any): value is Object{
//   return value !== null && typeof value === 'object';
// }

// 判断是否是普通对象
export function isPlainObject(value: any): value is Object {
  return toString.call(value) === '[object Object]'
}

// 通过交叉类型
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any // 括号开头避免编译成一行后当成函数执行所以加;
  }
  return to as T & U
}
