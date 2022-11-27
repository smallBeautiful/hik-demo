const getDefaultState = () => {
  return {
    colorListOrign: ['cyan', '#B8C8B7', '#507883', '#5c5a46', '#4a6f5d'],
    colorListDisplay: ['cyan', '#B8C8B7', '#507883', '#5c5a46', '#4a6f5d']
  }
}

const state = getDefaultState()

const mutations = {
  SET_COLOR_LIST: (state, data) => {
    state.colorListDisplay = data
  }
}

const actions = {
  setColorList({ commit }, data = []) {
    commit('colorListDisplay', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

