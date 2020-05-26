<template>
  <div class="order-confirm">
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <div class="item-address">
            <h2 class="addr-title">收货地址</h2>
            <div class="addr-list clear">
              <div
                class="addr-info"
                :class="{'checked' : index == checkIndex}"
                v-for="(item, index) of list"
                :key="index"
                @click="checkIndex = index"
              >
                <h2>{{item.receiverName}}</h2>
                <div class="phone">{{item.receiverPhone}}</div>
                <div
                  class="street"
                >{{item.receiverProvince + ' ' + item.receiverCity + ' ' + item.receiverDistrict + ' ' + item.receiverAddress}}</div>
                <div class="action">
                  <a href="javascript:;" class="fl" @click="delAddress(item)">
                    <img v-lazy="'/imgs/delet.png'" alt />
                  </a>
                  <a href="javascript:;" class="fr" @click="editAddressModal(item)">
                    <img v-lazy="'/imgs/add.png'" alt />
                  </a>
                </div>
              </div>
              <div class="addr-add">
                <div class="icon-add" @click="openAddressModal"></div>
                <div>添加新地址</div>
              </div>
            </div>
          </div>
          <div class="item-good">
            <h2>商品</h2>
            <ul>
              <li v-for="(item, index) of cartList" :key="index">
                <div class="good-name">
                  <img v-lazy="item.productMainImage" alt />
                  <span>{{item.productName + ' ' + item.productSubtitle}}</span>
                </div>
                <div class="good-price">{{item.productPrice}}元 * {{item.quantity}}</div>
                <div class="good-total">{{item.productTotalPrice}}元</div>
              </li>
            </ul>
          </div>
          <div class="item-shipping">
            <h2>配送方式</h2>
            <span>包邮</span>
          </div>
          <div class="item-invoice">
            <h2>发票</h2>
            <a href="javascript:;">电子发票</a>
            <a href="javascript:;">个人</a>
          </div>
          <div class="detail">
            <div class="item">
              <span class="item-name">商品件数：</span>
              <span class="item-val">{{count}}件</span>
            </div>
            <div class="item">
              <span class="item-name">商品总价：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
            <div class="item">
              <span class="item-name">优惠活动：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item">
              <span class="item-name">运费：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item-total">
              <span class="item-name">应付总额：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
          </div>
          <div class="btn-group">
            <a href="/#cart" class="btn btn-default btn-large">返回购物车</a>
            <a href="javascript:;" class="btn btn-large" @click="orderSubmit">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <modal
      title="新增确认"
      btnType="1"
      :showModal="showEditModal"
      @cancel="showEditModal = false"
      @submit="submitAddress"
    >
      <template v-slot:body>
        <div class="edit-wrap">
          <div class="item">
            <input type="text" class="input" placeholder="姓名" v-model="checkedItem.receiverName" />
            <input type="text" class="input" placeholder="手机号" v-model="checkedItem.receiverPhone" />
          </div>
          <div class="item">
            <select name="province" v-model="checkedItem.receiverProvince">
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="河北">河北</option>
            </select>
            <select name="city" v-model="checkedItem.receiverCity">
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="河北">石家庄</option>
            </select>
            <select name="district" v-model="checkedItem.receiverDistrict">
              <option value="昌平区">昌平区</option>
              <option value="海淀区">海淀区</option>
              <option value="东城区">东城区</option>
              <option value="西城区">西城区</option>
              <option value="顺义区">顺义区</option>
              <option value="房山区">房山区</option>
            </select>
          </div>
          <div class="item">
            <textarea name="street" v-model="checkedItem.receiverAddress"></textarea>
          </div>
          <div class="item">
            <input type="text" class="input" placeholder="邮编" v-model="checkedItem.receiverZip" />
          </div>
        </div>
      </template>
    </modal>
    <modal
      title="删除确认"
      btnType="1"
      :showModal="showDelModal"
      @cancel="showDelModal = false"
      @submit="submitAddress"
    >
      <template v-slot:body>
        <p>你确认要删除此地址吗？</p>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "./../components/Modal";
