import axios from "../../src/index"
import { AxiosError } from '../../src/helpers/error'

// 模拟404错误
axios({
  method: 'get',
  url: '/error/get1'
}).then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e)
  console.log(e.message)
  console.log(e.config)
})


axios({
  method: 'get',
  url: '/error/get'
}).then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e)
  console.log(e.message)
})

// 模拟网络错误，setTimeout执行以后将浏览器置为offline就可以模拟出来
setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then((res) => {
    console.log(res)
  }).catch((e: AxiosError) => {
    console.log(e)
    console.log(e.message)
  })
}, 5000)

// 超时错误
axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e)
  console.log(e.message)
})
