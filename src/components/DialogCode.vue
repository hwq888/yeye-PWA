<!--短信确认弹窗-->
<template>
  <div v-transfer-dom class="dialog_box">
    <popup v-model="showModel" is-transparent position="top" height="100%">
      <div class="showModel_box rel tc">
        <img class="sms_ico" src="../assets/images/ico/sms.png">
        <p class="sms_text fs36">短信验证码</p>
        <p class="fs24 c_999 sms_text_d">为了账户安全，请填写短信验证码</p>
        <p class="fs24 c_999 sms_text_d">短信验证码由第三方发送，请注意查收!</p>
        <div class="showModel_from_box">
          <div class="sm_from_input_box mb20">{{form.bankMobile}}</div>
          <div class="sm_from_input_box">
            <x-input class="mt20" placeholder="请输入短信验证码" novalidate type="tel" :max="6" v-model="smsCode" >
              <i slot="right" class="input_right_btn input_right_current" @click="getCode">{{getCodeText}}</i>
            </x-input>
          </div>
        </div>
        <div class="dialog-btn-box">
          <a @click="ColseDialog">取消</a>
          <a class="determine" @click="bindCardSumbit">确认支付</a>
        </div>
      </div>
    </popup>
  </div>
</template>
<script>
  import { Popup, XInput, TransferDom } from 'vux'
  import API from '../assets/js/Api'
  export default {
    directives: {TransferDom},
    components: {Popup, XInput},
    props: ['form'],
    data () {
      return {
        showModel: false,
        DlalogCodeData: '',
        retCode: '', // 预签约唯一码
        smsCode: '', // 手机验证码
        getCodeText: '获取验证码',
        getCodeBoolean: false // 是否在获取验证码中
      }
    },
    created () {
      this.$bus.$off('showDialogCode')
      this.$bus.$on('showDialogCode', (data) => {
        this.DlalogCodeData = data || ''
        this.showModel = true
      })
    },
    methods: {
      ColseDialog () {
        this.showModel = false
      },
      getCode () {
        // 获取验证码
        const _this = this
        if (!_this.getCodeBoolean) {
          const _phone = _this.form.bankMobile
          if (!_phone) {
            _this.$store.commit('SHOWTOAST', '请输入手机号码')
          } else if (!_this.$Utils.regExp.phone.test(_phone)) {
            _this.$store.commit('SHOWTOAST', '请输入正确手机号码')
          } else {
            _this.$store.commit('UPDATE_LOADING', true)
            setTimeout(() => {
              let params = {
                bankCardNo: _this.$Utils.bankCardNumUtil(_this.form.bankNum), // 银行卡号
                real_name: _this.form.realName, // 持卡人姓名
                idNumber: _this.form.idCard, // 身份证件号
                mobile: _this.form.bankMobile, // 银行手机号
                id: _this.$Utils.getCookie('UserToken') // 用户id加密串，aes
//                bankCode: _this.form.bankCode // 银行编码
              }
              API.BaofooPreBindCard(params).then(res => {
                _this.$store.commit('UPDATE_LOADING', false)
                if (res.code === '0000') {
                  _this.retCode = res.data.retCode
                  _this.$store.commit('SHOWTOAST', '短信发送成功')
                  _this.getCodeBoolean = true // 配置按钮不可点击
                  let total = 60
                  _this.getCodeText = total + '秒后重发'
                  _this.interval = setInterval(() => {
                    _this.getCodeText = total-- + '秒后重发'
                    if (total < 0) {
                      _this.getCodeBoolean = false
                      _this.interval && clearInterval(_this.interval)
                      _this.getCodeText = '获取验证码'
                    }
                  }, 1000)
                } else {
                  _this.$store.commit('SHOWTOAST', res.msg)
                }
              })
            }, 250)
          }
        }
      },
      bindCardSumbit () {
        const _this = this
        if (!_this.smsCode) {
          _this.$store.commit('SHOWTOAST', '请输入手机验证码')
        } else if (!_this.retCode) {
          _this.$store.commit('SHOWTOAST', '请先获取手机验证码')
        } else {
          _this.ColseDialog() // 关闭弹窗
          _this.$store.commit('UPDATE_LOADING', true)
          setTimeout(() => {
            let params = {
              uniqueCode: _this.retCode, // 预签约唯一码，获取验证码绑卡接口返回的
              bankCardNo: _this.$Utils.bankCardNumUtil(_this.form.bankNum), // 银行卡号
              idNumber: _this.form.idCard, // 身份证件号
              billId: _this.form.billIds, // 还款账单id，英文逗号分隔
              id: _this.$Utils.getCookie('UserToken'), // 用户id加密串，aes
              smsCode: _this.smsCode, // 预绑卡获得的短信验证码
              bankCode: _this.form.bankCode, // 银行编码
              mobile: _this.form.bankMobile, // 持卡人手机号
              real_name: _this.form.realName // 持卡人真实姓名
            }
            API.BaofooBindCard(params).then(res => {
              _this.$store.commit('UPDATE_LOADING', false)
              _this.$emit('dialogCallBack', res)
            })
          }, 250)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .dialog_box .vux-popup-dialog {  transition-duration: 500ms  }
  .dialog_box .vux-popup-dialog {  overflow-y: hidden;  }
  .showModel_box {
    line-height: 1;  width: 76%;  padding: 0.75rem 0 0.88rem;  margin: 2rem 12%;  border-radius: 0.2rem;  background: #fff;
    .sms_ico {  width: 1.2rem;  height: auto;  margin-bottom: 0.15rem  }
    .sms_text {  font-weight: bold;  color: #4b83ff;  margin-bottom: 0.25rem;  }
    .sms_text_d {  line-height: 0.4rem  }
    .showModel_from_box {  margin: 10% 5%;  font-size: 0.28rem;  }
    .sm_from_input_box {  border: 0.01rem solid #ccc;  overflow: hidden;  height: 0.55rem;  line-height: 0.55rem;  text-align: left;  padding: 0.1rem 0.2rem;  }
    .sm_from_input_box .weui-cell {  margin: 0 !important;  padding: 0 !important;  }
    .sm_from_input_box .weui-cell:after {  border: 0 !important;  }
    .input_right_btn {  position: relative;  display: inline-block;  font-size: 0.28rem;  padding-left: 15px;  margin-left: 10px;  color: #ccc;  vertical-align: middle;  }
    .input_right_current {  color: #333;  }
    .input_right_btn:before {
      content: " ";  position: absolute;  left: 0;  top: 0.07rem;
      bottom: 0;  right: 0;  height: 0.75rem;
      width: 0.01rem;  border-left: 0.01rem solid #D9D9D9;  color: #D9D9D9;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    .dialog-btn-box {  border-top: 0.01rem solid #e7e7e7;  }
    .dialog-btn-box a {  display: block;  float: left;  width: 49%;  text-align: center;  height: 0.88rem;  line-height: 0.88rem;  font-size: 0.32rem  }
    .determine {  color: #4b83ff;  border-left: 0.01rem solid #e7e7e7;  }
  }
</style>


