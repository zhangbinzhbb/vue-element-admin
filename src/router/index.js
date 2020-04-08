import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 获取组件的方法
const _import = require('./_import_' + process.env.NODE_ENV)

/* Layout */
import Layout from '@/layout'

export const routerMap = {
  Layout: Layout,
  // 项目菜单影射
  MyProject: _import('myProject/index')
}

// 提示

/**
 * 1、当你的路由图太长时，你可以把它分成几个小模块 modules 文件夹设置
 * 2、具体规则看文档
 * 3、login 页面看项目具体情况、默认有登录页面
**/

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/163/163',
    hidden: true
  }
]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
