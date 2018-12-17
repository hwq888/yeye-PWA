<!--提示Alert弹窗-->
<template>
  <div v-transfer-dom class="alertBox">
    <alert v-model="show" :button-text="buttonText">
      <div class="tl msgBox">{{content}}</div>
    </alert>
  </div>
</template>
<script>
  import {Alert, TransferDomDirective as TransferDom} from 'vux'
  export default {
    directives: {TransferDom},
    components: {Alert},
    props: ['content', 'buttonText'],
    data () {
      return {
        show: false
      }
    },
    created () {
      this.$bus.$off('showDialogAlert')
      this.$bus.$on('showDialogAlert', (data) => {
        this.show = true
      })
    },
    computed: {
    },
    watch: {

    },
    mounted () {

    },
    methods: {
    }
  }
</script>

<style>
  .alertBox .weui-dialog__ft:after{ border: none!important; }
  .alertBox .weui-dialog__ft a{ padding-right: 35px;text-align: right; font-size: 0.3rem;}
  .alertBox .weui-dialog__bd{padding:0.5rem 0.2rem!important;}
</style>
<style lang="less" scoped>
  .msgBox{ color: #333; padding: 0 15px; font-size: 0.3rem; line-height: 0.45rem;}
</style>


