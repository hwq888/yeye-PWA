import Vue from 'vue'
import Router from 'vue-router'
const home = () => import('../pages/home.vue')
const newList = () => import('../pages/newList.vue')
const imgList = () => import('../pages/imgList.vue')
const tip = () => import('../pages/tip/tip.vue')
const nofind = () => import('../pages/tip/nofind.vue')

Vue.use(Router)
/**
 title: '标题', // 顶部标题
 requireAuth: true // 表示进入这个路由是需要登录的
 **/
export default new Router({
  routes: [
    {path: '/', redirect: '/home', meta: {title: '首页'}},
    {path: '/home', component: home, meta: {title: '首页'}},
    {path: '/newList', component: newList, meta: {title: '新闻列表'}},
    {path: '/imgList', component: imgList, meta: {title: '图片列表'}},
    {path: '/tip', component: tip, meta: {title: '提示'}},
    {path: '/nofind', component: nofind, meta: {title: '404'}},
    {path: '*', component: nofind, meta: {title: '404'}}
  ]
})
