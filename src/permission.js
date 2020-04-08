import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({
  showSpinner: false
})

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  next()
  const routerLength = store.getters.routerLength
  console.log('routerLength:', routerLength)
  // 解决这里请求router接口请求两遍问题
  if (routerLength) { // 正常走
    next()
    return
  } {
    // 添加路由
    const accessRoutes = await store.dispatch('permission/generateRoutes')
    console.log('accessRoutes:', accessRoutes)
    router.addRoutes(accessRoutes)
  }
})

router.afterEach(() => {
  NProgress.done()
})