import { Message } from "element-ui";
export default {
  name: "order-confirm",
  components: {
    Modal
  },
  data() {
    return {
      list: [], //收货地址列表
      cartList: [], //购物车中需要结算的商品列表
      cartTotalPrice: 0, //商品总金额
      count: 0, //商品数量
      showEditModal: false,
      showDelModal: false,
      checkIndex: 0, //当前收货地址选中的索引
      checkedItem: "", //选中的地址对象
      userAction: "" //用户行为： 0：新增， 1：编辑,2:删除
    };
  },
  mounted() {
    this.getAddressList();
    this.getCartList();
  },
  methods: {
    // 删除地址
    delAddress(item) {
      this.checkedItem = item;
      this.userAction = 2;
      this.showDelModal = true;
      this.checkIndex = this.list.length;
    },
    //地址删除、新增、编辑功能
    submitAddress() {
      let { checkedItem, userAction } = this;
      let method;
      let url;
      let params;

      if (userAction == 0) {
        method = "post";
        url = "/shippings";
      } else if (userAction == 1) {
        method = "put";
        url = `/shippings/${checkedItem.id}`;
      } else if (userAction == 2) {
        // 删除地址
        method = "delete";
        url = `/shippings/${checkedItem.id}`;
      }
      if (userAction == 0 || userAction == 1) {
        let {
          receiverName,
          receiverPhone,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip
        } = checkedItem;
        let errMsg = "";
        if (!receiverName) {
          errMsg = "收货人名称不能为空";
        } else if (!receiverPhone || !/\d{11}/.test(receiverPhone)) {
          errMsg = "请输入正确的手机号";
        } else if (!receiverProvince) {
          errMsg = "请选择省份";
        } else if (!receiverCity) {
          errMsg = "请选择城市";
        } else if (!receiverDistrict || !receiverAddress) {
          errMsg = "请输入收货地址";
        } else if (!receiverZip || !/\d{6}/.test(receiverZip)) {
          errMsg = "请输入六位邮编";
        }
        if (errMsg) {
          Message.error(errMsg);
          return;
        }
        params = {
          receiverName,
          receiverPhone,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip
        };
      }
      this.axios[method](url, params).then(res => {
        this.closeModal();
        this.getAddressList();
        Message.success("操作成功");
      });
    },
    // 清空数据
    closeModal() {
      this.checkedItem = {};
      this.userAction = 0;
      this.showDelModal = false;
      this.showEditModal = false;
    },
    editAddressModal(item) {
      this.userAction = 1;
      this.checkedItem = item;
      this.showEditModal = true;
    },
    //点击添加地址
    openAddressModal() {
      this.userAction = 0;
      this.checkedItem = {};
      this.showEditModal = true;
    },
    // 去结算
    orderSubmit() {
      let item = this.list[this.checkIndex];
      if (!item) {
        Message.warning('请选择收货地址');
        return;
      }
      this.axios.post('/orders', {
        shippingId: item.id
      }).then((res) => {
        this.$router.push({
          path: '/order/pay',
          query: {
            orderNo: res.orderNo
          }
        })
      })
    },
    //获取收货地址列表
    getAddressList() {
      this.axios.get("/shippings").then(res => {
        this.list = res.list;
      });
    },
    //获取商品列表
    getCartList() {
      this.axios.get("/carts").then(res => {
        let list = res.cartProductVoList; //获取购物车中所有商品数据
        this.cartTotalPrice = res.cartTotalPrice; //商品总金额
        this.cartList = list.filter(item => item.productSelected); //过滤购物车选中列表
        this.cartList.map(item => {
          this.count += item.quantity;
        });
      });
    }
  }
};
</script>

