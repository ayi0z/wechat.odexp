import db from './db'
import dbm from './dbm'

export default {
  ...dbm(db.openid, 'OpenID 数据读取失败')
}
