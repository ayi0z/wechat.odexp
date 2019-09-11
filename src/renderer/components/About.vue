<template>
    <div style="height:100%;">
        <el-row>
            <el-col :span="8">
                <div class="g-right">
                    <img class="logo" src="~@/assets/logo.png" alt="Wechat OpenId Datacube" />
                </div>
            </el-col>
            <el-col :span="16">
                <div class="g-info">
                    <el-row>
                        <el-col :span="24">
                            <div class="g-left g-title">{{appname}}</div>
                        </el-col>
                    </el-row>
                    <el-row v-if="author">
                        <el-col :span="4">
                            <div class="g-left">Author:</div>
                        </el-col>
                        <el-col :span="20">
                            <el-button
                                class="g-left g-author"
                                size="mini"
                                type="text"
                                @click="lnkTo('http://www.bsswhg.com')"
                            >{{author}}</el-button>
                        </el-col>
                    </el-row>
                    <tit-desc :tds="tit"></tit-desc>
                    <tit-desc class="titdesc" :tds="iptit"></tit-desc>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import TitDesc from './body/TitDesc'
    import os from 'os'
    export default {
      name: 'about',
      components: { TitDesc },
      data () {
        return {
          appname: 'Wechat OpenID & Datacube',
          author: process.env.npm_package_author_name,
          tit: [
            { infos: [{ k: 'Version:', v: process.env.npm_package_version }] },
            { divider: true,
              infos: [{ k: 'OS:', v: `${os.type()} ${os.arch()} ${os.release()}` }]
            },
            { divider: true,
              infos: [
                { k: 'Electron:', v: process.versions.electron },
                { k: 'Node.js:', v: process.versions.node },
                { k: 'Vue:', v: require('vue/package.json').version }
              ] }],
          iptit: undefined
        }
      },
      mounted () {
        this.$http.get('http://ip-api.com/json/?lang=zh-CN')
          .then(res => {
            this.iptit = [{
              divider: true,
              infos: [
                { k: 'IP:', v: res.data.query },
                { k: 'ISP:', v: res.data.isp },
                { k: 'Country:', v: res.data.country },
                { k: 'Region:', v: res.data.regionName },
                { k: 'City:', v: res.data.city }
              ]
            }]
          })
      },
      methods: {
        lnkTo (link) {
          this.$electron.shell.openExternal(link)
        }
      }
    }
</script>

<style scoped>
    .logo {
        width: 100px;
    }
    .g-title {
        font-size: 14px;
        padding-bottom: 10px;
        color: #429c16;
    }
    .g-info {
        font-size: 12px;
    }
    .g-author {
        padding: 0;
        color: #000;
        border: 0;
    }
    .g-right {
        text-align: right;
        padding-right: 15px;
        margin-bottom: 5px;
    }
    .g-left {
        text-align: left;
        margin-bottom: 5px;
    }
</style>