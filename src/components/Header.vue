<!--公共头部-->
<template>
  <div v-if="showHeader" class="rel header_box">
    <x-header :left-options="{showBack:showBack,backText: ''}" v-bind:style="{ background: background}">
      <span v-bind:style="{color:color}">{{headerTitle}}</span>
    </x-header>
  </div>
</template>
<script>
  import { XHeader } from 'vux'
  import { mapState } from 'vuex'
  export default {
    components: {
      XHeader
    },
    data () {
      return {
        showBack: false,
        showHome: false,
        showOut: false,
        background: '#409eff',
        color: '#fff',
        showRight: false,
        loginState: false
      }
    },
    computed: {
      ...mapState([
        'headerTitle', 'showHeader', 'ProjectName'
      ])
    },
    mounted () {
      let _this = this
//      console.log(_this.$route)
      _this.configHeader(this.$route)
    },
    watch: {
      '$route' (to, from) {
        this.configHeader(to, from)
      }
    },
    methods: {
      configHeader (to, from) {
        let _this = this
        // if (_this.$route.meta.requireAuth) {
        //   if (!_this.$Utils.getCookie('UserToken')) {
        //     _this.$router.replace({path: '/login'})
        //   }
        // }
        const showHeader = true // 配置是否显示头部
        _this.$store.commit('UPDATE_TITLE', {show: showHeader, title: to.meta.title || this.ProjectName})
        if (to.path === '/home' || to.path === '/') {
          this.showBack = false
        } else {
          this.showBack = true
        }
      }
    }
  }
</script>
<style>
  .vux-header .vux-header-left .left-arrow:before{ border-color: #fff!important;}
</style>
<style lang="less" scoped>
  .header_box {
    overflow: hidden;
    border-bottom: 0.01rem solid #f0f0f0;
  }

  .home_ico {
    right: 12px;
    top: 12px;
    width: 22px;
    height: 22px;
  }

  .header_right_click {
    color: #1b7cc3
  }

  .hader_right_ico {
    width: 20px;
    margin-top: -3px;
  }
</style>
