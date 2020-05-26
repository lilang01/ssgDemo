<template>
  <div class="scan">
    <div class="mask"></div>
    <div class="item-wrap">
      <div class="img-scan"></div>
      <div class="img-pay">
        <div class="title">
          微信支付
          <em @click="close"></em>
        </div>
        <div class="qrcode">
          <img :src="img" />
        </div>
        <div class="tip">
          <p>
            请使用
            <span class="theme-color">微信</span>扫一扫
          </p>
          <p>二维码完成支付</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'scan-pay-code',
  props: ['img'],
  methods: {
    close () {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.scan {
    position: absolute;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
}
.scan .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: .6;
    background-color: #000;
}
.scan .item-wrap {
    position: fixed;
    width: 670px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    align-items: center;
}
.scan .item-wrap .img-scan {
    display: inline-block;
    width: 296px;
    height: 485px;
    background: url(/imgs/pay/icon-scan.png) no-repeat 50%;
    background-size: contain;
}
.scan .item-wrap .img-pay {
    width: 370px;
    height: 440px;
    display: inline-block;
    background-color: #fff;
}
.scan .item-wrap .img-pay .title {
    position: relative;
    height: 60px;
    line-height: 60px;
    color: #333;
    font-size: 20px;
    padding: 0 18px;
    background-color: #f5f5f5;
}
.scan .item-wrap .img-pay .title em {
    position: absolute;
    top: 23.5px;
    right: 20px;
    display: inline-block;
    width: 13px;
    height: 13px;
    background: url(/imgs/icon-close.png) no-repeat 50%;
    background-size: contain;
    cursor: pointer;
}
.scan .item-wrap .img-pay .qrcode {
    text-align: center;
    padding: 44px 0 26px;
}
.scan .item-wrap .img-pay .qrcode img {
    width: 237px;
    height: 240px;
}
.scan .item-wrap .img-pay .tip {
    text-align: center;
    font-size: 14px;
    color: #333;
}
.scan .item-wrap .img-pay .tip {
    text-align: center;
    font-size: 14px;
    color: #333;
}
</style>