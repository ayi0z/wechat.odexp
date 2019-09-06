import db from './db'
import dbm from './dbm'

export default {
  ...dbm(db.user, '用户存储设置失败')
}
