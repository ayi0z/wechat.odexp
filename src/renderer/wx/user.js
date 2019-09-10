// import vhttp from '../vhttp'
import util from '../util'

const { ctmd, vhttp } = util

const user = async (token, openid, lang = 'zh_CN') => {
  console.log('get single userinfo from wechat api')
  let _ctmd
  await vhttp.get(`https://api.weixin.qq.com/cgi-bin/user/info?access_token=${token}&openid=${openid}&lang=${lang}`)
    .then(res => {
      if (res.data.total) {
        _ctmd = ctmd.success(res.data)
      } else {
        _ctmd = ctmd.error(`获取openid错误: ${res.data.errcode}.${res.data.errmsg}`)
      }
    }).catch(err => {
      console.error(err)
      _ctmd = ctmd.error('无法获取Openid', err)
    })
  return _ctmd
}

const users = async (token, openids, lang = 'zh_CN') => {
  console.log('get many users info from wechat api')
  let _ctmd
  const openidlist = { user_list: openids.map(c => ({ openid: c, lang })) }
  await vhttp.post(`https://api.weixin.qq.com/cgi-bin/user/info/batchget?access_token=${token}`, openidlist)
    .then(res => {
      if (res.data.user_info_list) {
        _ctmd = ctmd.success(res.data)
      } else {
        _ctmd = ctmd.error(`获取openid错误: ${res.data.errcode}.${res.data.errmsg}`)
      }
    }).catch(err => {
      console.error(err)
      _ctmd = ctmd.error('无法获取Openid', err)
    })
  return _ctmd
}
export default { user, users }
