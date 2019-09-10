const SEX = c => {
  if (c === 1) return '男'
  else if (c === 2) return '女'
  else return '-'
}

const SUBSCRIBE_SCENE = {
  ADD_SCENE_SEARCH: '公众号搜索',
  ADD_SCENE_ACCOUNT_MIGRATION: '公众号迁移',
  ADD_SCENE_PROFILE_CARD: '名片分享',
  ADD_SCENE_QR_CODE: '扫描二维码',
  ADD_SCENE_PROFILE_LINK: '图文页内名称点击',
  ADD_SCENE_PROFILE_ITEM: '图文页右上角菜单',
  ADD_SCENE_PAID: '支付后关注',
  ADD_SCENE_OTHERS: '其他'
}

const RUNTIME_KEY = {
  DASH_OPENID_USERINFO: 'dash_openid_userinfo'
}

export default {
  SEX,
  SUBSCRIBE_SCENE,
  RUNTIME_KEY
}
