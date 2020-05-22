<template>
  <div>
    <div class="nav-bar" :class="{'is_fixed': isFixed}">
      <div class="container">
        <div class="pro-title">{{title}}</div>
        <div class="pro-param">
          <a href="javascript:;">概述</a>
          <span>|</span>
          <a href="javascript:;">参数</a>
          <span>|</span>
          <a href="javascript:;">用户评价</a>
          <slot name="buy"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "product-param",
  props: {
    title: String
  },
  data() {
    return {
      isFixed: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.initHeight);
  },
  // 页面退出后事件删除监听滚动条事件
  destroyed() {
    window.removeEventListener("scroll", this.initHeight, false);
  },
  methods: {
    initHeight() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isFixed = scrollTop > 152 ? true : false;
    }
  }
};
</script>
<style scoped>
.nav-bar {
  height: 70px;
  line-height: 70px;
  border-top: 1px solid #e5e5e5;
  background-color: #fff;
  z-index: 10;
}
.nav-bar .container {
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
}
.nav-bar .container .pro-title {
  font-size: 18px;
  color: #333;
  font-weight: 700;
}
.nav-bar .container .pro-param {
  font-size: 14px;
}
.nav-bar .container .pro-param a {
  color: #666;
}
.nav-bar .container .pro-param span {
  margin: 0 10px;
}
.nav-bar.is_fixed {
    position: fixed;
    top: 0;
    width: 100%;
    box-shadow: 0 5px 5px #ccc;
}
</style>