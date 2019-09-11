import db from './db'
import dbm from './dbm'

export default {
  ...dbm(db.fans, '粉丝数据库加载失败')
}
