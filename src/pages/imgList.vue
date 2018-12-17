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
        list: []
      }
    },
    created () {
    },
    computed: {
    },
    watch: {
    },
    mounted () {
      this.getImgList()
    },
    methods: {
      onImgError (item, $event) {
        console.log(item, $event)
      },
      getImgList () {
        let params = {}
        this.$store.commit('UPDATE_LOADING', true)
        api.getImgList(params).then(res => {
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
