import { getData } from '@/api/cache'
import da from 'element-ui/src/locale/lang/da'

const getDefaultState = () => {
  return {
    list: []
  }
}

const state = getDefaultState()

const mutations = {
  SET_DATA: (state, data) => {
    state.list = data
  }
}

const actions = {
  // 获取数据
  getData({ commit }, data = {}) {
    return new Promise((resolve, reject) => {
      getData().then(response => {
        const { data } = response
        console.log(data)
        commit('SET_DATA', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

