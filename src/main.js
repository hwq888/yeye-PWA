// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import router from './router/index'
import App from './App'
import store from './vuex/store'
import './assets/css/base.css'
import httpError from './assets/js/httpError'
import Utils from './assets/js/Utils'
Vue.prototype.$Utils = Utils
Vue.prototype.$bus = new Vue({})
Vue.use(httpError)
Vue.use(VueRouter)
FastClick.attach(document.body)
Vue.config.productionTip = false
/* eslint-disable no-new */
// router.beforeEach((to, from, next) => {
//   // next()
//   if (to.path === '/login' || to.path === '/offline') {
//     next()
//   } else if (!Utils.getCookie('UserToken')) {
//     // token判断，缺少的话重新登录
//     next({path: '/login'})
//   } else {
//     next()
//   }
// })
// router.afterEach((to, from, next) => {
//   // 从路由的元信息中获取 title 属性
//   if (to.meta.title) {
//     document.title = to.meta.title
//     // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
//     if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
//       const hackIframe = document.createElement('iframe')
//       hackIframe.style.display = 'none'
//       hackIframe.src = './static/html/fixIosTitle.html?r=' + Math.random()
//       document.body.appendChild(hackIframe)
//       setTimeout(_ => {
//         document.body.removeChild(hackIframe)
//       }, 300)
//     }
//   }
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
