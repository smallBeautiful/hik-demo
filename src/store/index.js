import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import cache from './modules/cache'
import hik from './modules/hik'
import treeGroupA from './modules/treeGroupA'
import treeGroupB from './modules/treeGroupB.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    cache,
    hik,
    treeGroupA,
    treeGroupB
  },
  getters
})

export default store
