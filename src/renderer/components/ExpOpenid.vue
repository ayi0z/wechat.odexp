<template>
  <div>
    <nav-wechats @tabclick="doTabClick"></nav-wechats>
    <openid v-show="wechat" :wechat="wechat"></openid>
  </div>
</template>

<script>
  import NavWechats from './navbar/Wechats'
  import BodyOpenId from './navbody/OpenId'
  export default {
    name: 'expopenid',
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