import db from './db'
import dbm from './dbm'

export default {
  ...dbm(db.openid, 'OpenID 数据库加载失败')
}
