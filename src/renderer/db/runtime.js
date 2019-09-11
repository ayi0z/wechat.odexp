import db from './db'
import dbm from './dbm'

/**
 * {
 *  key: dash_openid_userinfo
 *  appid: string,
 *  openid_synctime: number,
 *  openid_total: number,
 *  openid_count: number,
 *  userinfo_synctime: number,
 *  userinfo_count: number
 * }
 */
export default {
  ...dbm(db.runtime, '系统运行状态数据库加载失败')
}
