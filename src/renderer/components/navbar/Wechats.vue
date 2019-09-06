<template>
  <div>
    <el-tabs @tab-click="doSwitchTab">
      <el-tab-pane v-for="wx in wechats" :key="wx._id" :label="wx.title" :name="wx.appid"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'navwechats',
    props: [''],
    data () {
      return {
        activeTab: ''
      }
    },
    computed: {
      wechats () {
        return this.$store.state.Wechats.wechats
      }
    },
    mounted () {
      this.doLoadWechats()
    },
    methods: {
      doSwitchTab (tab) {
        if (this.activeTab === tab) return

        this.activeTab = tab
        this.$wx.token(tab.name).then(res => {
          console.log(res)
          if (res.c === 0) this.$emit('tabclick', { ...res.d, appid: tab.name })
          this.$noti.err(res)
        })
      },
      doLoadWechats () {
        this.$db.setting.load({ status: true }).then(res => {
          if (res.c === 0) {
            this.$store.dispatch('refresh_wechats', res.d)
          }
          this.$noti.err(res)
        }).catch(err => {
          console.error(err)
          this.$noti.n({ t: 'error', m: '微信公众号加载失败' })
        })
      }
    }
  }
</script>

<style>
  .el-tabs__item {
    height: 22px;
    line-height: 20px;
  }
</style>