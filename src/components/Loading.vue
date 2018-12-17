<!--loading-->
<template>
  <div class="loading" v-show="show">
    <div class="loader-inner ball-pulse">
      <spinner type="android" slot="value" class="android"></spinner>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import {Spinner} from 'vux'
  export default {
    name: 'v-loading',
    components: {
      Spinner
    },
    props: {
      show: {
        type: Boolean
      }
    },
    computed: {
      ...mapState([
        'styleColor'
      ])
    }
  }
</script>

<style>
  .loading .loader-inner svg {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
  }
</style>
<style scoped>
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999999;
    width: 100%;
    height: 100%;
  }

  .loading div.ball-pulse {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -28px 0 0 -28px;
    width: 56px;
    height: 56px;
    background: #333;
    border-radius: 5px;
    opacity: 0.9;
  }

  .loading .loader-inner span {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
  }

  .vux-spinner-android {
    stroke: #fff !important;
  }
</style>

