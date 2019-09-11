import db from './db'
import dbm from './dbm'

export default {
  ...dbm(db.tag, '公众号标签数据库加载失败')
}
