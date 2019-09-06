<template>
  <el-container style="height:100%;">
    <el-header
      style="text-align: right; font-size: 12px; line-height: 15px; height:auto; background-color: transparent;"
    >
      <el-button icon="el-icon-edit" size="mini" @click="onDrawer" type="primary" plain>添加微信公众号</el-button>
    </el-header>
    <el-main style="padding-top:0px;">
      <ul class="infinite-list" style="overflow:auto">
        <li v-for="wcset in wclist" :key="wcset._id" class="list-item">
          <el-card class="card-text">
            <div slot="header">
              <span>{{wcset.title}}</span>
              <el-button
                style="float: right; padding: 3px 0;"
                type="text"
                @click="onDel(wcset._id)"
              >
                <i class="el-icon-delete"></i>删除
              </el-button>
              <el-button
                style="float: right; padding: 3px 10px;"
                type="text"
                @click="onSwitchStatus(wcset._id, !wcset.status)"
              >
                <i :class="wcset.status ? 'el-icon-turn-off' : 'el-icon-open' "></i>
                {{wcset.status ? '禁用' : '启用'}}
              </el-button>
            </div>
            <div class="card-text-desc">
              <span class="card-text-tit">AppID:</span>
              {{wcset.appid}}
            </div>
            <div class="card-text-desc">
              <span class="card-text-tit">AppSecret:</span>
              {{wcset.appsecret}}
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
      title="添加微信公众号"
      :visible.sync="drawer"
      direction="rtl"
      :append-to-body="true"
      :show-close="false"
      :modal="false"
      size="50%"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        style="padding:20px;"
        status-icon
        :rules="rules"
      >
        <el-form-item label="名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入微信公众号名称"></el-input>
        </el-form-item>
        <el-form-item label="AppID" prop="appid">
          <el-input v-model="form.appid" placeholder="请输入微信公众号AppID"></el-input>
        </el-form-item>
        <el-form-item label="AppSecret" prop="appsecret">
          <el-input v-model="form.appsecret" placeholder="请输入微信公众号AppSecret"></el-input>
        </el-form-item>
        <el-form-item label="默认目录">
          <el-input v-model="form.expdir" placeholder="导出数据的默认存放目录"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="onClose">关闭</el-button>
        </el-form-item>
      </el-form>
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
        }
      }
    },
    computed: {
      wclist () {
        return this.$store.state.Wechats.wechats
      }
    },
    mounted () {
      console.log('setting mounted')
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
          if (res.c === 0) {
            this.$store.dispatch('refresh_wechats', res.d)
          }
        }).catch(err => {
          console.error(err)
          this.$noti.n({ t: 'error', m: '微信公众号加载失败' })
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
              this.onLoad()
            }
            this.$noti.cc(res)
          }).catch(err => {
            console.error(err)
            this.$noti.n({ t: 'error', m: '微信公众号删除失败' })
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
</style>