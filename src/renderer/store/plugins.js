import { WECHATSTOKEN_KEY } from './localStorageKeys'

const localStorageWechatsTokenPlugin = store => {
  store.subscribe((mutation, state) => {
    console.log('localStoragePlugin>>', mutation, state)
    if (mutation.type === 'SET_TOKEN' || mutation.type === 'DEL_TOKEN') {
      console.log(mutation.type, WECHATSTOKEN_KEY, state)
      window.localStorage.setItem(WECHATSTOKEN_KEY, JSON.stringify(state.WechatsToken.tokens))
    }
  })
}

export default {
  localStorageWechatsTokenPlugin
}
