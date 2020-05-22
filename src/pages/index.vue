<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <!-- 轮播菜单 -->
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <ul v-for="(item, index) of menuList" :key="index">
                  <li v-for="(sub, subIndex) of item" :key="subIndex">
                    <a :href="sub ? '/#/product/' + sub.id: ''">
                      <img :src="sub? sub.img : '/imgs/item-box-1.png'" />
                      {{sub ? sub.name : '小米9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
            </li>
          </ul>
        </div>
        <!-- 轮播图 -->
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) of slideList" :key="index">
            <a :href="'./#/product/' + item.id">
              <img :src="item.img" alt />
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <!-- 首页广告位 -->
      <div class="ads-box">
        <a :href="'/#/product/' + item.id" v-for="(item, index) of adsList" :key="index">
          <img v-lazy="item.img" />
        </a>
      </div>
      <div class="banner">
        <a href="./#/product/30">
          <img v-lazy="'/imgs/banner-1.png'" />
        </a>
      </div>
    </div>
    <!-- 首页商品 -->
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="./#/product/35">
              <img v-lazy="'/imgs/mix-alpha.jpg'" alt />
            </a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr, i) of phoneList" :key="i">
              <div class="item" v-for="(item, j) of arr" :key="j">
                <span :class="{'new-pro': j%2 === 0}">新品</span>
                <div class="item-img">
                  <img v-lazy="item.mainImage" />
                </div>
                <div class="item-info">
                  <h3>{{item.name}}</h3>
                  <p>{{item.subtitle}}</p>
                  <p class="price" @click="addCart(item.id)">{{item.price}}元</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <service-bar></service-bar>
    <modal
      title="提示"
      sureText="查看购物车"
      btnType="1"
      @submit="goToCart"
      @cancel="showModal= false"
      modalType="middle"
      :showModal="showModal"
    >
      <template v-slot:body>
        <p>商品添加成功!</p>
      </template>
    </modal>
  </div>
</template>

<script>
import ServiceBar from "./../components/ServiceBar";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import Modal from "./../components/Modal";
import "swiper/css/swiper.css";

