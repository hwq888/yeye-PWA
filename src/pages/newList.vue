<template>
  <div>
    <section>
      <panel header="" :list="list" :type="type" @on-img-error="onImgError"></panel>
    </section>
  </div>
</template>
<script>
  import { Panel, Group, Radio } from 'vux'
  import api from '../assets/js/Api'
  export default {
    components: {
      Panel,
      Group,
      Radio
    },
    data () {
      return {
        type: '1',
        list: [
        //   {
        //   src: 'https://cdn4.buysellads.net/uu/1/23814/1542654517-explore-graphics-1.jpg',
        //   // fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        //   title: '标题一',
        //   desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        //   url: '/component/cell'
        // }, {
        //   src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        //   title: '标题二',
        //   desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        //   url: {
        //     path: '/component/radio',
        //     replace: false
        //   },
        //   meta: {
        //     source: '来源信息',
        //     date: '时间',
        //     other: '其他信息'
        //   }
        // }
        ],
        footer: {
          title: 'more',
          url: 'http://vux.li'
        }
      }
    },
    created () {
    },
    computed: {
    },
    watch: {
    },
    mounted () {
      // this.$store.commit('SHOWTOAST', '缓存已经更新到：xinwen_v1.0.3')
      this.getNewList()
    },
    methods: {
      onImgError (item, $event) {
        console.log(item, $event)
      },
      getNewList () {
        let params = {}
        this.$store.commit('UPDATE_LOADING', true)
        api.getNewList(params).then(res => {
          // debugger
          if (res) {
            this.$store.commit('UPDATE_LOADING', false)
            if (res.code === 0) {
              this.list = res.list
            } else {
              this.$store.commit('SHOWTOAST', res.msg)
            }
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
</style>



