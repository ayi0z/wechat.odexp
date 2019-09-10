import store from '../store'
// import vhttp from '../vhttp'
import util from '../util'

const { ctmd, vhttp } = util

const expiresIn = 7000
const token = async appid => {
  let t = store.state.WechatsToken.tokens[appid]
  if (t) {
    const ntimesamp = Date.parse(new Date()) / 1000
    const expin = ntimesamp - t.expires - expiresIn
    if (expin <= 0) {
      return ctmd.success(t)
    }
  }

  const wechat = store.getters.getWechatByAppId(appid)
  if (wechat) {
    const res = await getTokenFrStore(wechat.appid, wechat.appsecret)
    if (res.c === 0) {
      store.dispatch('set_token', { ...res.d, appid })
    }
    return res
  }
  return ctmd.error('微信公众号AppId无效')
}

// get token from store
async function getTokenFrStore (appid, appsecret) {
  console.log('update access token from wechat api')
  let _ctmd
  await vhttp.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`)
    .then(res => {
      if (res.status === 200) {
        if (res.data.access_token) {
          const ntimesamp = Date.parse(new Date()) / 1000
          _ctmd = ctmd.success({ token: res.data.access_token, expires: ntimesamp })
        } else {
          _ctmd = ctmd.error(`同步微信公众号发生错误: ${res.data.errcode}.${res.data.errmsg}`)
        }
      }
    }).catch(err => {
      console.error(err)
      _ctmd = ctmd.error('无法更新微信公众号AccessToken', err)
    })
  return _ctmd
}

export default token
