import db from './db'
import dbm from './dbm'

export default {
  ...dbm(db.user, '用户信息数据读取失败')
}
