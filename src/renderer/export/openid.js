import util from '../util'
import os from 'os'

const { ctmd, svrfile } = util

const openid = async (openid = [], path) => {
  console.log('export openids into txt')
  let _ctmd
  if (!openid || openid.length === 0) return ctmd.error('no openid need to export')
  await svrfile.txt.create(openid.join(os.EOL), path)
    .then(res => {
      _ctmd = ctmd.success(res, res)
    }).catch(err => {
      console.error(err)
      _ctmd = ctmd.error('无法导出openid', err)
    })
  return _ctmd
}

export default openid
