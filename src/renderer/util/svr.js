import electron from 'electron'

const svr = electron.remote.require('./svrindex').default

export default {
  ...svr
}
