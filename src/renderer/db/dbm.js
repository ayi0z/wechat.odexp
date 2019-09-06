import util from '../util'

export default (_db, notice) => {
  const { ctmd, notification } = util

  _db.loadDatabase(err => {
    if (err && notice) notification(notice)
  })

  return {
    save: doc => {
      return new Promise((resolve, reject) => {
        if (!doc) reject(new Error('undifined doc'))
        _db.insert(doc, (err, newDoc) => {
          if (err) {
            reject(new Error(err))
          } else {
            resolve(ctmd.success(newDoc))
          }
        })
      })
    },
    load (ft = {}) {
      return new Promise((resolve, reject) => {
        _db.find(ft, (err, docs) => {
          if (err) {
            reject(new Error(err))
          } else {
            resolve(ctmd.success(docs))
          }
        })
      })
    },
    del2 (id) {
      return this.del({ _id: id })
    },
    del (ft) {
      return new Promise((resolve, reject) => {
        if (!ft) reject(new Error('undifined ft'))
        _db.remove(ft, { multi: true }, function (err, numRemoved) {
          if (err) {
            reject(new Error(err))
          } else {
            resolve(ctmd.success(numRemoved, `已删除 ${numRemoved} 条数据`))
          }
        })
      })
    },
    update2 (id, st) {
      return this.update({ _id: id }, st)
    },
    update (ft, st) {
      return new Promise((resolve, reject) => {
        if (!ft) reject(new Error('undifined ft'))
        if (!st) reject(new Error('undifined st'))
        _db.update(ft, st, { multi: true }, function (err, numReplaced) {
          if (err) {
            reject(new Error(err))
          } else {
            resolve(ctmd.success(numReplaced, `已更新 ${numReplaced} 条数据`))
          }
        })
      })
    },
    count (ft = {}) {
      return new Promise((resolve, reject) => {
        _db.count(ft, (err, count) => {
          if (err) {
            reject(new Error(err))
          } else {
            resolve(ctmd.success(count, `共检索到 ${count} 条数据`))
          }
        })
      })
    }
  }
}
