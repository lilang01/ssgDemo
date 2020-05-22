<template>
  <div class="order-header">
    <div class="container clear">
      <div class="header-logo">
        <a href="/#/index"></a>
      </div>
      <div class="title">
        <h2>
          {{title}}
          <slot name="tip"></slot>
        </h2>
      </div>
      <div class="username">
        <a href="javarcript:;">{{username}}</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "order-header",
  props: {
    title: String
  },
  computed: {
    username() {
        return this.$store.state.username;
    }
  }
};
</script>
<style scoped>
.order-header {
    padding: 30px 0;
    border-bottom: 2px solid #f60;
}
.order-header .header-logo {
    float: left;
}
.header-logo {
    width: 55px;
    background-color: #f60;
}
.header-logo, .header-logo a {
    display: inline-block;
    height: 55px;
}
.header-logo a:after, .header-logo a:before {
    content: " ";
    display: inline-block;
    width: 55px;
    height: 55px;
}
.header-logo a:before {
    background: url(/imgs/mi-logo.png) no-repeat 50%;
    background-size: 55px;
    transition: margin .2s;
}
.header-logo a:after {
    background: url(/imgs/mi-home.png) no-repeat 50%;
    background-size: 55px;
}
.header-logo a:hover:before {
  margin-left: -55px;
}
.order-header .title {
    float: left;
    margin-left: 54px;
}
.header-logo a {
    width: 110px;
}
.order-header .title, .order-header .username {
    display: inline-block;
    height: 55px;
    line-height: 55px;
}
.order-header .title h2 {
    font-size: 28px;
    color: #333;
}
.order-header .title span {
    font-size: 14px;
    margin-left: 17px;
    color: #999;
    font-weight: 200;
}
.order-header .username {
    float: right;
}
.order-header .username a {
    color: #666;
    font-size: 16px;
}
</style>