import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

// 仓库统一导出
// import { userUserStore } from '@/stores/modules/user.js'
// export { userUserStore }

export * from '@/stores/modules/user.js' // 接收userUserStore中的所有按需导出
