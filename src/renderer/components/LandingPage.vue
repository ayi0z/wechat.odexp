<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="140px" style="background-color: rgb(238, 241, 246)">
      <el-menu
        default-active="0"
        :default-openeds="['1', '2']"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="0" @click="switchPage('welcome')">
          <template slot="title">
            <i class="el-icon-star-off"></i> Welcome
          </template>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user"></i>OpenID
          </template>
          <el-menu-item
            index="1-1"
            @click="switchPage('expopenid')"
            style="padding-left:45px;"
          >导出OpenID</el-menu-item>
          <el-menu-item
            index="1-2"
            @click="switchPage('usersummary')"
            style="padding-left:45px;"
          >粉丝数据</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-data-line"></i>图文数据
          </template>
          <el-menu-item
            index="2-1"
            @click="switchPage('datacube')"
            style="padding-left:45px;"
          >导出图文数据</el-menu-item>
        </el-submenu>
        <el-menu-item index="3" @click="switchPage('setting')">
          <template slot="title">
            <i class="el-icon-setting"></i> 设置
          </template>
        </el-menu-item>
        <el-menu-item index="4" @click="switchPage('about')">
          <template slot="title">
            <i class="el-icon-info"></i> 关于
          </template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <component v-bind:is="mainView"></component>
    </el-main>
  </el-container>
</template>

<script>
  import Welcome from './Welcome.vue'
  import ExpOpenid from './ExpOpenid.vue'
  import UserSummary from './UserSummary.vue'
  import Datacube from './Datacube.vue'
  import Setting from './Setting.vue'
  import About from './About.vue'
  export default {
    name: 'landing-page',
    components: {
      welcome: Welcome,
      usersummary: UserSummary,
      datacube: Datacube,
      setting: Setting,
      about: About,
      expopenid: ExpOpenid
    },
    data () {
      return {
        mainView: 'welcome'
      }
    },
    mounted () {
      console.log('lp mounted')
      // this.$dbsetting.wc_check()
      //   .then(res => {
      //     if (res.d > 0) {
      //       this.mainView = 'expopenid'
      //       this.$dbsetting.wc_load().then(res => {
      //         if (res.c === 0) {
      //           this.$store.dispatch('refresh_wechats', res.d)
      //         }
      //       }).catch(err => {
      //         console.error(err)
      //         this._doNotify({ t: 'error', m: '微信公众号加载失败' })
      //       })
      //     } else {
      //       this.mainView = 'setting'
      //     }
      //   }).catch(err => {
      //     console.log(err)
      //     this._doNotify({ t: 'error', m: '微信公众号加载失败' })
      //   })
    },
    methods: {
      switchPage (v) {
        this.mainView = v
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'PingFang SC', 'Helvetica Neue', 'Helvetica', 'Hiragino Sans GB',
      Arial, sans-serif;
  }

  .el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  .el-submenu .el-menu-item {
    min-width: 100px;
    font-size: 12px;
  }
</style>