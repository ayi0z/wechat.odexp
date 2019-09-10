<template>
    <div>
        <nav-wechats @tabclick="doTabClick"></nav-wechats>
        <openid v-show="wechat" :wechat="wechat"></openid>
    </div>
</template>

<script>
    import NavWechats from './navbar/Wechats'
    import BodyOpenId from './body/OpenId'
    export default {
      name: 'userinfo',
      components: {
        NavWechats,
        openid: BodyOpenId
      },
      data () {
        return {
          wechat: undefined
        }
      },
      methods: {
        doTabClick (wx) {
          this.wechat = wx
        }
      }
    }
</script>

<style>
</style>