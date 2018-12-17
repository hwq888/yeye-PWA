<template>
  <div class="fs24 c_999 tc">
    <grid class="mt50">
      <grid-item link="/newList" label="新闻列表">
        <x-icon slot="icon" type="ios-ionic-outline" size="30"></x-icon>
      </grid-item>
      <grid-item link="/imgList" label="图片列表">
        <x-icon slot="icon" type="ios-ionic-outline" size="30"></x-icon>
      </grid-item>
    </grid>

    <!--<router-link to="/newList">新闻列表</router-link>-->
    <!--<router-link to="/imgList">图片列表</router-link>-->
    <section class="mt50 tl pl20">
      <div>PWA功能要点：</div>
      <div>
        1、Web App Manifest(已支持)<br>
        2、skeleton/appShell(已支持)<br>
        3、Service Worker(已支持)<br>
        4、Cache API 缓存(已支持)<br>
        5、通知（已支持）<br>
        6、消息推送（未支持）<br>
        5、Push&Notification 通知与推送（未支持）<br>
        6、Background Sync 后台同步（未支持）<br>
      </div>
    </section>
  </div>
</template>
<script>
  import { Grid, GridItem, GroupTitle } from 'vux'
  export default {
    components: {
      Grid,
      GridItem,
      GroupTitle
    },
    data () {
      return {}
    },
    created () {
    },
    computed: {
    },
    watch: {
    },
    mounted () {
    },
    methods: {
      onItemClick () {
        console.log('on item click')
      }
    }
  }
</script>
<style lang="less" scoped>
  .grid-center {
    display: block;
    text-align: center;
    color: #666;
  }
  .weui-grids {
    background-color: #fff;
  }
</style>



