import util from '../util'

const { ctmd, svrfile } = util

const fans = async (fans = [], tplpath, path) => {
  console.log('export fans into xlsx')
  let _ctmd
  if (!fans || fans.length === 0) return ctmd.error('no fans need to export')
  await svrfile.xlsxtpl.create(fans, tplpath, path)
    .then(res => {
      console.log(res)
      _ctmd = ctmd.success(JSON.parse(res), 'success')
    }).catch(err => {
      console.error(err)
      _ctmd = ctmd.error('无法导出 fans', err)
    })
  return _ctmd
}

export default fans
