import axios from 'axios'
import { userUserStore } from '@/stores/index.js'
import { ElMessage } from 'element-plus'
import router from '@/router/index.js'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const userStore = userUserStore()

    if (userStore.token) {
      // 设置请求头
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据
    if (res.data.code === 0) {
      return res
    }
    // 处理失败,给错误提示，抛出问题
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    // TODO 5. 处理401错误
    // 权限不足 token过期，拦截到登录
    if (err.response.status === 401) {
      router.push('/login')
    }

    // 错误默认情况，给出提示
    ElMessage.error(err.response.data.message || '服务异常')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
