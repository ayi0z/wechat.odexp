<template>
    <div>{{wechat}}</div>
</template>
<script>
    export default {
      name: 'navbodyopenid',
      props: ['wechat'],
      watch: {
        wechat () {
          console.log(this.wechat)
          this.onLoadOpenId()
        }
      },
      methods: {
        onLoadOpenId () {
          if (this.wechat && this.wechat.token) {
            this.$wx.openid(this.wechat.token)
              .then(res => {
                console.log(res)
                if (res.c === 0) {
                  const openids = res.d.data.openid
                  console.log(openids)
                  this.$wx.users(this.wechat.token, openids)
                    .then(ur => { console.log(ur) })
                }
                this.$noti.err(res)
              })
          }
        }
      }
    }
</script>

<style>
</style>