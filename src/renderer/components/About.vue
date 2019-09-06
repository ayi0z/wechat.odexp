<template>
  <div style="height:100%; padding-top:15%;">
    <el-row>
      <el-col :span="8">
        <div class="g-right">
          <img class="logo" src="~@/assets/logo.png" alt="Export OpenID Datacube" />
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
          <el-row v-if="version">
            <el-col :span="4">
              <div class="g-left">Version:</div>
            </el-col>
            <el-col :span="20">
              <div class="g-left">{{version}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="g-devider"></div>
            </el-col>
            <el-col :span="20"></el-col>
          </el-row>
          <el-row v-if="os">
            <el-col :span="4">
              <div class="g-left">OS:</div>
            </el-col>
            <el-col :span="20">
              <div class="g-left">{{os}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="g-devider"></div>
            </el-col>
            <el-col :span="20"></el-col>
          </el-row>
          <el-row v-if="electron">
            <el-col :span="4">
              <div class="g-left">Electron:</div>
            </el-col>
            <el-col :span="20">
              <div class="g-left">{{electron}}</div>
            </el-col>
          </el-row>
          <el-row v-if="node">
            <el-col :span="4">
              <div class="g-left">Node.js:</div>
            </el-col>
            <el-col :span="20">
              <div class="g-left">{{node}}</div>
            </el-col>
          </el-row>
          <el-row v-if="vue">
            <el-col :span="4">
              <div class="g-left">Vue:</div>
            </el-col>
            <el-col :span="20">
              <div class="g-left">{{vue}}</div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'about',
    data () {
      const os = require('os')
      return {
        appname: 'Export OpenID & Datacube',
        author: process.env.npm_package_author_name,
        version: process.env.npm_package_version,
        os: `${os.type()} ${os.arch()} ${os.release()}`,
        electron: process.versions.electron,
        node: process.versions.node,
        vue: require('vue/package.json').version
      }
    },
    methods: {
      lnkTo (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
  .logo {
    width: 100px;
  }
  .g-center {
    text-align: center;
  }
  .g-title {
    font-size: 14px;
    padding-bottom: 5px;
    color: #429c16;
  }
  .g-info {
    font-size: 12px;
  }
  .g-co {
    width: 60px;
    display: inline-block;
    padding-right: 5px;
    text-align: right;
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
  .g-devider {
    border-bottom: solid 1px #429c16;
    margin: 5px 0 10px 0;
  }
</style>