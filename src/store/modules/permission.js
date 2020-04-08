import { constantRoutes, routerMap } from '@/router'
import { mockData } from '../../../mock/yh/index'

// 将本地routerMap映射到ajax获取到的serverRouterMap;
function generateAsyncRouter(routerMap, serverRouterMap) {
  serverRouterMap.forEach((item, index) => {
    item.component = routerMap[item.component]
    if (item.children && item.children.length > 0) {
      generateAsyncRouter(routerMap, item.children)
    }
  })
  return serverRouterMap
}

const state = {
  routes: [],
  addRoutes: [],
  routerLength: 0
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  ROUTER_LEN: (state, len) => {
    state.routerLength = len
  }
}

const actions = {
  generateRoutes({
    commit
  }, roles) {
    return new Promise(resolve => {
      // actions中GenerateRoutes方法合适的地方将后端请求的路由表映射到routerMap,
      // 并筛选出可访问的路由,serverRouterMap是我定义的从后台请求路由表的方法
      setTimeout(() => {
        const serverRouterMap = mockData.data.funcPermissions // 模拟数据
        console.log('serverRouterMap:', serverRouterMap)
        const asyncRouterMap = generateAsyncRouter(routerMap, serverRouterMap)
        commit('ROUTER_LEN', asyncRouterMap.length)
        commit('SET_ROUTES', asyncRouterMap)
        resolve(asyncRouterMap)
      }, 1000)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
