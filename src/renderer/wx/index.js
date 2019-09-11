import token from './token'
import openid from './openid'
import user from './user'
import tag from './tag'

export default {
  token,
  openid,
  ...user,
  tag
}
