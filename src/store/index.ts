import { createStore, Store, useStore as useVuexStore } from 'vuex'
import login from './module/login'
import system from './module/main/system'
import dashboard from './module/main/analysis'

import { getPageListData } from '@/service/main/system'
import { IRootState, IStoreType } from './types'
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'dawd',
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  getters: {},
  actions: {
    async getPageListData({ commit }) {
      // 1.请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      //获取子树
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data
      // 2.保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})
export function setupStore() {
  store.dispatch('login/loadLoacalLogin')
  //store.dispatch('getPageListData')
}
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
