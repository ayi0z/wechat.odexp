<template>
    <el-container class="openid-container">
        <el-header style="height:auto;">
            <el-row>
                <el-col :span="11">
                    <el-date-picker
                        v-model="daterange"
                        type="daterange"
                        align="right"
                        size="mini"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    ></el-date-picker>
                </el-col>
                <el-col :span="13">
                    <div style>
                        <el-button
                            type="success"
                            size="mini"
                            icon="el-icon-search"
                            style="margin-left:auto"
                            @click="onQueryLocalFans"
                        >搜索本地数据</el-button>
                        <el-button
                            type="success"
                            size="mini"
                            icon="el-icon-bottom-left"
                            style="margin-left:auto"
                            @click="onDownLoadFansFrWechat"
                        >同步微信数据(最近1周)</el-button>
                        <el-button
                            type="primary"
                            size="mini"
                            icon="el-icon-download"
                            style="margin-left:auto"
                            @click="onExport"
                        >导出 xlsx</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-table
                :fit="true"
                :data="datas"
                :stripe="true"
                lazy
                style="width: 100%; height:100%;"
                size="mini"
            >
                <el-table-column label="日期" width="60">
                    <template slot-scope="scope">
                        <el-image
                            style="width:30px;height: 30px"
                            lazy
                            fit="contain"
                            :src="scope.row.headimgurl"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="openid" label="新增用户数"></el-table-column>
                <el-table-column prop="nickname" label="取关用户数" width="140"></el-table-column>
                <el-table-column prop="nickname" label="净增用户数" width="140"></el-table-column>
                <el-table-column label="关注来源" width="70">
                    <template slot-scope="scope">
                        <span>{{oSex(scope.row.sex)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="area" width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.country}} {{scope.row.province}} {{scope.row.city}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="subscribe scene" width="130">
                    <template slot-scope="scope">
                        <span>{{oSUBSCRIBE_SCENE(scope.row.subscribe_scene)}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>
<script>
    export default {
      name: 'fans',
      props: ['wechat'],
      data () {
        return {
          datas: [],
          daterange: ['2019-10-07', '2019-10-24']
        }
      },
      mounted () {
        const now = new Date()
        const ed = this.$func.DATE_FORMAT(new Date(now.setTime(now.getTime() - 3600 * 24 * 1000)))
        const bd = this.$func.DATE_FORMAT(new Date(now.setTime(now.getTime() - 3600 * 24 * 6 * 1000)))
        this.daterange = [bd, ed]
      },
      watch: {
        wechat () {
          this.onLoadLocalFans()
        }
      },
      computed: {
        dash_openid_percent () {
          return Math.round((this.dash_openid.count || 0) / (this.dash_openid.total || 1) * 100)
        },
        dash_userinfo_percent () {
          return Math.round((this.dash_userinfo.count || 0) / (this.dash_openid.total || 1) * 100)
        },
        isnotoken () {
          return !(this.wechat && this.wechat.token)
        },
        isnoappid () {
          return !(this.wechat && this.wechat.appid)
        },
        isnotokenandappid () {
          return !(this.wechat && this.wechat.appid && this.wechat.token)
        }
      },
      methods: {
        oUSER_SOURCE (k) {
          return this.$dic.USER_SOURCE[k]
        },
        onLoadLocalFans () {
          console.log('load local fans')
        },
        onQueryLocalFans () {
          if (this.isnoappid) return
          if (!this.daterange || this.daterange.length < 2) return

          const bd = new Date(this.daterange[0]).getTime()
          const ed = new Date(this.daterange[1]).getTime()

          this.$db.fanscumulate.load({ appid: this.wechat.appid, ref_timestamp: { $gte: bd, $lte: ed } }).then(res => {
            console.log(res.d)
          })
          this.$db.fans.load({ appid: this.wechat.appid, ref_timestamp: { $gte: bd, $lte: ed } }).then(res => {
            console.log(res.d)
          })
        },
        onDownLoadFansFrWechat () {
          if (this.isnotokenandappid) return

          this.$wx.fanscumulate(this.wechat.token)
            .then(res => {
              console.log(res)
              if (res.c === 0 && res.d && res.d.length > 0) {
                const data = res.d.map(c => ({ ...c, ref_timestamp: new Date(c.ref_date).getTime(), appid: this.wechat.appid }))
                const maxtimestamp = data.reduce((a, b) => (b.ref_timestamp > a.ref_timestamp ? b : a)).ref_timestamp
                const mintimestamp = data.reduce((a, b) => (b.ref_timestamp < a.ref_timestamp ? b : a)).ref_timestamp
                console.log(maxtimestamp, mintimestamp)
                this.$db.fanscumulate.del({ appid: this.wechat.appid, ref_timestamp: { $gte: mintimestamp, $lte: maxtimestamp } })
                  .then(res => {
                    if (res.c === 0) {
                      this.$db.fanscumulate.save(data).then(res => { this.$noti.err(res) })
                    }
                    this.$noti.err(res)
                  })
              }
              this.$noti.err(res)
            })
          this.$wx.fans(this.wechat.token)
            .then(res => {
              console.log(res)
              if (res.c === 0 && res.d && res.d.length > 0) {
                const data = res.d.map(c => ({ ...c, ref_timestamp: new Date(c.ref_date).getTime(), appid: this.wechat.appid }))
                const maxtimestamp = data.reduce((a, b) => (b.ref_timestamp > a.ref_timestamp ? b : a)).ref_timestamp
                const mintimestamp = data.reduce((a, b) => (b.ref_timestamp < a.ref_timestamp ? b : a)).ref_timestamp
                console.log(maxtimestamp, mintimestamp)
                this.$db.fans.del({ appid: this.wechat.appid, ref_timestamp: { $gte: mintimestamp, $lte: maxtimestamp } })
                  .then(res => {
                    if (res.c === 0) {
                      this.$db.fans.save(data).then(res => { this.$noti.err(res) })
                    }
                    this.$noti.err(res)
                  })
              }
              this.$noti.err(res)
            })
        },
        onExport () {
          console.log('export fans')
        }
      }
    }
</script>

<style scoped>
    .openid-table-expand label {
        width: 80px;
        color: #ffffff;
        background-color: #6a6d6f;
    }
    .openid-table-expand .el-form-item__label,
    .openid-table-expand .el-form-item__content {
        line-height: 16px;
        font-size: 12px;
    }
    .openid-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 49%;
        margin-bottom: 1px;
    }
    .openid-table-expand .el-form-item__content {
        padding: 0 8px;
    }
    .el-table__expanded-cell[class*='cell'] {
        padding: 10px;
    }
    .openid-container .el-header,
    .openid-container .el-main {
        padding: 0;
    }
    .openid-container .el-header {
        font-size: 12px;
        background-color: #ffffff;
        line-height: 15px;
        padding: 10px 0;
    }
    .openid-container .el-progress-circle {
        line-height: 5px;
        font-size: auto;
    }
    .openid-container .el-progress__text {
        font-size: 12px !important;
    }
    .openid-container .pressbtn {
        width: 60px;
        line-height: 8px;
        cursor: pointer;
        text-align: center;
        border-radius: 50%;
    }
    .openid-container .pressbtn:active {
        background-color: rgba(167, 183, 197, 0.77);
        box-shadow: 0 0 2px #989aad;
    }
    .openid-container .pressbtn:active::before,
    .openid-container .pressbtn:hover::before {
        background-color: rgba(32, 37, 41, 0.42);
        content: '点此同步';
        position: absolute;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        line-height: 60px;
        z-index: 99;
        font-size: 12px;
        color: #ffffff;
        box-shadow: 1px 1px 1px #6d6d6d;
    }
    .openid-container .pressbtn:active::before {
        box-shadow: 0px 0px 2px #000000;
    }
    .openid-container .pressbtn-err .el-progress__text,
    .openid-container .pressbtn:hover .el-progress__text,
    .openid-container .pressbtn:active .el-progress__text {
        color: transparent;
    }
    .openid-container .pressbtn-err::before {
        background-color: rgba(255, 0, 0, 0.49);
        content: '同步错误';
        position: absolute;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        line-height: 60px;
        z-index: 99;
        font-size: 12px;
        color: #ffffff;
    }
</style>