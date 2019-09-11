<template>
    <div>
        <nav-wechats @tabclick="doTabClick"></nav-wechats>
        <fans v-show="wechat" :wechat="wechat"></fans>
    </div>
</template>

<script>
    import NavWechats from './navbar/Wechats'
    import Fans from './body/Fans'
    export default {
      name: 'usersummary',
      components: {
        NavWechats,
        Fans
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