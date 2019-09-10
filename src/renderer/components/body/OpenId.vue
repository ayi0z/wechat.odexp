<template>
    <el-container class="openid-container">
        <el-header style="height:75px;">
            <el-row>
                <el-col :span="2">
                    <div @click="onDownLoadOpenId" class="pressbtn">
                        <el-progress type="circle" :percentage="dash_openid_percent" :width="60"></el-progress>
                    </div>
                </el-col>
                <el-col :span="10">
                    <tit-desc
                        kalign="left"
                        :tw="8"
                        :tds="[{divider:true, infos:[{k:'OpenID 同步时间:', v:new Date(dash_openid.time).toLocaleString()},{k:'已同步的 OpenID:', v: `${dash_openid.count}/${dash_openid.total}`}]}]"
                    ></tit-desc>
                </el-col>
                <el-col :span="2">
                    <div @click="onDownLoadUserInfo" class="pressbtn">
                        <el-progress type="circle" :percentage="dash_userinfo_percent" :width="60"></el-progress>
                    </div>
                </el-col>
                <el-col :span="10">
                    <tit-desc
                        kalign="left"
                        :tw="8"
                        :tds="[{divider:true, infos:[{k:'UserInfo 同步时间:', v:new Date(dash_userinfo.time).toLocaleString()},{k:'已同步的 UserInfo:', v: `${dash_userinfo.count}/${dash_openid.total}`}]}]"
                    ></tit-desc>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-table
                :fit="true"
                :data="datas"
                :stripe="true"
                lazy
                border
                style="width: 100%; height:100%;"
                size="mini"
            >
                <el-table-column type="expand" width="20">
                    <template slot-scope="props">
                        <el-form
                            label-position="right"
                            label-suffix=":"
                            inline
                            size="mini"
                            class="openid-table-expand"
                        >
                            <el-form-item label="关注时间">
                                <span>{{ new Date(props.row.subscribe_time * 1000).toLocaleString() }}</span>
                            </el-form-item>
                            <el-form-item label="语言">
                                <span>{{ props.row.language }}</span>
                            </el-form-item>
                            <el-form-item label="标签">
                                <span>{{ props.row.tagid_list }}</span>
                            </el-form-item>
                            <el-form-item label="备注">
                                <span>{{ props.row.remark }}</span>
                            </el-form-item>
                            <el-form-item label="Union ID">
                                <span>{{ props.row.unionid }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="avatar" width="60">
                    <template slot-scope="scope">
                        <el-image
                            style="width:30px;height: 30px"
                            lazy
                            fit="contain"
                            :src="scope.row.headimgurl"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="openid" label="openid"></el-table-column>
                <el-table-column prop="nickname" label="nickname" width="140"></el-table-column>
                <el-table-column label="gender" width="70">
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
    import TitDesc from './TitDesc'
    export default {
      name: 'navbodyopenid',
      components: {
        TitDesc
      },
      props: ['wechat'],
      data () {
        return {
          datas: [],
          dash_openid: {
            time: Date.parse(new Date()),
            total: 0,
            count: 0
          },
          dash_userinfo: {
            time: Date.parse(new Date()),
            count: 0
          }
        }
      },
      watch: {
        wechat () {
          this.onLoadRunTime()
          this.onLoadLocalUserInfo()
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
        oSex (sex) {
          return this.$dic.SEX(sex)
        },
        oSUBSCRIBE_SCENE (k) {
          return this.$dic.SUBSCRIBE_SCENE['ADD_SCENE_PROFILE_LINK']
        },
        onLoadRunTime () {
          this.$db.runtime.queryOne({ key: this.$dic.RUNTIME_KEY.DASH_OPENID_USERINFO, appid: this.wechat.appid })
            .then(res => {
              console.log(res)
              if (res.c === 0 && res.d) {
                this.dash_openid.time = res.d.openid_synctime
                this.dash_openid.total = res.d.openid_total
                this.dash_openid.count = res.d.openid_count
                this.dash_userinfo.time = res.d.userinfo_synctime
                this.dash_userinfo.count = res.d.userinfo_count
              } else {
                this.dash_openid.time = '-----'
                this.dash_openid.total = 0
                this.dash_openid.count = 0
                this.dash_userinfo.time = '-----'
                this.dash_userinfo.count = 0
              }
              this.$noti.err(res)
            })
        },
        onDownLoadOpenId () {
          if (this.isnotokenandappid) { return }
          this.oDownLoadOpenIDFrWechat()
        },
        oDownLoadOpenIDFrWechat (nextopenid = '') {
          console.log('todo: 从微信api接口拉取数据')
          if (nextopenid === '') {
            this.dash_openid.total = 0
            this.dash_openid.count = 0
            this.$db.openid.del({ appid: this.wechat.appid }) // 清空数据库
          }
          this.$wx.openid(this.wechat.token, nextopenid)
            .then(res => {
              console.log(res)
              if (res.c === 0 && res.d) {
                this.dash_openid.time = Date.parse(new Date())
                this.dash_openid.total = res.d.total
                this.dash_openid.count += res.d.count

                // 保存数据到数据库
                this.$db.openid.save(res.d.data.openid.map(u => ({ appid: this.wechat.appid, openid: u })))

                if (this.dash_openid.total > this.dash_openid.count) {
                  this.oDownLoadOpenIDFrWechat(res.d.next_openid)
                } else {
                  this.$db.runtime.update({
                    key: this.$dic.RUNTIME_KEY.DASH_OPENID_USERINFO,
                    appid: this.wechat.appid
                  }, { $set: {
                    openid_synctime: this.dash_openid.time,
                    openid_total: this.dash_openid.total,
                    openid_count: this.dash_openid.count
                  } }, { upsert: true })
                }
              }
              this.$noti.err(res)
            })
        },
        onLoadLocalUserInfo () {
          if (this.isnoappid) { return }
          this.$db.user.load({ appid: this.wechat.appid }).then(res => {
            console.log(res)
            if (res.c === 0 && res.d) {
              this.datas = res.d
            }
            this.$noti.err(res)
          })
        },
        onDownLoadUserInfo () {
          if (this.isnotokenandappid) { return }
          this.dash_userinfo.count = 0
          this.datas = []
          this.$db.user.del({ appid: this.wechat.appid }) // 清空数据库

          this.oDownLoadUserInfoFrWechat()
        },
        oDownLoadUserInfoFrWechat (skip = 0, limit = 100) {
          this.$db.openid.query({ appid: this.wechat.appid }, skip, limit)
            .then(res => {
              if (res.c === 0 && res.d && res.d.length) {
                this.$wx.users(this.wechat.token, res.d.map(o => (o.openid))).then(ures => {
                  console.log(ures)
                  if (ures.c === 0 && ures.d) {
                    this.dash_userinfo.time = Date.parse(new Date())
                    this.dash_userinfo.count += ures.d.user_info_list.length
                    this.datas = this.datas.concat(ures.d.user_info_list)

                    // 保存数据到数据库
                    this.$db.user.save(ures.d.user_info_list.map(u => ({ appid: this.wechat.appid, ...u })))

                    if (res.d.length === limit) {
                      this.oDownLoadUserInfoFrWechat(skip + limit)
                    } else {
                      this.$db.runtime.update({
                        key: this.$dic.RUNTIME_KEY.DASH_OPENID_USERINFO,
                        appid: this.wechat.appid
                      }, { $set: {
                        userinfo_synctime: this.dash_openid.time,
                        userinfo_count: this.dash_openid.count
                      } }, { upsert: true })
                    }
                  }
                  this.$noti.err(ures)
                })
              }
              this.$noti.err(res)
            })
        }
      }
    }
</script>

<style>
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