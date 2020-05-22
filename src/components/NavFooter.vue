<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt />
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href>黄松祥个人主页</a>
      <span>|</span>
      <a href>黄松祥个人主页</a>
      <span>|</span>
      <a href>黄松祥个人主页</a>
      <span>|</span>
      <a href>黄松祥个人主页</a>
      <span>|</span>
      <a href>黄松祥个人主页</a>
    </div>
    <div class="copyright">
      Copyright ©2019
      <span class="domain">mi.futurefe.com</span> All Rights Reserved.
    </div>
  </div>
</template>
<script>
export default {
  name: "nav-footer"
};
</script>

<style scoped>
.footer {
  height: 234px;
  border-top: 4px solid #f60;
  background-color: #333;
  color: #999;
  font-size: 16px;
  text-align: center;
}
.footer .footer-logo {
  margin-top: 46px;
  margin-bottom: 31px;
}
.footer .footer-link {
  margin-bottom: 13px;
}
.footer .footer-logo img {
  width: 53px;
  height: 36px;
  margin-bottom: 13px;
}
.footer .footer-link a {
  color: #999;
  display: inline-block;
}
.footer .footer-link span {
  margin: 0 10px;
}
.footer .copyright .domain {
    color: #f60;
}
</style>