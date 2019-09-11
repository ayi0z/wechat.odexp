<template>
    <el-container style="height:100%;">
        <el-header
            style="text-align: right; font-size: 12px; line-height: 15px; height:auto; background-color: transparent;"
        >
            <el-button icon="el-icon-setting" size="mini" @click="onDrawer" type="primary" plain>设置</el-button>
        </el-header>
        <el-main style="padding-top:0px;">
            <ul class="infinite-list" style="overflow:auto">
                <li v-for="wcset in wclist" :key="wcset._id" class="list-item">
                    <el-card class="card-text">
                        <div slot="header">
                            <span>{{wcset.title}}</span>
                            <div style="display:inline;float: right; ">
                                <el-button
                                    style="padding: 3px 0;"
                                    type="text"
                                    @click="onSyncSetting(wcset.appid)"
                                >
                                    <i class="el-icon-refresh"></i>同步微信设置
                                </el-button>
                                <el-divider direction="vertical"></el-divider>
                                <el-button
                                    style="padding: 3px 0;"
                                    type="text"
                                    @click="onSwitchStatus(wcset._id, !wcset.status)"
                                >
                                    <i :class="wcset.status ? 'el-icon-turn-off' : 'el-icon-open' "></i>
                                    {{wcset.status ? '禁用' : '启用'}}
                                </el-button>
                                <el-button
                                    style="padding: 3px 0;"
                                    type="text"
                                    @click="onDel(wcset._id)"
                                >
                                    <i class="el-icon-delete"></i>删除
                                </el-button>
                            </div>
                        </div>
                        <div class="card-text-desc">
                            <span class="card-text-tit">AppID:</span>
                            {{wcset.appid}}
                            <span
                                class="card-text-tit"
                                style="margin-left:5px;"
                            >AppSecret:</span>
                            {{wcset.appsecret}}
                        </div>
                        <div class="card-text-desc">
                            <span class="card-text-tit">标签:</span>
                            <span
                                v-for="tag in (tags[wcset.appid] || [])"
                                :key="wcset.appid + tag.id"
                            >
                                {{tag.name}}
                                <el-divider direction="vertical"></el-divider>
                            </span>
                        </div>
                        <div class="card-text-desc">
                            <span class="card-text-tit">默认目录:</span>
                            {{wcset.expdir}}
                        </div>
                        <div class="card-text-desc">
                            <span class="card-text-tit">是否启用:</span>
                            {{wcset.status ? '已启用':'已禁用'}}
                        </div>
                    </el-card>
                </li>
            </ul>
        </el-main>
        <el-drawer
            :visible.sync="drawer"
            direction="rtl"
            :append-to-body="true"
            :show-close="true"
            :modal="false"
            size="50%"
            class="setting-drawer"
        >
            <el-collapse accordion>
                <el-collapse-item title="添加微信公众号" name="1">
                    <template slot="title">
                        <i class="header-icon el-icon-chat-dot-round"></i>
                        添加微信公众号
                    </template>
                    <div>
                        <el-form
                            ref="form"
                            :model="form"
                            label-width="80px"
                            label-position="left"
                            style="padding:20px;"
                            status-icon
                            size="mini"
                            :rules="rules"
                        >
                            <el-form-item label="名称" prop="title">
                                <el-input v-model.trim="form.title" placeholder="请输入微信公众号名称"></el-input>
                            </el-form-item>
                            <el-form-item label="AppID" prop="appid">
                                <el-input v-model.trim="form.appid" placeholder="请输入微信公众号AppID"></el-input>
                            </el-form-item>
                            <el-form-item label="AppSecret" prop="appsecret">
                                <el-input
                                    v-model.trim="form.appsecret"
                                    placeholder="请输入微信公众号AppSecret"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="默认目录">
                                <el-input v-model.trim="form.expdir" placeholder="导出数据的默认存放目录"></el-input>
                            </el-form-item>
                            <el-form-item label="是否启用">
                                <el-switch v-model="form.status"></el-switch>
                                <el-button type="primary" style="float:right;" @click="onSubmit">保存</el-button>
                            </el-form-item>
                            <el-form-item></el-form-item>
                        </el-form>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="清空缓存" name="2">
                    <template slot="title">
                        <i class="header-icon el-icon-takeaway-box"></i>
                        清空缓存
                    </template>
                    <div>
                        <el-button
                            type="danger"
                            size="mini"
                            icon="el-icon-delete"
                            style="margin: 3px 3px;"
                            v-for="(btn,index) in clearbtns"
                            :key="'btn'+index"
                            @click="btn.cmd()"
                        >{{btn.txt}}</el-button>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-drawer>
    </el-container>
</template>

