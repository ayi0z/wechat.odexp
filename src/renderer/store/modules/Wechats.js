const state = {
  wechats: []
}

const mutations = {
  ADD_WECHAT (state, wechat) {
    state.wechats.push(wechat)
  },
  REPLACE_WECHAT (state, { index, wechat }) {
    state.wechats[index] = wechat
  },
  REMOVE_WECHAT (state, index) {
    state.wechats.splice(index, 1)
  },
  REFRESH_WECHATS (state, wechats) {
    state.wechats = wechats
  }
}

const actions = {
  add_wechat ({ commit, state }, wechat) {
    let index = state.wechats.findIndex(c => c.appid === wechat.appid)
    if (index === -1) {
      commit('ADD_WECHAT', wechat)
    } else {
      commit('REPLACE_WECHAT', { index, wechat })
    }
  },
  remove_wechat ({ commit, state }, appid) {
    let index = state.wechats.findIndex(c => c.appid === appid)
    if (index > -1) {
      commit('REMOVE_WECHAT', index)
      commit('DEL_TOKEN', appid)
    }
  },
  refresh_wechats ({ commit }, wechats) {
    commit('REFRESH_WECHATS', wechats)
  }
}

const getters = {
  getWechatByAppId: state => appid => {
    return state.wechats.find(wc => wc.appid === appid)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
