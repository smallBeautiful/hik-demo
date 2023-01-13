import { getData } from '@/api/cache'

const getDefaultState = () => {
  return {
    list: [],
    listStatus: 0 // 0未请求 1请求中 2请求成功
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
      state.listStatus = 1
      getData().then(response => {
        this.listStatus = 2
        const { data } = response
        commit('SET_DATA', data)
        resolve()
      }).catch(error => {
        this.listStatus = 0
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

