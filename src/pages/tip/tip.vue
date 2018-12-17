<!--公共结果-成功、执行中、失败-->
<template>
  <div>
    <div class="abs mt15 content_box tip_box">
      <div v-if="booleSuc">
        <div class="res_tip_box bg_white flex_column flex_center solidBorderTop solidBorderBottom">
          <img class="res_tip_ico" src="../../assets/images/suc.png"/>
          <p class="fs36 fw_b mt20 text_line">{{Msg}}</p>
          <p class="fs28 c_999 mt20 text_line">{{Des}}</p>
        </div>
        <div class="fixed r_btn_box">
          <a @click="cancel">确定</a>
        </div>
      </div>
      <div v-if="booleError">
        <div class="res_tip_box bg_white flex_column flex_center">
          <img class="res_tip_ico" src="../../assets/images/error.png"/>
          <p class="fs36 fw_b mt20 text_line" v-if="Msg">{{Msg}}</p>
          <p class="fs28 c_999 mt20 text_line" v-if="Des">{{Des}}</p>
        </div>
        <div class="fixed r_btn_box">
          <a @click="cancel">确定</a>
        </div>
      </div>
      <div v-if="booleRun">
        <div class="res_tip_box bg_white flex_column flex_center">
          <img class="res_tip_ico" src="../../assets/images/wait.png"/>
          <p class="fs36 fw_b mt20 text_line" v-if="Msg">{{Msg}}</p>
          <p class="fs28 c_999 mt20 text_line" v-if="Des">{{Des}}</p>
        </div>
        <div class="fixed r_btn_box">
          <a @click="cancel">确定</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        Msg: '',
        Des: '',
        booleSuc: false, // 是否显示成功
        booleError: false, // 是否显示失败
        booleRun: false // 是否显示认证中
      }
    },
    mounted () {
      let _type = this.$route.query.type
      if (_type === 'suc') {
        this.booleSuc = true
      } else if (_type === 'error') {
        this.booleError = true
      } else if (_type === 'run') {
        this.booleRun = true
      }
      this.Msg = this.$route.query.msg
      this.Des = this.$route.query.des
    },
    methods: {
      cancel () {
      }
    }
  }
</script>

<style lang="less" scoped>
  .content_box.tip_box{ padding-bottom: 1rem;}
  .res_tip_box{ padding: 0.88rem 0; margin-bottom: 1rem;}
  .res_tip_ico{ width:0.88rem;}
  .account_box{ height: 1.2rem; line-height: 1.2rem; padding: 0 0.35rem;}

  .r_btn_box{
    bottom:0; left: 0;right:0;
    a{ display: block; float:left; width: 100%; height: 1rem; line-height: 1rem; background: #4C83FF; text-align: center; color: #fff; font-size: 0.34rem;}
  }

</style>
