import Vue from 'vue'
import axios from 'axios'
// import { Container, Aside, Menu, Submenu, MenuItem, MenuItemGroup, Header, Dropdown, DropdownItem, DropdownMenu, Main, Table, TableColumn, Button } from 'element-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'
import store from './store'
import db from './db'
import wx from './wx'
import util from './util'

console.log(wx)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$db = db
Vue.prototype.$wx = wx
Vue.prototype.$noti = util.notify

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
