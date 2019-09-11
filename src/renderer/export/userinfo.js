import util from '../util'

const { ctmd, svrfile } = util

const userinfo = async (userinfo = [], path) => {
  console.log('export userinfos into xlsx')
  let _ctmd
  if (!userinfo || userinfo.length === 0) return ctmd.error('no userinfo need to export')
  await svrfile.xlsx.create(userinfo, path)
    .then(res => {
      _ctmd = ctmd.success(res, res)
    }).catch(err => {
      console.error(err)
      _ctmd = ctmd.error('无法导出 userinfo', err)
    })
  return _ctmd
}

export default userinfo
