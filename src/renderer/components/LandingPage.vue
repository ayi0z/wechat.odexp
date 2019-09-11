<template>
    <el-container style="height: 100vh; border: 1px solid #eee">
        <el-aside width="140px" style="background-color: rgb(238, 241, 246)">
            <el-menu
                :default-active="mainView"
                :default-openeds="['1', '2']"
                @select="onMenuSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
            >
                <el-menu-item index="welcome">
                    <template slot="title">
                        <i class="el-icon-star-off"></i> Welcome
                    </template>
                </el-menu-item>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-user"></i>OpenID
                    </template>
                    <el-menu-item index="userinfo" style="padding-left:45px;">用户信息</el-menu-item>
                    <el-menu-item index="usersummary" style="padding-left:45px;">粉丝数据</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-data-line"></i>图文数据
                    </template>
                    <el-menu-item index="datacube" style="padding-left:45px;">图文数据</el-menu-item>
                </el-submenu>
                <el-menu-item index="setting">
                    <template slot="title">
                        <i class="el-icon-setting"></i> 设置
                    </template>
                </el-menu-item>
                <el-menu-item index="about">
                    <template slot="title">
                        <i class="el-icon-info"></i> 关于
                    </template>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <component v-bind:is="mainView"></component>
        </el-main>
    </el-container>
</template>

<script>
    import Welcome from './Welcome.vue'
    import UserInfo from './UserInfo.vue'
    import UserSummary from './UserSummary.vue'
    import Datacube from './Datacube.vue'
    import Setting from './Setting.vue'
    import About from './About.vue'
    export default {
      name: 'landing-page',
      components: {
        welcome: Welcome,
        usersummary: UserSummary,
        datacube: Datacube,
        setting: Setting,
        about: About,
        userinfo: UserInfo
      },
      data () {
        return {
          mainView: 'usersummary'
        }
      },
      methods: {
        onMenuSelect (index, path) {
          this.mainView = index
        }
      }
    }
</script>

<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'PingFang SC', 'Helvetica Neue', 'Helvetica',
            'Hiragino Sans GB', Arial, sans-serif;
    }

    .el-header {
        background-color: #b3c0d1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
    .el-submenu .el-menu-item {
        min-width: 100px;
        font-size: 12px;
    }
    .el-submenu__title {
        padding-left: 5px;
    }
    .el-notification__content p {
        word-break: break-all;
    }
</style>