export default {
  name: "index",
  data() {
    return {
      swiperOption: {
        autoplay: true,
        loop: true,
        effect: "cube",
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      slideList: [
        {
          id: "42",
          img: "/imgs/slider/slide-1.jpg"
        },
        {
          id: "45",
          img: "/imgs/slider/slide-2.jpg"
        },
        {
          id: "46",
          img: "/imgs/slider/slide-3.jpg"
        },
        {
          id: "",
          img: "/imgs/slider/slide-4.jpg"
        },
        {
          id: "",
          img: "/imgs/slider/slide-5.jpg"
        }
      ],
      menuList: [
        [
          {
            id: 30,
            img: "/imgs/item-box-1.png",
            name: "小米CC9"
          },
          {
            id: 31,
            img: "imgs/item-box-2.png",
            name: "小米8青春版"
          },
          {
            id: 32,
            img: "imgs/item-box-3.jpg",
            name: "Redmi K20 Pro"
          },
          {
            id: 33,
            img: "imgs/item-box-4.jpg",
            name: "移动4G专区"
          }
        ],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      adsList: [
        {
          id: 33,
          img: "/imgs/ads/ads-1.png"
        },
        {
          id: 33,
          img: "/imgs/ads/ads-2.jpg"
        },
        {
          id: 33,
          img: "/imgs/ads/ads-3.png"
        },
        {
          id: 33,
          img: "/imgs/ads/ads-4.jpg"
        }
      ],
      phoneList: [],
      showModal: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    goToCart() {
      this.$router.push("/cart");
    },
    init() {
      this.axios
        .get("/products", {
          params: {
            categoryId: 100012,
            pageSize: 14
          }
        })
        .then(res => {
          res.list = res.list.slice(6, 14);
          this.phoneList = [res.list.slice(0, 4), res.list.slice(4, 8)];
        });
    },
    addCart(id) {
      this.axios
        .post("/carts", {
          productId: id,
          selected: true
        })
        .then((res) => {
          this.$store.dispatch('saveCartCount', res.cartTotalQuantity);
          this.showModal = true;
        })
        .catch(() => {
          this.showModal = true;
        });
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    ServiceBar,
    Modal
  }
};
</script>

<style>
.swiper-container {
  height: 451px;
}
.swiper-container img {
  width: 100%;
  height: 451px;
}
.swiper-button-prev {
  left: 274px;
}
.container {
  position: relative;
  width: 1226px;
  margin-right: auto;
  margin-left: auto;
}
.index .swiper-box .nav-menu {
  position: absolute;
  width: 264px;
  height: 451px;
  z-index: 9;
  padding: 26px 0;
  background-color: rgba(85, 88, 90, 0.48);
  box-sizing: border-box;
}
.index .swiper-box .nav-menu .menu-wrap .menu-item {
  height: 50px;
  line-height: 50px;
}
.index .swiper-box .nav-menu .menu-wrap .menu-item a {
  position: relative;
  display: block;
  font-size: 16px;
  color: #fff;
  padding-left: 30px;
}
.index .swiper-box .nav-menu .menu-wrap .menu-item .children {
  display: none;
  width: 962px;
  height: 451px;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 264px;
  border: 1px solid #e5e5e5;
}
.index .swiper-box .nav-menu .menu-wrap .menu-item .children ul {
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  height: 75px;
}
.index .swiper-box .nav-menu .menu-wrap .menu-item .children ul li {
  height: 75px;
  line-height: 75px;
  -webkit-box-flex: 1;
  flex: 1;
  padding-left: 23px;
}
.index .swiper-box .nav-menu .menu-wrap .menu-item .children ul img {
  width: 42px;
  height: 35px;
  vertical-align: middle;
  margin-right: 15px;
}
.index .swiper-box .nav-menu .menu-wrap .menu-item .children ul a {
  color: #333;
  font-size: 14px;
}
.index .swiper-box .nav-menu .menu-wrap .menu-item a:after {
  position: absolute;
  right: 30px;
  top: 17.5px;
  content: " ";
  display: inline-block;
  width: 10px;
  height: 15px;
  background: url(/imgs/icon-arrow.png) no-repeat 50%;
  background-size: contain;
}
.index .swiper-box .nav-menu .menu-wrap .menu-item:hover {
  background-color: #f60;
}
.index .swiper-box .nav-menu .menu-wrap .menu-item:hover .children {
  display: block;
}
.index .ads-box {
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  margin-top: 14px;
  margin-bottom: 31px;
}
.index .banner {
  margin-bottom: 50px;
}
.index .ads-box a {
  width: 296px;
  height: 167px;
}
a img {
  width: 100%;
  height: 100%;
}
.index .product-box {
  background-color: #f5f5f5;
  padding: 30px 0 50px;
}
.index .product-box h2 {
  font-size: 22px;
  height: 21px;
  line-height: 21px;
  color: #333;
  margin-bottom: 20px;
}
.index .product-box .wrapper {
  display: flex;
}
.index .product-box .wrapper .banner-left {
  margin-right: 16px;
}
.index .product-box .wrapper .banner-left img {
  width: 224px;
  height: 619px;
}
.index .product-box .wrapper .list-box .list {
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  width: 986px;
  margin-bottom: 14px;
}
.index .product-box .wrapper .list-box .list .item {
  width: 236px;
  height: 302px;
  background-color: #fff;
  text-align: center;
}
.index .product-box .wrapper .list-box .list .item span.new-pro {
  background-color: #7ecf68;
}
.index .product-box .wrapper .list-box .list .item span {
  display: inline-block;
  width: 67px;
  height: 24px;
  font-size: 14px;
  line-height: 24px;
  color: #fff;
}
.index .product-box .wrapper .list-box .list .item .item-img img {
  width: 100%;
  height: 195px;
}
.index .product-box .wrapper .list-box .list .item .item-info h3 {
  font-size: 14px;
  color: #333;
  line-height: 14px;
  font-weight: 700;
}
.index .product-box .wrapper .list-box .list .item .item-info p {
  color: #999;
  line-height: 13px;
  margin: 6px auto 13px;
}
.index .product-box .wrapper .list-box .list .item .item-info .price {
  color: #f20a0a;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
.index .product-box .wrapper .list-box .list .item .item-info .price:after {
  display: inline-block;
  width: 22px;
  height: 22px;
  background: url(/imgs/icon-cart-hover.png) no-repeat 50%;
  background-size: contain;
  content: " ";
  margin-left: 5px;
  vertical-align: middle;
}
</style>