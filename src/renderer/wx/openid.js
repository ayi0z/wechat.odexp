import util from '../util'

const { ctmd, svrhttp } = util

const openid = async (token, next = '') => {
  console.log('get openid from wechat api')
  let _ctmd
  await svrhttp.get(`https://api.weixin.qq.com/cgi-bin/user/get?access_token=${token}&next_openid=${next}`)
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

export default openid