<style scoped>
.order-confirm .edit-wrap {
  font-size: 14px;
}
.order-confirm .edit-wrap .item {
  margin-bottom: 15px;
}
.order-confirm .edit-wrap .item .input {
  display: inline-block;
  width: 260px;
  height: 40px;
  line-height: 40px;
  padding-left: 15px;
  border: 1px solid #e5e5e5;
}
.order-confirm .edit-wrap .item textarea {
  height: 62px;
  width: 100%;
  padding: 13px 15px;
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
}
.order-confirm .edit-wrap .item select {
  height: 40px;
  line-height: 40px;
  border: 1px solid #e5e5e5;
  margin-right: 15px;
}
.order-confirm .edit-wrap .item .input + .input {
  margin-left: 14px;
}
.order-confirm .wrapper .order-box .item-good li .good-name img {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.order-confirm .wrapper .order-box .detail {
  padding: 50px 44px 33px 0;
  border-bottom: 1px solid #f5f5f5;
  text-align: right;
  font-size: 16px;
  color: #666;
}
.order-confirm .wrapper .order-box .detail .item {
  line-height: 15px;
  margin-bottom: 12px;
}
.order-confirm .wrapper .order-box .detail .item-val {
  display: inline-block;
  width: 100px;
  color: #ff6700;
}
.order-confirm .wrapper .order-box .detail .item-total .item-val {
  font-size: 28px;
}
.order-confirm .wrapper {
  background-color: #f5f5f5;
  padding-top: 30px;
  padding-bottom: 84px;
}
.order-confirm .wrapper .order-box .btn-group {
  margin-top: 37px;
  text-align: right;
}
.order-confirm .wrapper .order-box {
  background-color: #fff;
  padding-left: 40px;
  padding-bottom: 40px;
}
.btn-group .btn {
  margin-right: 20px;
}
.btn-large {
  width: 202px;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
}
.btn-default {
  background-color: #b0b0b0;
  color: #fff;
}
.order-confirm .wrapper .order-box .item-address {
  padding-top: 38px;
}
.order-confirm .wrapper .order-box .addr-title {
  font-size: 20px;
  color: #333;
  font-weight: 200;
  margin-bottom: 21px;
}
.order-confirm .wrapper .order-box .item-address .addr-list .addr-add,
.order-confirm .wrapper .order-box .item-address .addr-list .addr-info {
  box-sizing: border-box;
  float: left;
  width: 271px;
  height: 180px;
  border: 1px solid #e5e5e5;
  margin-right: 15px;
  padding: 15px 24px;
  font-size: 14px;
  color: #757575;
}
.order-confirm .wrapper .order-box .item-address .addr-list .addr-info {
  cursor: pointer;
}
.order-confirm .wrapper .order-box .item-address .addr-list .addr-info.checked {
  border: 1px solid #ff6700;
}
.order-confirm .wrapper .order-box .item-address .addr-list .addr-info h2 {
  height: 27px;
  font-size: 18px;
  font-weight: 300;
  color: #333;
  margin-bottom: 10px;
}
.order-confirm .wrapper .order-box .item-address .addr-list .addr-info .street {
  height: 50px;
}
.order-confirm .wrapper .order-box .item-address .addr-list .addr-info .action {
  height: 50px;
  line-height: 50px;
}
.order-confirm
  .wrapper
  .order-box
  .item-address
  .addr-list
  .addr-info
  .action
  .icon {
  width: 20px;
  height: 20px;
  fill: #666;
  vertical-align: middle;
}
.order-confirm .wrapper .order-box .item-address .addr-list .addr-add {
  text-align: center;
  color: #999;
  cursor: pointer;
}
.order-confirm
  .wrapper
  .order-box
  .item-address
  .addr-list
  .addr-add
  .icon-add {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: url(/imgs/icon-add.png) #e0e0e0 no-repeat 50%;
  background-size: 14px;
  margin: 0 auto;
  margin-top: 45px;
  margin-bottom: 10px;
}
.order-confirm .wrapper .order-box .item-good {
  margin-top: 34px;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 12px;
}
.order-confirm .wrapper .order-box .item-good h2 {
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 5px;
}
.order-confirm .wrapper .order-box .item-good li {
  display: flex;
  align-items: center;
  height: 40px;
  line-height: 40px;
  margin-top: 10px;
  font-size: 16px;
  color: #333;
}
.order-confirm .wrapper .order-box .item-good li .good-name {
  flex: 5;
}
.order-confirm .wrapper .order-box .item-good li .good-price {
  flex: 2;
}
.order-confirm .wrapper .order-box .item-good li .good-total {
  padding-right: 44px;
  color: #f60;
}
.order-confirm .wrapper .order-box .item-invoice,
.order-confirm .wrapper .order-box .item-shipping {
  margin-top: 31px;
  line-height: 20px;
}
.order-confirm .wrapper .order-box .item-invoice h2,
.order-confirm .wrapper .order-box .item-shipping h2 {
  display: inline-block;
  margin-right: 71px;
  font-size: 20px;
  width: 80px;
}
.order-confirm .wrapper .order-box .item-invoice a,
.order-confirm .wrapper .order-box .item-invoice span,
.order-confirm .wrapper .order-box .item-shipping a,
.order-confirm .wrapper .order-box .item-shipping span {
  font-size: 16px;
  color: #ff6700;
  margin-right: 23px;
}
</style>