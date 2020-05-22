<template>
  <div class="login">
    <div class="container">
      <a href="/#/index">
        <img src="/imgs/login-logo.png" />
      </a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">帐号登录</span>
            <span class="sep-line">|</span>
            <span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="username" />
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password" />
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms">手机短信登录/注册</div>
            <div class="reg">
              立即注册
              <span>|</span>
              密记密码？
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <a href="javascript:;" target="_blank">河畔一角主页</a>
        <span>|</span>
        <a href="javascript:;" target="_blank">Vue全栈课程</a>
        <span>|</span>
        <a href="javascript:;" target="_blank">React全家桶课程</a>
        <span>|</span>
        <a href="javascript:;" target="_blank">微信支付专项课程（H5+小程序/云+Node+MongoDB）</a>
      </div>
      <p class="copyright">Copyright ©2019 mi.futurefe.com All Rights Reserved.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      userId: "",
      res: {}
    };
  },
  methods: {
    login() {
      let { username, password } = this;
      this.axios
        .post("user/login", {
          username,
          password
        })
        .then(res => {
          // 把userId存入cookie
          this.$cookie.set("userId", res.id, { expires: "Session" });
          this.$store.dispatch("saveUserName", res.username);
          this.$router.push("/index");
          this.axios.get("/carts/products/sum").then(res => {
            this.$store.dispatch("saveCartCount", res);
          });
        });
    }
  }
};
</script>
<style scoped>
.login > .container {
  height: 113px;
}
.login > .container img {
  width: auto;
  height: 100%;
}
.login .wrapper {
  background: url(/imgs/login-bg.jpg) no-repeat 50%;
}
.login .wrapper .container {
  height: 576px;
}
.login .wrapper .container .login-form {
  box-sizing: border-box;
  padding-left: 31px;
  padding-right: 31px;
  width: 410px;
  height: 510px;
  background-color: #fff;
  position: absolute;
  bottom: 29px;
  right: 0;
}
.login .wrapper .container .login-form h3 {
  line-height: 23px;
  font-size: 24px;
  text-align: center;
  margin: 40px auto 49px;
}
.login .wrapper .container .login-form h3 .checked {
  color: #f60;
}
.login .wrapper .container .login-form h3 .sep-line {
  margin: 0 32px;
}
.login .wrapper .container .login-form .input {
  display: inline-block;
  width: 348px;
  height: 50px;
  border: 1px solid #e5e5e5;
  margin-bottom: 20px;
}
.login .wrapper .container .login-form .input input {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: none;
  padding: 0 18px;
  line-height: 50px;
  font-size: 14px;
}
.login .wrapper .container .login-form .btn {
  width: 100%;
  line-height: 50px;
  margin-top: 10px;
  font-size: 16px;
}
.login .wrapper .container .login-form .tips {
  margin-top: 14px;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  font-size: 14px;
  cursor: pointer;
}
.login .footer {
  height: 100px;
  padding-top: 60px;
  color: #999;
  font-size: 16px;
  text-align: center;
}
.login .footer .footer-link a {
  color: #999;
  display: inline-block;
}
.login .footer .footer-link span {
  margin: 0 10px;
}
.login .footer .copyright {
  margin-top: 13px;
}
.login .wrapper .container .login-form .tips .sms {
  color: #f60;
}
.login .wrapper .container .login-form .tips .reg {
  color: #999;
}
.login .wrapper .container .login-form .tips .reg span {
  margin: 0 7px;
}
</style>