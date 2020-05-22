<template>
  <div class="detail">
    <product-param :title="product.name"></product-param>
    <div class="wrapper">
      <div class="container clear">
        <div class="swiper">
          <swiper :options="swiperOption">
            <swiper-slide>
              <img src="/imgs/detail/phone-1.jpg" />
            </swiper-slide>
            <swiper-slide>
              <img src="/imgs/detail/phone-2.jpg" />
            </swiper-slide>
            <swiper-slide>
              <img src="/imgs/detail/phone-3.jpg" />
            </swiper-slide>
            <swiper-slide>
              <img src="/imgs/detail/phone-4.jpg" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="content">
          <h2 class="item-title">{{product.name}}</h2>
          <p class="item-info">
            相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红
            <br />外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏
          </p>
          <div class="delivery">小米自营</div>
          <div class="item-price">
            {{product.price}}
            <span class="del">1999元</span>
          </div>
          <div class="line"></div>
          <div class="item-addr">
            <i class="icon-loc"></i>
            <div class="addr">北京 北京市 朝阳区 安定门街道</div>
            <div class="stock">有现货</div>
          </div>
          <div class="item-version clear">
            <h2>选择版本</h2>
            <div class="phone fl" :class="{'checked': version==1}" @click="version=1">6GB+64GB 全网通</div>
            <div class="phone fr" :class="{'checked': version==2}" @click="version=2">4GB+64GB 移动4G</div>
          </div>
          <div class="item-color clear">
            <h2>选择颜色</h2>
            <div class="phone checked">
              <span class="color"></span>
              深空灰
            </div>
          </div>
          <div class="item-total">
            <div class="phone-info clear">
              <div class="fr">{{product.price}}元</div>
            </div>
            <div class="phone-total">总计：{{product.price}}元</div>
          </div>
          <div class="btn-group">
            <a href="javascript:;" class="btn-huge" @click="addCart">加入购物车</a>
          </div>
        </div>
      </div>
    </div>
    <div class="price-info">
      <div class="container">
        <h2>价格说明</h2>
        <div class="desc">
          <img src="/imgs/detail/item-price.jpeg" />
        </div>
      </div>
    </div>
    <service-bar></service-bar>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import ProductParam from "./../components/ProductParam";
import ServiceBar from "./../components/ServiceBar";
export default {
  name: "detail",
  components: {
    ProductParam,
    ServiceBar,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      id: this.$route.params.id, //商品id
      err: "", 
      version: 1,//商品版本切换
      product: {},//商品信息
      swiperOption: {
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  mounted () {
    this.getProductInfo();
  },
  methods: {
    getProductInfo () {
      this.axios.get(`/products/${this.id}`).then((res) => {
        this.product = res;
      });
    },
    addCart () {
      this.axios.post('/carts', {
        productId: this.id,
        selected: true//加入购物车商品选中状态
      }).then((res) => {
        this.$store.dispatch('saveCartCount', res.cartTotalQuantity);
        this.$router.push('/cart');
      });
    }
  }
};
</script>
<style scoped>
.detail .price-info {
    background-color: #f3f3f3;
    height: 340px;
}
.detail .price-info h2 {
    font-size: 24px;
    color: #333;
    padding-top: 38px;
    margin-bottom: 30px;
}
.detail .wrapper .swiper {
    float: left;
    width: 642px;
    height: 617px;
    margin-top: 5px;
}
.swiper-container{ height:100%;}
.swiper-container img{height:100%;}
.detail .wrapper .content {
    float: right;
    width: 584px;
    height: 870px;
}
.btn-huge {
  margin-left: 10px;
  display: inline-block;
  width: 300px;
  line-height: 54px;
  font-size: 16px;
  text-align: center;
  background-color: #f60;
  color: #fff;
  border: none;
  cursor: pointer;
}

.detail .wrapper .content .item-title {
    font-size: 28px;
    padding-top: 30px;
    padding-bottom: 16px;
    height: 26px;
}
.detail .wrapper .content .item-info {
    font-size: 14px;
    height: 36px;
}
.detail .wrapper .content .delivery {
    font-size: 16px;
    color: #ff6700;
    margin-top: 26px;
    margin-bottom: 14px;
    height: 15px;
}
.detail .wrapper .content .item-price {
    font-size: 20px;
    color: #ff6700;
    height: 19px;
}
.detail .wrapper .content .item-price .del {
    font-size: 16px;
    color: #999;
    margin-left: 10px;
    text-decoration: line-through;
}
.detail .wrapper .content .line {
    height: 0;
    margin-top: 25px;
    margin-bottom: 28px;
    border-top: 1px solid #e5e5e5;
}
.detail .wrapper .content .item-addr {
    height: 108px;
    background-color: #fafafa;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    padding-top: 31px;
    padding-left: 64px;
    font-size: 14px;
    line-height: 14px;
    position: relative;
}
.detail .wrapper .content .item-addr .icon-loc {
    position: absolute;
    top: 27px;
    left: 34px;
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(/imgs/detail/icon-loc.png) no-repeat 50%;
    background-size: contain;
}
.detail .wrapper .content .item-addr .addr {
    color: #666;
}
.detail .wrapper .content .item-addr .stock {
    margin-top: 15px;
    color: #ff6700;
}
.detail .wrapper .content .item-color, .detail .wrapper .content .item-version {
    margin-top: 30px;
}
.detail .wrapper .content .item-color h2, .detail .wrapper .content .item-version h2 {
    font-size: 18px;
    margin-bottom: 20px;
}
.detail .wrapper .content .item-color .phone.checked, .detail .wrapper .content .item-version .phone.checked {
    border: 1px solid #f60; float: left;
    color: #f60;
}
.detail .wrapper .content .item-color .phone, .detail .wrapper .content .item-version .phone {
    width: 287px;
    height: 50px; margin:0 4px 0 0;
    line-height: 50px; float: left;
    font-size: 16px;
    color: #333;
    border: 1px solid #e5e5e5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
}
.detail .wrapper .content .item-color .phone .color, .detail .wrapper .content .item-version .phone .color {
    display: inline-block;
    width: 14px;
    height: 14px;
    background-color: #666;
}
.detail .wrapper .content .item-total {
    height: 108px;
    background: #fafafa;
    padding: 24px 33px 29px 30px;
    font-size: 14px;
    margin-top: 50px;
    margin-bottom: 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.detail .wrapper .content .item-total .phone-total {
    font-size: 24px;
    color: #f60;
    margin-top: 18px;
}
</style>