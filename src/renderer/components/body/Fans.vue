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
                            @click="onLoadLocalFans"
                        >搜索本地数据</el-button>
                        <el-button
                            type="success"
                            size="mini"
                            icon="el-icon-bottom-left"
                            style="margin-left:auto"
                            @click="onDownLoadFansFrWechat"
                        >同步微信数据(最近1周)</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="15">
                    <fans-chart-line style="width:500px; height:200px;" :data="datas"></fans-chart-line>
                </el-col>
                <el-col :span="9">
                    <fans-chart-pie :data="piedata" style="width:300px; height:200px;"></fans-chart-pie>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-table
                :fit="true"
                :data="datas"
                :stripe="true"
                lazy
                style="width: 100%;"
                max-height="450"
                size="mini"
            >
                <el-table-column fixed prop="ref_date" label="日期" width="90"></el-table-column>
                <el-table-column prop="cumulate_user" label="累计粉丝数" width="90"></el-table-column>
                <el-table-column label="新增粉丝数" width="90">
                    <template slot-scope="scope">
                        <span>{{scope.row.data.map(d=>d.new_user).reduce((a,b)=> (a + b))}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="取关粉丝数" width="90">
                    <template slot-scope="scope">
                        <span>{{scope.row.data.map(d=>d.cancel_user).reduce((a,b)=> (a + b))}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="净增粉丝数" width="90">
                    <template slot-scope="scope">
                        <span>{{scope.row.data.map(d=>d.new_user).reduce((a,b)=> (a + b)) - scope.row.data.map(d=>d.cancel_user).reduce((a,b)=> (a + b))}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="关注来源">
                    <el-table-column v-for="(v,k) in USER_SOURCE" :key="'us'+k" :label="v">
                        <el-table-column align="center" label="+">
                            <template slot-scope="scope">
                                <span>{{scope.row.data.find(d=>d.user_source == k) && scope.row.data.find(d=>d.user_source == k).new_user}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="-">
                            <template slot-scope="scope">
                                <span>{{scope.row.data.find(d=>d.user_source == k) && scope.row.data.find(d=>d.user_source == k).cancel_user}}</span>
                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>
<script>
    import FansChartLine from './Fans/ChartLine'
    import FansChartPie from './Fans/ChartPie'
    export default {
      name: 'fans',
      props: ['wechat'],
      components: { FansChartLine, FansChartPie },
      data () {
        return {
          USER_SOURCE: this.$dic.USER_SOURCE,
          datas: [
            // {
            //   ref_date: '2014-12-07',
            //   cumulate_user: 65300,
            //   data: [{
            //     ref_date: '2014-12-07',
            //     user_source: 57,
            //     new_user: 60,
            //     cancel_user: 123
            //   }, {
            //     ref_date: '2014-12-07',
            //     user_source: 30,
            //     new_user: 8,
            //     cancel_user: 3
            //   }]
            // }, {
            //   ref_date: '2014-12-08',
            //   cumulate_user: 12312,
            //   data: [{
            //     ref_date: '2014-12-08',
            //     user_source: 51,
            //     new_user: 32,
            //     cancel_user: 12
            //   }, {
            //     ref_date: '2014-12-08',
            //     user_source: 43,
            //     new_user: 6,
            //     cancel_user: 9
            //   }, {
            //     ref_date: '2014-12-08',
            //     user_source: 57,
            //     new_user: 54,
            //     cancel_user: 15
            //   }]
            // }, {
            //   ref_date: '2014-12-01',
            //   cumulate_user: 12312,
            //   data: [{
            //     ref_date: '2014-12-01',
            //     user_source: 51,
            //     new_user: 32,
            //     cancel_user: 12
            //   }, {
            //     ref_date: '2014-12-01',
            //     user_source: 43,
            //     new_user: 6,
            //     cancel_user: 9
            //   }, {
            //     ref_date: '2014-12-01',
            //     user_source: 57,
            //     new_user: 54,
            //     cancel_user: 15
            //   }]
            // }
          ],
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
        },
        piedata () {
          const das = this.datas.reduce((a, b) => (a.concat(b.data)), [])
          return [...new Set(das.map(c => c.user_source))].map(c => ({
            name: this.oUSER_SOURCE(c),
            value: das.reduce((a, b) => {
              if (b.user_source === c) return a + b.new_user
              else return a
            }, 0) }))
        }
      },
      methods: {
        oUSER_SOURCE (k) {
          return this.$dic.USER_SOURCE[k]
        },
        onLoadLocalFans () {
          if (this.isnoappid) return
          if (!this.daterange || this.daterange.length < 2) return

          const bd = new Date(this.daterange[0]).getTime()
          const ed = new Date(this.daterange[1]).getTime()

          const queryFilter = { appid: this.wechat.appid, ref_timestamp: { $gte: bd, $lte: ed } }
          this.$db.fanscumulate.load(queryFilter).then(res => {
            if (res.c === 0 && res.d && res.d.length > 0) {
              const fanscumulate = res.d
              this.$db.fans.load(queryFilter).then(res => {
                if (res.c === 0 && res.d && res.d.length > 0) {
                  this.datas = [...new Set(res.d.map(d => d.ref_date))].map(s => {
                    const fc = fanscumulate.find(fc => fc.ref_date === s)
                    return {
                      ref_date: s,
                      data: res.d.filter(d => d.ref_date === s),
                      cumulate_user: (fc && fc.cumulate_user) || ''
                    }
                  }).sort((a, b) => {
                    const ats = new Date(a.ref_date).getTime()
                    const bts = new Date(b.ref_date).getTime()
                    return bts - ats
                  })
                }
                this.$noti.err(res)
              })
            }
            this.$noti.err(res)
          })
        },
        onDownLoadFansFrWechat () {
          if (this.isnotokenandappid) return

          const dataformat = (data) => {
            data = data.map(c => ({ ...c, ref_timestamp: new Date(c.ref_date).getTime(), appid: this.wechat.appid }))
            const maxtimestamp = data.reduce((a, b) => (b.ref_timestamp > a.ref_timestamp ? b : a)).ref_timestamp
            const mintimestamp = data.reduce((a, b) => (b.ref_timestamp < a.ref_timestamp ? b : a)).ref_timestamp
            return { data, maxtimestamp, mintimestamp }
          }

          this.$wx.fanscumulate(this.wechat.token)
            .then(res => {
              if (res.c === 0 && res.d && res.d.length > 0) {
                const { data, maxtimestamp, mintimestamp } = dataformat(res.d)
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
              if (res.c === 0 && res.d && res.d.length > 0) {
                const { data, maxtimestamp, mintimestamp } = dataformat(res.d)
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
        }
        // ,
        // onExport () {
        //   console.log('export fans')
        //   require('../../export').default.fans([1, 2, 3], require('path').join(__static, 'export_fans_tpl.xlsx'))
        //     .then(res => console.log(res))
        //   // console.log(require('path').join(__static, 'export_article_tpl.xlsx'))
        // }
      }
    }
</script>

<style scoped>
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
</style>