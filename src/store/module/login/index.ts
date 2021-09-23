import { Module } from 'vuex'
import router from '@/router'
import { ILoginMoudle } from './types'
import { IRootState } from '../../types'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId
} from '@/service/login'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'
import { IAcount } from '@/service/login/type'
import LocalCache from '@/utils/cache'
const LoginModule: Module<ILoginMoudle, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      const routes = mapMenusToRoutes(userMenus)
      //注册所有的路由
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      //获取用户按钮的权限的
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAcount) {
      //登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      LocalCache.setCache('token', token)
      // 发送初始化的请求（完整的role和department
      dispatch('getPageListData', null, { root: true })
      //请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      LocalCache.setCache('userInfo', userInfo)
      //请求用户的菜单
      const userMenuResult = await requestUserMenuByRoleId(userInfo.role.id)
      const userMenus = userMenuResult.data
      commit('changeUserMenus', userMenus)
      LocalCache.setCache('userMenus', userMenus)

      //跳到首页
      router.push('/main')
    },
    loadLoacalLogin({ commit, dispatch }) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 发送初始化的请求（完整的role和department
        dispatch('getPageListData', null, { root: true })
      }
      const userInfo = LocalCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = LocalCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default LoginModule
