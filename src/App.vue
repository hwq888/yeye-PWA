<template>
  <div id="app">
    <Header></Header>
    <Loading :show="AppState.loadingShow"></Loading>
    <router-view :class="className"></router-view>
    <toast v-model="AppState.toastShow" type="text" :time="2000" :width="AppState.toastWidth" is-show-mask :text="AppState.toastMsg" @on-hide="onHide"></toast>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import Loading from './components/Loading.vue'
  import {mapState} from 'vuex'
  import {Toast} from 'vux'
  export default {
    components: {
      Header, Loading, Toast
    },
    data () {
      return {
        className: ''
      }
    },
    computed: {
      ...mapState({
        AppState: state => state
      })
    },
    watch: {
      AppState: {
        handler (curVal, oldVal) {
          if (curVal.showHeader) {
            this.className = 'scroll_hide_header_box'
          } else {
            this.className = 'scroll_show_header_box'
          }
        },
        deep: true
      }
    },
    created () {
      // TODO add service worker code here
      // if ('serviceWorker' in navigator) {
      //   navigator.serviceWorker
      //     .register('./sw.js', {scope: '/'})
      //     .then(function () { console.log('Service Worker Registered') })
      // }

      // 用户监听 Notification 的事件
      navigator.serviceWorker.addEventListener('message', function (e) {
        var action = e.data
        console.log(`receive post-message from sw, action is '${e.data}'`)
        switch (action) {
          case 'show-book':
            location.href = 'https://github.com/hwq888/yeye-PWA'
            break
          case 'contact-me':
            location.href = 'hwq888_ok@163.com'
            break
          default:
            document.querySelector('.panel').classList.add('show')
            break
        }
      })

      // 获取提醒权限
      function askPermission () {
        return new Promise(function (resolve, reject) {
          var permissionResult = Notification.requestPermission(function (result) {
            resolve(result)
          })

          if (permissionResult) {
            permissionResult.then(resolve, reject)
          }
        }).then(function (permissionResult) {
          if (permissionResult !== 'granted') {
            throw new Error('We weren\'t granted permission.')
          }
        })
      }

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js', {scope: '/'})
          .then(function (registration) {
            return Promise.all([
              registration,
              askPermission()
            ])
          })
          .then((result) => {
            setTimeout(() => {
              const registration = result[0]
              /* ===== 添加提醒功能 ====== */
              // document.querySelector('#js-notification-btn').addEventListener('click', function () {
              const title = 'PWA即学即用'
              const options = {
                body: '邀请你一起学习',
                icon: './static/images/bank/0102.png',
                actions: [{
                  action: 'show-book',
                  title: '去看看'
                }, {
                  action: 'contact-me',
                  title: '联系我'
                }],
                tag: 'pwa-starter',
                renotify: true
              }
              registration.showNotification(title, options)
              // })
            }, 500)
          })
          .then(function () { console.log('Service Worker Registered') })
      }
    },
    mounted () {
      let _this = this
      _this.$router.beforeEach(function (to, from, next) {
        _this.$store.commit('UPDATE_LOADING', true)
        next()
      })
      _this.$router.afterEach(function (to) {
        _this.$store.commit('UPDATE_LOADING', false)
      })
    },
    methods: {
      onHide () {
        this.$store.commit('CLEARSHOWTOAST')
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
</style>
