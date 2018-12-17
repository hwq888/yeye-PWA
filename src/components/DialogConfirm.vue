<!--确认Confirm弹窗-->
<template>
    <div v-transfer-dom class="confirmBox">
      <x-dialog v-model="show" hide-on-blur>
        <div class="dialog-demo">
          <div class="msgBox tc" v-html="content"></div>
        </div>

        <div class="dialog-btn-box" v-bind:class="[hideCanle ? 'dialog-btn-box-one' : 'dialog-btn-box-two']">
          <a @click="ColseDialog" v-if="!hideCanle">取消</a>
          <a class="determine" @click="CallBack">{{buttonText}}</a>
        </div>

      </x-dialog>
    </div>
</template>
<script>
  import {XDialog, TransferDomDirective as TransferDom} from 'vux'
  export default {
    directives: {TransferDom},
    components: {XDialog},
    props: ['content', 'buttonText', 'hideCanle'],
    data () {
      return {
        show: false,
        returnData: ''// 传递的参数
      }
    },
    created () {
      this.$bus.$off('showDialogConfirm')
      this.$bus.$on('showDialogConfirm', (data) => {
        this.returnData = data || ''
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
      ColseDialog () {
        this.show = false
      },
      CallBack () {
        this.show = false
        this.$emit('DialogConfirmCallBack')
      }
    }
  }
</script>
<style>
  .confirmBox .weui-dialog__ft:after{ border: none!important; }
  .confirmBox .weui-dialog__bd{padding:0.5rem 0.2rem!important;}
</style>
<style lang="less" scoped>
  .dialog-demo{ padding:0.5rem 0.2rem;}
  .msgBox{ color: #333; padding: 0 15px; font-size: 0.3rem; line-height: 0.45rem;}
  .dialog-btn-box{border-top:1px solid #e7e7e7;}
  .dialog-btn-box-one {
    a{display: block; float: left; width: 100%; text-align: center; height:1rem; line-height:1rem; font-size: 0.32rem; color: #4C83FF;}
  }
  .dialog-btn-box-two {
    a{display: block; float: left; width: 49%; text-align: center; height:1rem; line-height:1rem; font-size: 0.32rem;}
    a.determine{ color: #4C83FF;border-left: 1px solid #e7e7e7;}
  }

</style>


