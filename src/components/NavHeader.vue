<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container clear">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <template v-if="this.username">
            <a href="javascript:;">{{username}}</a>
            <a href="javascript:;" @click="logout">退出</a>
            <a href="javascript:;" @click="goToOrder">我的订单</a>
          </template>
          <template v-else>
          <a href="javascript:;" @click="login">登录</a>
          <a href="javascript:;">注册</a>
          </template>
          <a href="javascript:;" class="my-cart" @click="goToCart">
            <span class="icon-cart"></span>购物车({{cartCount}})
          </a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container clear">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product" v-for="(item,index) in phoneList" :key="index">
                  <a :href="'/#/product/'+item.id" target="_blank">
                    <div class="pro-img">
                      <img :alt="item.subtitle" :src="item.mainImage" />
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
          </div>
          <div class="item-menu">
            <span>电视</span>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "nav-header",
  data() {
    return {
      phoneList: []
    };
  },
  computed:{
    username(){
      return this.$store.state.username;
    },
    cartCount(){
      return this.$store.state.cartCount;
    }
  },
  filters: {
    currency(val) {
      if (!val) {
        return "0.00";
      }
      return "￥" + val.toFixed(2) + "元";
    }
  },
  mounted() {
    this.getProductList();
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    logout () {
      this.axios.post('/user/logout').then(() => {
        // this.$message.success('退出成功');
        this.$store.dispatch('saveUserName', '');
        this.$store.dispatch('saveCartCount', 0);
        this.$cookie.set('userId', {}, {expires: -1});
      });
    },
    goToCart() {
      this.$router.push("/cart");
    },
    goToOrder() {
      this.$router.push("/order/list");
    },
    getProductList() {
      this.axios
        .get("/products", {
          params: {
            categoryId: "100012"
          }
        })
        .then(res => {
          if (res.list.length > 6) {
            this.phoneList = res.list.slice(0, 6);
          }
        });
    }
  }
};
</script>

<style scoped>
.topbar-menu {
  float: left;
}
.topbar-user {
  float: right;
}
.header .nav-topbar {
  height: 39px;
  line-height: 39px;
  background-color: #333;
  color: #b0b0b0;
}
.container {
  position: relative;
  width: 1226px;
  margin-right: auto;
  margin-left: auto;
}
.header .nav-topbar .container a {
  display: inline-block;
  color: #b0b0b0;
  margin-right: 17px;
}
.header .nav-topbar .container .my-cart {
  width: 110px;
  background-color: #f60;
  text-align: center;
  color: #fff;
  margin-right: 0;
}
.header .nav-topbar .container .my-cart .icon-cart {
  display: inline-block;
  width: 16px;
  height: 12px;
  background: url(/imgs/icon-cart-checked.png) no-repeat 50%;
  background-size: contain;
  margin-right: 4px;
}

.header-logo,
.header-logo a {
  display: inline-block;
  height: 55px;
}
.header-logo a {
  width: 110px;
}
.header-logo {
  float: left;
  margin: 30px 0 0 0;
  width: 55px;
  background-color: #f60;
}
.header-logo a:after,
.header-logo a:before {
  content: " ";
  display: inline-block;
  width: 55px;
  height: 55px;
}
.header-logo a:after {
  background: url(/imgs/mi-home.png) no-repeat 50%;
  background-size: 55px;
}
.header-logo a:before {
  background: url(/imgs/mi-logo.png) no-repeat 50%;
  background-size: 55px;
  transition: margin 0.2s;
}
.header-logo a:hover:before {
  margin-left: -55px;
}
/* 头部中间菜单 */
.header .nav-header .container .header-menu {
  display: inline-block;
  width: 643px;
  padding-left: 209px;
}
.header .nav-header .container .header-menu .item-menu {
  display: inline-block;
  color: #333;
  font-weight: 700;
  font-size: 16px;
  line-height: 112px;
  margin-right: 20px;
}
.header .nav-header .container .header-menu .item-menu span {
  cursor: pointer;
}
/* 头部右边搜索框 */
.header .nav-header .container .header-search {
  width: 319px;
  margin: 30px 0 0 0;
  float: right;
}
.header .nav-header .container .header-search .wrapper {
  height: 50px;
  border: 1px solid #e0e0e0;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.header .nav-header .container .header-search .wrapper input {
  border: none;
  box-sizing: border-box;
  border-right: 1px solid #e0e0e0;
  width: 264px;
  height: 50px;
  padding-left: 14px;
}
.header .nav-header .container .header-search .wrapper a {
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url(/imgs/icon-search.png) no-repeat 50%;
  background-size: contain;
  margin-left: 17px;
}
.header .nav-header .container .header-menu .item-menu .children {
  position: absolute;
  top: 112px;
  left: 0;
  width: 1226px;
  height: 0;
  opacity: 0;
  overflow: hidden;
  border-top: 1px solid #e5e5e5;
  box-shadow: 0 7px 6px 0 rgba(0, 0, 0, 0.11);
  z-index: 10;
  transition: all 0.5s;
  background-color: #fff;
}
.header .nav-header .container .header-menu .item-menu:hover .children {
  height: 220px;
  opacity: 1;
}
.header .nav-header .container .header-menu .item-menu .children .product {
  position: relative;
  float: left;
  width: 16.6%;
  height: 220px;
  font-size: 12px;
  line-height: 12px;
  text-align: center;
}
.header
  .nav-header
  .container
  .header-menu
  .item-menu
  .children
  .product:before {
  content: " ";
  position: absolute;
  top: 28px;
  right: 0;
  border-left: 1px solid #d7d7d7;
  height: 100px;
  width: 1px;
}
.header .nav-header .container .header-menu .item-menu .children .product a {
  display: inline-block;
}
.header
  .nav-header
  .container
  .header-menu
  .item-menu
  .children
  .product
  .pro-img {
  height: 137px;
}
.header
  .nav-header
  .container
  .header-menu
  .item-menu
  .children
  .product
  .pro-name {
  font-weight: 700;
  margin-top: 19px;
  margin-bottom: 8px;
  color: #333;
}
.header
  .nav-header
  .container
  .header-menu
  .item-menu
  .children
  .product
  .pro-price {
  color: #f60;
}
.header .nav-header .container .header-menu .item-menu .children .product img {
  width: auto;
  height: 111px;
  margin-top: 26px;
}
</style>