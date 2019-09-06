import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState } from 'vuex-electron'
// import plugins from './plugins'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState() // ,
    // plugins.localStorageWechatsTokenPlugin //,
    // createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
