<!--银行卡限额列表-->
<template>
  <div>
    <div class="rel popup_header">选择银行及限额<i class="abs popup_colse" @click="showPopup = false"></i></div>
    <div class="rel popup_content">
      <ul class="popupBank_box">
        <li v-for="item in bankLiks" @click="checkBank(item)">
          <p class="fl"><img class="bank_ico" :src="'./static/images/bank/'+item.bankCode+'.png'"></p>
          <div class="fl popup_bank_name">
            <p class="fs30">{{item.bankName}}</p>
            <p class="fs22 c_999">{{item.desc}}</p>
          </div>
          <i class="abs check_now" v-if="form.bankCode==item.bankCode"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
</script>
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
