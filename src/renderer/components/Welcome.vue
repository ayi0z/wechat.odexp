<template>
  <div>
    <el-input v-model="appid" placeholder="appid"></el-input>
    <el-button @click="doR">Read Store</el-button>
    <el-button @click="doS">Set Token</el-button>
    <el-button @click="doD">Del Token</el-button>
    <el-button @click="doRToken">Read Token</el-button>
  </div>
</template>

<script>
  export default {
    name: 'welcome',
    data () {
      return {
        appid: 'wxdd581fcfefdd4b87_'
      }
    },
    methods: {
      doR () {
        console.log(this.$store.state)
      },
      doS () {
        // this.$store.dispatch('set_token', { appid: 'testappid', token: 'testtoken', expires: 12345 })
        this.doR()
      },
      doD () {
        this.$store.dispatch('del_token', this.appid)
        this.doR()
      },
      doRToken () {
        this.$wx.token(this.appid).then(res => {
          console.log(res)

          this.$noti.err(res)
        })
      }
    }
  }
</script>

<style>
</style>