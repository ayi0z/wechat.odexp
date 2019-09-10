<template>
    <div>
        <titdesc class="titdesc" :tw="2" :tds="tds"></titdesc>
        <el-divider></el-divider>
        <titdesc :tw="2" :tds="[{divider:true}]"></titdesc>
        <div>提示：使用前需将本机公网IP[{{ip}}]设置为微信公众号白名单</div>
        <el-divider></el-divider>
        <el-input v-model="appid" placeholder="appid"></el-input>
        <el-divider></el-divider>
        <el-button @click="doR">Read Store</el-button>
        <el-button @click="doS">Set Token</el-button>
        <el-button @click="doD">Del Token</el-button>
        <el-button @click="doRToken">Read Token</el-button>
    </div>
</template>

<script>
    import TitDesc from './body/TitDesc'
    export default {
      name: 'welcome',
      components: {
        titdesc: TitDesc
      },
      data () {
        return {
          appid: 'wxdd581fcfefdd4b87_',
          tds: [],
          ip: ''
        }
      },
      mounted () {
        this.$http.get('http://ip-api.com/json/?lang=zh-CN').then(res => {
          console.log(res.data)
          this.tds.push({
            title: 'Local IP',
            divider: true,
            infos: [
              { k: 'IP', v: res.data.query },
              { k: 'ISP', v: res.data.isp },
              { k: 'Country', v: res.data.country },
              { k: 'Region', v: res.data.regionName },
              { k: 'City', v: res.data.city }
            ]
          })
          this.ip = res.data.query
        })
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
    .titdesc {
        font-size: 12px;
    }
</style>