import db from './db'
import dbm from './dbm'

export default {
  ...dbm(db.setting, '配置信息加载失败'),
  check (f, v) {
    var jsonobj = {}
    if (f) {
      jsonobj[f] = v
    }
    return this.count(jsonobj)
  },
  switchstatus (id, st) {
    return this.update2(id, { $set: { status: st } })
  }
}
