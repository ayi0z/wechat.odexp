import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

const userDataPath = remote.app.getPath('userData')

const db = {
  setting: new Datastore({ filename: path.join(userDataPath, '/db/odexp_setting.db') }),
  user: new Datastore({ filename: path.join(userDataPath, '/db/odexp_user.db') })
}

export default db
