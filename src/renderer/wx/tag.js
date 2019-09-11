import util from '../util'

const { ctmd, svrhttp } = util

const tag = async (token) => {
  console.log('get tags from wechat api')
  let _ctmd
  await svrhttp.get(`https://api.weixin.qq.com/cgi-bin/tags/get?access_token=${token}`)
    .then(res => {
      if (res.data.tags) {
        _ctmd = ctmd.success(res.data.tags)
      } else {
        _ctmd = ctmd.error(`获取公众号已创建的tags错误: ${res.data.errcode}.${res.data.errmsg}`)
      }
    }).catch(err => {
      console.error(err)
      _ctmd = ctmd.error('无法获取公众号已创建的tags', err)
    })
  return _ctmd
}

export default tag