<script>
    export default {
      name: 'setting',
      data () {
        var validateErrMsg = {
          appid: '请输入 AppID',
          appsecret: '请输入 AppSecret',
          title: '请输入微信公众号名称'
        }
        var validate = async (rule, value, callback) => {
          if (value) {
            if (rule.field === 'appid') {
              await this.$db.setting.check(rule.field, value)
                .then(res => {
                  if (res.c !== 0) {
                    callback(new Error(`无法验证AppID`))
                  } else if (res.d > 0) {
                    callback(new Error(`AppID 已存在`))
                  } else {
                    callback()
                  }
                }).catch(err => {
                  console.log(err)
                  this.$noti({ t: 'error', m: 'AppID 无法验证' })
                })
              return
            }
            callback()
          } else {
            callback(new Error(validateErrMsg[rule.field]))
          }
        }
        return {
          drawer: false,
          form: {
            title: '',
            appid: '',
            appsecret: '',
            expdir: '',
            status: true
          },
          rules: {
            appid: [{ validator: validate, trigger: 'blur' }],
            appsecret: [{ validator: validate, trigger: 'blur' }],
            title: [{ validator: validate, trigger: 'blur' }]
          },
          tags: {},
          clearbtns: [
            { txt: '清空 OpenID 缓存', cmd: () => { this.$db.openid.del({}).then(res => this.$noti.cc(res)) } },
            { txt: '清空 UserInfo 缓存', cmd: () => { this.$db.user.del({}).then(res => this.$noti.cc(res)) } },
            { txt: '清空 Runtime 缓存', cmd: () => this.$db.runtime.del({}).then(res => this.$noti.cc(res)) },
            {
              txt: '清空 Tag 缓存',
              cmd: () => {
                this.$db.tag.del({}).then(res => {
                  this.$noti.cc(res)
                  this.onLoadTag()
                })
              }
            },
            { txt: '清空 Fans 缓存', cmd: () => { this.$db.fans.del({}).then(res => this.$noti.cc(res)) } },
            { txt: '清空 Fanscumulate 缓存', cmd: () => { this.$db.fanscumulate.del({}).then(res => this.$noti.cc(res)) } }
          ]
        }
      },
      computed: {
        wclist () {
          return this.$store.state.Wechats.wechats
        }
      },
      mounted () {
        this.onLoad()
      },
      methods: {
        onSubmit () {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.$db.setting.save(this.form).then(res => {
                if (res.c === 0) {
                  this.onLoad()
                  this.form = {
                    title: '',
                    appid: '',
                    appsecret: '',
                    expdir: '',
                    status: true
                  }
                }
                this.$noti.cc(res)
              }).catch(err => {
                console.error(err)
                this.$noti.n({ t: 'error', m: '微信公众号添加失败' })
              })
            }
          })
        },
        onClose () {
          this.drawer = false
        },
        onDrawer () {
          this.drawer = true
        },
        onLoad () {
          this.$db.setting.load().then(res => {
            if (res.c === 0 && res.d) {
              this.$store.dispatch('refresh_wechats', res.d)
            }
          }).catch(err => {
            console.error(err)
            this.$noti.n({ t: 'error', m: '微信公众号加载失败' })
          })
          this.onLoadTag()
        },
        onLoadTag () {
          this.tags = {}
          this.$db.tag.load().then(res => {
            if (res.c === 0 && res.d) {
              res.d.map(d => { this.$set(this.tags, d.appid, d.tags) })
            }
            this.$noti.err(res)
          })
        },
        onSwitchStatus (id, st) {
          this.$db.setting.switchstatus(id, st)
            .then(res => {
              if (res.c === 0) {
                this.onLoad()
              }
              this.$noti.cc(res)
            }).catch(err => {
              console.error(err)
              this.$noti.n({ t: 'error', m: '微信公众号修改失败' })
            })
        },
        onDel (id) {
          this.$db.setting.del2(id)
            .then(res => {
              if (res.c === 0) {
                const wc = this.$store.state.Wechats.wechats.find(w => w._id === id)
                if (wc) {
                  this.$db.setting.del({ appid: wc.appid })
                  this.$db.openid.del({ appid: wc.appid })
                  this.$db.user.del({ appid: wc.appid })
                  this.$db.tag.del({ appid: wc.appid })
                  this.$db.runtime.del({ appid: wc.appid })
                  this.$db.fans.del({ appid: wc.appid })
                  this.$db.fanscumulate.del({ appid: wc.appid })
                  this.$store.dispatch('remove_wechat', wc.appid)
                }

                this.onLoad()
              }
              this.$noti.cc(res)
            }).catch(err => {
              console.error(err)
              this.$noti.n({ t: 'error', m: '微信公众号删除失败' })
            })
        },
        onSyncSetting (appid) {
          this.$wx.token(appid).then(res => {
            if (res.c === 0 && res.d) {
              this.$wx.tag(res.d.token).then(res2 => {
                if (res2.c === 0 && res2.d) {
                  this.$set(this.tags, appid, res2.d)
                  this.$db.tag.update({ appid }, { appid, tags: res2.d }, { upsert: true })
                }
                this.$noti.err(res2)
              })
            }
            this.$noti.err(res)
          })
        }
      }
    }
</script>

<style>
    .card-text {
        font-size: 12px;
    }
    .card-text-desc {
        word-wrap: break-word;
        margin: 1px;
    }
    .card-text-tit {
        padding-right: 8px;
        background-color: #6f6f6f;
        color: #fff;
        width: 80px;
        text-align: right;
        display: inline-block;
        line-height: 20px;
    }
    .el-card__header {
        padding: 10px;
    }
    .setting-drawer .el-drawer__header {
        margin-bottom: 0;
    }
    .setting-drawer .el-drawer__body {
        padding: 10px;
    }
    .setting-drawer .el-collapse {
        height: 500px;
        overflow: auto;
        box-sizing: border-box;
        -ms-flex-negative: 0;
        flex-shrink: 0;
    }
    .setting-drawer .el-icon-takeaway-box::before,
    .setting-drawer .el-icon-chat-dot-round::before {
        font-size: 18px;
        color: #0d7d1b;
        margin-right: 5px;
    }
</style>