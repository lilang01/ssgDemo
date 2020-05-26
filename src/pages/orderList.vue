<template>
  <div class="order-list">
    <div class="wrapper">
      <div class="container">
        <loading v-if="loading"></loading>
        <div class="order-box" v-else>
          <div class="order" v-for="(order, index) of list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{order.createTime}}
                <span>|</span>
                {{order.receiverName}}
                <span>|</span>
                订单号：{{order.orderNo}}
                <span>|</span>
                {{order.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clear">
              <div class="good-box fl">
                <div class="good-list" v-for="(item, i) of order.orderItemVoList" :key="i">
                  <div class="good-img">
                    <img v-lazy="item.productImage" />
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">{{item.totalPrice}} * {{item.quantity}}</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status == 10">
                <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;">{{order.statusDesc}}</a>
              </div>
            </div>
          </div>
        </div>
        <no-data v-if="loading == false && list.length == 0"></no-data>
        <!-- <el-pagination
          class="pagination"
          background
          layout="prev, pager, next"
          :pageSize="pageSize"
          :total="total"
          @current-change="handlePageChange"
        ></el-pagination>-->
        <!-- <div class="load-more" v-if="showNextPage">
          <el-button type="primary" :loading="loading" @click="loadMore">加载更多</el-button>
        </div>-->
        <div
          class="scroll-more"
          v-infinite-scroll="scrollMore"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="410"
        >
          <img v-show="loading" src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "./../components/Loading";
import NoData from "./../components/NoData";
import { Pagination, Button } from "element-ui";
import infiniteScroll from "vue-infinite-scroll";
export default {
  name: "order-list",
  data() {
    return {
      loading: false,
      list: [],
      pageNum: 1,
      pageSize: 8,
      total: 0,
      busy: false, //滚动加载,是否触发
      showNextPage: true
    };
  },
  directives: { infiniteScroll },
  components: {
    Loading,
    NoData,
    [Pagination.name]: Pagination,
    [Button.name]: Button
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    scrollMore() {
      this.busy = true;
      setTimeout(() => {
        this.pageNum++;
        this.getList();
      }, 500);
    },
    //专门组scroll-more使用
    getList() {
      this.loading = true;
      this.axios
        .get("/orders/", {
          params: {
            pageSize: this.pageSize,
            pageNum: this.pageNum
          }
        })
        .then(res => {
          this.list = this.list.concat(res.list);
          this.loading = false;
          if (res.hasNextPage) {
            this.busy = false;
          } else {
            this.busy = true;
          }
        });
    },
    // 加载更多按钮
    loadMore() {
      this.pageNum++;
      this.getOrderList();
    },
    //分页器分页
    handlePageChange(pageNum) {
      this.pageNum = pageNum;
      this.getOrderList();
    },
    getOrderList() {
      this.loading = true;
      this.busy = true;
      this.axios
        .get("/orders", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          this.loading = false;
          this.list = this.list.concat(res.list); //concat数据累加
          this.total = res.total;
          this.busy = false;
          this.showNextPage = res.hasNextPage;
        })
        .catch(errMsg => {
          this.loading = false;
        });
    },
    goPay(orderNo) {
      this.$router.push({
        path: "/order/pay",
        query: {
          orderNo
        }
      });
    }
  }
};
</script>
<style scoped>
.order-list
  .wrapper
  .order-box
  .order
  .order-content
  .good-box
  .good-list
  .good-img {
  width: 112px;
}
.order-list .wrapper .order-box .order .order-content .good-state a {
  color: #f60;
}
.order-list
  .wrapper
  .order-box
  .order
  .order-content
  .good-box
  .good-list
  .good-name {
  font-size: 20px;
  color: #333;
}
.order-list
  .wrapper
  .order-box
  .order
  .order-content
  .good-box
  .good-list
  .good-img
  img {
  width: 100%;
}
.order-list .wrapper {
  background-color: #f5f5f5;
  padding-top: 33px;
  padding-bottom: 110px;
}
.order-list .wrapper .order-box .order {
  border: 1px solid #d7d7d7;
  background-color: #fff;
  margin-bottom: 31px;
}
.order-list .wrapper .order-box .order .order-title {
  height: 74px;
  line-height: 74px;
  background-color: #fffaf7;
  padding: 0 43px;
  font-size: 16px;
  color: #666;
}
.order-list .wrapper .order-box .order .order-title .item-info span {
  margin: 0 9px;
}
.order-list .wrapper .order-box .order .order-title {
  height: 74px;
  line-height: 74px;
  background-color: #fffaf7;
  padding: 0 43px;
  font-size: 16px;
  color: #666;
}
.order-list .wrapper .order-box .order .order-title .money {
  font-size: 26px;
  color: #333;
}
.order-list .wrapper .order-box .order .order-content {
  padding: 0 43px;
}
.order-list .wrapper .order-box .order .order-content .good-box {
  width: 88%;
}
.order-list .wrapper .order-box .order .order-content .good-state {
  height: 145px;
  line-height: 145px;
  font-size: 20px;
  color: #f60;
}
.order-list .wrapper .order-box .order .order-content .good-box .good-list {
  display: flex;
  align-items: center;
  height: 145px;
}
</style>