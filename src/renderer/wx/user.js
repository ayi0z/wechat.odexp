import util from '../util'

const { ctmd, svrhttp, func } = util

const user = async (token, openid, lang = 'zh_CN') => {
  console.log('get single userinfo from wechat api')
  let _ctmd
  await svrhttp.get(`https://api.weixin.qq.com/cgi-bin/user/info?access_token=${token}&openid=${openid}&lang=${lang}`)
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
  await svrhttp.post(`https://api.weixin.qq.com/cgi-bin/user/info/batchget?access_token=${token}`, openidlist)
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

const _usrstat = async (token, bd, ed, url) => {
  const now = new Date()
  if (!ed) ed = func.DATE_FORMAT(new Date(now.setTime(now.getTime() - 3600 * 24 * 1000)))
  if (!bd) bd = func.DATE_FORMAT(new Date(now.setTime(now.getTime() - 3600 * 24 * 6 * 1000)))
  let _ctmd
  await svrhttp.post(`${url}?access_token=${token}`, { begin_date: bd, end_date: ed })
    .then(res => {
      if (res.data.list) {
        _ctmd = ctmd.success(res.data.list)
      } else {
        _ctmd = ctmd.error(`获取粉丝数据错误: ${res.data.errcode}.${res.data.errmsg}`)
      }
    }).catch(err => {
      console.error(err)
      _ctmd = ctmd.error('无法获取粉丝数据', err)
    })
  return _ctmd
}

const fans = (token, bd, ed) => {
  console.log('get fans summary from wechat api')
  return _usrstat(token, bd, ed, 'https://api.weixin.qq.com/datacube/getusersummary')
}

const fanscumulate = (token, bd, ed) => {
  console.log('get fans summary from wechat api')
  return _usrstat(token, bd, ed, 'https://api.weixin.qq.com/datacube/getusercumulate')
}

export default { user, users, fans, fanscumulate }
