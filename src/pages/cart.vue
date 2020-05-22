<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1">
              <span class="checkbox" :class="{'checked': allChecked}" @click="toggleAll"></span>全选
            </li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(item, index) of list" :key="index">
              <div class="item-check">
                <span
                  class="checkbox"
                  :class="{'checked': item.productSelected}"
                  @click="updateCart(item)"
                ></span>
              </div>
              <div class="item-name">
                <img v-lazy="item.productMainImage" />
                <span>{{item.productName + ' , ' + item.productSubtitle}}</span>
              </div>
              <div class="item-price">{{item.productPrice}}元</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item, '-')">-</a>
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;" @click="updateCart(item, '+')">+</a>
                </div>
              </div>
              <div class="item-total">{{item.productTotalPrice}}元</div>
              <div class="item-del" @click="delProduct(item)"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/">继续购物</a>
            共
            <span>{{list.length}}</span>件商品，已选择
            <span>{{checkedNum}}</span>件
          </div>
          <div class="total fr">
            合计：
            <span>{{cartTotalPrice}}</span>元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from "./../components/OrderHeader";
import ServiceBar from "./../components/ServiceBar";
import NavFooter from "./../components/NavFooter";
export default {
  name: "cart",
  components: {
    OrderHeader,
    NavFooter,
    ServiceBar
  },
  data() {
    return {
      allChecked: false, //是否全选
      list: [], //商品列表
      cartTotalPrice: 0, //商品总金额
      checkedNum: 0 //选中商品数量
    };
  },
  mounted() {
    this.getCartList();
  },
  computed: {},
  methods: {
    //获取购物车列表
    getCartList() {
      this.axios.get("/carts").then(res => {
        this.renderData(res);
      });
    },
    //公共赋值
    renderData(res) {
      this.list = res.cartProductVoList || [];
      this.allChecked = res.selectedAll;
      this.cartTotalPrice = res.cartTotalPrice;
      this.checkedNum = this.list.filter(item => item.productSelected).length;
    },
    //更新购物车商品数量和状态
    updateCart(item, type) {
      let quantity = item.quantity;
      let selected = item.productSelected;

      if (type == "-") {
        if (quantity == 1) {
          Message.warning("商品至少保留一件");
          return;
        }
        --quantity;
      } else if (type == "+") {
        if (quantity >= item.productStock) {
          Message.warning("商品不能超过库存数量");
          return;
        }
        ++quantity;
      } else {
        selected = !selected;
      }
      this.axios
        .put(`carts/${item.productId}`, {
          quantity,
          selected
        })
        .then(res => {
          this.renderData(res);
        });
    },
    //控制全选功能
    toggleAll() {
      let url = this.allChecked ? "carts/unSelectAll" : "/carts/selectAll";
      this.axios.put(url).then(res => {
        this.renderData(res);
      });
    },
    //删除购物车商品
    delProduct(item) {
      MessageBox.confirm("确认删除商品？", "删除商品", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.axios.delete(`/carts/${item.productId}`).then(res => {
            Message.success("删除成功");
            this.renderData(res);
          });
        })
        .catch(() => {
          return;
        });
    },
    //购物车下单
    order () {
      // 检测list数组是否都是未选中,只要有一个选中,则返回true
      let isCheck = this.list.every(item => !item.productSelected);
      if (isCheck) {
        Message.warning('请选择一件商品');
        return;
      }
      this.$router.push('/order/confirm');
    }
  }
};
</script>

<style scoped>
.cart .wrapper {
  background-color: #f5f5f5;
  padding-top: 30px;
  padding-bottom: 114px;
}
.cart .wrapper .cart-box {
  background-color: #fff;
  font-size: 14px;
  color: #999;
  text-align: center;
}
.cart .wrapper .order-wrap {
  font-size: 14px;
  color: #666;
  margin-top: 20px;
  height: 50px;
  line-height: 50px;
}
.cart .wrapper .order-wrap .cart-tip {
  margin-left: 29px;
  float: left;
}
.cart .wrapper .order-wrap .total {
  font-size: 14px;
  float: right;
  color: #f60;
}
.cart .wrapper .order-wrap .total span {
  font-size: 24px;
}
.cart .wrapper .order-wrap .total a {
  width: 202px;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  margin-left: 37px;
}
.cart .wrapper .order-wrap .cart-tip a {
  color: #666;
  margin-right: 37px;
}
.cart .wrapper .order-wrap .cart-tip span {
  color: #f60;
  margin: 0 5px;
}
.cart .wrapper .cart-box .cart-item-head {
  display: flex;
  height: 79px;
  line-height: 79px;
}
.cart .wrapper .cart-box .cart-item-head .col-1 {
  flex: 1;
}
.cart .wrapper .cart-box .checkbox.checked {
  background: url(/imgs/icon-gou.png) #f60 no-repeat 50%;
  background-size: 16px 12px;
  border: none;
}
.cart .wrapper .cart-box .checkbox {
  display: inline-block;
  width: 22px;
  height: 22px;
  border: 1px solid #e5e5e5;
  vertical-align: middle;
  margin-right: 17px;
  cursor: pointer;
}
.cart .wrapper .cart-box .cart-item-head .col-3 {
  flex: 3;
}
.cart .wrapper .cart-box .cart-item-head .col-2 {
  flex: 2;
}
.cart .wrapper .cart-box .cart-item-list .cart-item {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 125px;
  border-top: 1px solid #e5e5e5;
  font-size: 16px;
}
.cart .wrapper .cart-box .cart-item-list .cart-item .item-check {
  flex: 1;
}
.cart .wrapper .cart-box .cart-item-list .cart-item .item-name {
  flex: 3;
  font-size: 18px;
  color: #333;
  display: flex;
  align-items: center;
}
.cart .wrapper .cart-box .cart-item-list .cart-item .item-name img {
  width: 80px;
  height: 80px;
  vertical-align: middle;
}
.cart .wrapper .cart-box .cart-item-list .cart-item .item-name span {
  margin-left: 30px;
}
.cart .wrapper .cart-box .cart-item-list .cart-item .item-price {
  flex: 1;
  color: #333;
}
.cart .wrapper .cart-box .cart-item-list .cart-item .item-num {
  flex: 2;
}
.cart .wrapper .cart-box .cart-item-list .cart-item .item-total {
  flex: 1;
  color: #f60;
}
.cart .wrapper .cart-box .cart-item-list .cart-item .item-del {
  flex: 1;
  width: 14px;
  height: 12px;
  background: url(/imgs/icon-close.png) no-repeat 50%;
  background-size: contain;
  cursor: pointer;
}
.cart .wrapper .cart-box .cart-item-list .cart-item .item-num .num-box {
  display: inline-block;
  width: 150px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #e5e5e5;
  font-size: 14px;
}
.cart .wrapper .cart-box .cart-item-list .cart-item .item-num .num-box a,
.cart .wrapper .cart-box .cart-item-list .cart-item .item-num .num-box span {
  display: inline-block;
  width: 50px;
  color: #333;
}
</style>