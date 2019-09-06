// import { WECHATSTOKEN_KEY } from '../localStorageKeys'

const state = {
  // { appid: {token:****, expires:time }}
  tokens: {} // JSON.parse(window.localStorage.getItem(WECHATSTOKEN_KEY) || '{}')
}

const mutations = {
  SET_TOKEN (state, { appid, token }) {
    state.tokens[appid] = token
  },
  DEL_TOKEN (state, appid) {
    delete state.tokens[appid]
  }
}

const actions = {
  set_token ({ commit }, { appid, token, expires }) {
    commit('SET_TOKEN', { appid, token: { token, expires } })
  },
  del_token ({ commit }, appid) {
    commit('DEL_TOKEN', appid)
  }
}

export default {
  state,
  mutations,
  actions
}
