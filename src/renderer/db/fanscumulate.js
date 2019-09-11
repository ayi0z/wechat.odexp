import db from './db'
import dbm from './dbm'

export default {
  ...dbm(db.fanscumulate, '累计粉丝数据库加载失败')
}
