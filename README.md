# odexp

> export openid and datacube from WeChat
> 微信公众号粉丝、图文数据（浏览、下载）

#### Build Setup: npm or yarn

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```

#### /src
```
/src
|---/main              // 主进程
    |---/svrfile          // 文件操作
    |---/svrhttp.js       // axios 
|---/renderer          // 渲染进程
    |---/assets           // 静态文件
    |---/components       // 组件/页面
    |---/db               // nedb数据库操作
    |---/export           // 导出文件操作
    |---/router           // 路由
    |---/store            // vuex 数据缓存
    |---/util             // 工具包
        |---/ctmd.js          // 接口 response 格式
        |---/dic.js           // 字典、配置
        |---/func.js          // 工具方法
        |---/index.js         // 模块入口
        |---/notification.js  // 任务栏通知提醒
        |---/notify.js        // 界面提醒通知
        |---/svr.js           // 主进程通信接口
    |---/wx               // 微信接口操作
    |---/App.vue          // 主页
    |---/main.js          // 入口文件
|---/static            // 静态文件
```
---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
