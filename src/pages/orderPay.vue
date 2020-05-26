<template>
  <div class="order-pay">
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！去付款咯~</h2>
              <p>
                请在
                <span>30分</span>
                内完成支付，超时后将取消订单
              </p>
              <p>{{addressInfo}}</p>
            </div>
            <div class="order-total">
              <p>
                应付总额：
                <span>{{payment}}</span>元
              </p>
              <p>
                订单详情
                <em
                  class="icon-down"
                  :class="{'up': showDetail}"
                  @click="showDetail = !showDetail"
                ></em>
              </p>
            </div>
          </div>
          <div class="item-detail" v-show="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{orderId}}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息</div>
              <div class="detail-info">{{this.addressInfo}}</div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item, index) of orderDetail" :key="index">
                    <img v-lazy="item.productImage" />
                    {{item.productName}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下方式支付货款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali" :class="{'checked' : payType == 1}" @click="paySubmit(1)"></div>
            <div class="pay pay-wechat" :class="{'checked': payType == 2}" @click="paySubmit(2)"></div>
          </div>
        </div>
      </div>
    </div>
    <scan-pay-code v-if="showPay" @close="closePayModal" :img="payImg"></scan-pay-code>
    <modal
      title="支付确认"
      btnType="3"
      :showModal="showPayModal"
      sureText="查看订单"
      cancelText="未支付"
      @cancel="showPayModal = false"
      @submit="goOrderList"
    >
      <template v-slot:body>
        <p>你确认是否完成支付？</p>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "./../components/Modal";
import QRCode from "qrcode";
import ScanPayCode from "./../components/ScanPayCode";
export default {
  name: "order-pay",
  components: {
    Modal,
    ScanPayCode
  },
  data() {
    return {
      orderId: this.$route.query.orderNo,
      orderDetail: [],
      addressInfo: "", //收货人地址
      payType: 0, //支付方式1：支付宝，2：微信支付
      payment: 0, //订单总金额
      showPayModal: false,
      showPay: false, //是显示微信以付对话框
      showDetail: false, //显否显示订单详情
      T: "" //定时器
    };
  },
  mounted() {
    this.getOrderDetail();
  },
  methods: {
    getOrderDetail() {
      this.axios.get(`/orders/${this.orderId}`).then(res => {
        let item = res.shippingVo;
        this.addressInfo = `${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`;
        this.orderDetail = res.orderItemVoList;
        this.payment = res.payment;
      });
    },
    //关闭微信弹框
    closePayModal() {
      this.showPay = false;
      this.showPayModal = true;
      clearInterval(this.T);
    },
    paySubmit(payType) {
      this.payType = payType;
      if (payType == 1) {
        window.open(`/#/order/alipay?orderId=${this.orderId}`, "_blank");
      } else if (payType == 2) {
        this.axios
          .post("/pay", {
            orderId: this.orderId,
            orderName: "Vue高仿小米商城",
            amount: 0.01,
            payType: 2
          })
          .then(res => {
            QRCode.toDataURL(res.content).then(url => {
              this.showPay = true;
              this.payImg = url;
              this.loopOrderState();
            });
          })
          .catch(() => {
            this.$message.error("微信二维码生成失败，请稍后得试");
          });
      }
    },
    loopOrderState() {
      this.T = setInterval(() => {
        this.axios.get(`/orders/${this.orderId}`).then(res => {
          if (res.status == 20) {
            clearInterval(this.T);
            this.goOrderList();
          }
        });
      }, 1000);
    },
    goOrderList() {
      this.$router.push("/order/list");
    }
  }
};
</script>
<style scoped>
.order-pay .wrapper .order-wrap .item-detail {
  border-top: 1px solid #d7d7d7;
  padding-top: 47px;
  padding-left: 130px;
  font-size: 14px;
  margin-top: 45px;
}
.order-pay .wrapper .order-wrap .item-detail .item {
  margin-bottom: 19px;
}
.order-pay .wrapper .order-wrap .item-detail .item .detail-title {
  float: left;
  width: 100px;
}
.order-pay .wrapper .order-wrap .item-detail .item .detail-info {
  display: inline-block;
}
.order-pay .wrapper .order-wrap .item-detail .item .detail-info img {
  width: 30px;
  vertical-align: middle;
}
.order-pay .wrapper {
  background-color: #f5f5f5;
  padding-top: 30px;
  padding-bottom: 61px;
}
.order-pay .wrapper .order-wrap {
  padding: 62px 50px;
  background-color: #fff;
  font-size: 14px;
  margin-bottom: 30px;
}
.order-pay .wrapper .order-wrap .item-order {
  display: flex;
  align-items: center;
}
.order-pay .wrapper .order-wrap .item-order .icon-succ {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: url(/imgs/icon-gou.png) #80c58a no-repeat 50%;
  background-size: 60px;
  margin-right: 40px;
}
.order-pay .wrapper .order-wrap .item-order .order-info {
  margin-right: 248px;
}
.order-pay .wrapper .order-wrap .item-order .order-info h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}
.order-pay .wrapper .order-wrap .item-order .order-info p {
  color: #666;
}
.order-pay .wrapper .order-wrap .item-order .order-info p span {
  color: #ff6700;
}
.order-pay .wrapper .order-wrap .item-order .order-total > p:first-child {
  margin-bottom: 30px;
}
.order-pay .wrapper .order-wrap .item-order .order-total span {
  font-size: 28px;
  color: #ff6700;
}
.order-pay .wrapper .order-wrap .item-order .order-total .icon-down {
  display: inline-block;
  width: 14px;
  height: 10px;
  background: url(/imgs/icon-down.png) no-repeat 50%;
  background-size: contain;
  margin-left: 9px;
  transition: all 0.5s;
  cursor: pointer;
}
.order-pay .wrapper .item-pay {
  padding: 26px 50px 72px;
  background-color: #fff;
  color: #333;
}
.order-pay .wrapper .item-pay h3 {
  font-size: 20px;
  font-weight: 200;
  color: #333;
  padding-bottom: 24px;
  border-bottom: 1px solid #d7d7d7;
  margin-bottom: 26px;
}
.order-pay .wrapper .item-pay .pay-way {
  font-size: 18px;
}
.order-pay .wrapper .item-pay .pay-way .pay-ali {
  background: url(/imgs/pay/icon-ali.png) no-repeat 50%;
  background-size: 103px 38px;
  margin-top: 19px;
}
.order-pay .wrapper .item-pay .pay-way .pay:last-child {
  margin-left: 20px;
}
.order-pay .wrapper .item-pay .pay-way .pay-wechat {
  background: url(/imgs/pay/icon-wechat.png) no-repeat 50%;
  background-size: 103px 38px;
}
.order-pay .wrapper .item-pay .pay-way .pay {
  display: inline-block;
  width: 188px;
  height: 64px;
  border: 1px solid #d7d7d7;
  cursor: pointer;
}
</style>