import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

const userDataPath = remote.app.getPath('userData')

const db = {
  setting: new Datastore({ filename: path.join(userDataPath, '/db/odexp_setting.db') }),
  user: new Datastore({ filename: path.join(userDataPath, '/db/odexp_user.db') }),
  runtime: new Datastore({ filename: path.join(userDataPath, '/db/odexp_runtime.db') }),
  openid: new Datastore({ filename: path.join(userDataPath, '/db/odexp_openid.db') }),
  tag: new Datastore({ filename: path.join(userDataPath, '/db/odexp_tag.db') }),
  fans: new Datastore({ filename: path.join(userDataPath, '/db/odexp_fans.db') }),
  fanscumulate: new Datastore({ filename: path.join(userDataPath, '/db/odexp_fanscumulate.db') })
}

export default db
