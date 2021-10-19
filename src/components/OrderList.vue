<template>
  <div style="padding: 10px 0em">
    <van-list finished-text="没有更多了">
      <div class="order">
        <div class="order_details" v-for="(item,index) in orders" :key="index" >
          <div class="order_item" @click="toDetail(item)">
            <div class="flex_item1">
              <img
                width="100%"
                height="100%"
                :src="item.customer.userFace"
                alt=""
              />
            </div>
            <div class="flex_item2">
              <span class="name">{{ item.customer.username }}</span>
              <span class="status">{{ item.status }}</span>
              <p class="address">
                {{
                  item.address.province +
                  item.address.city +
                  item.address.area +
                  item.address.address
                }}
              </p>
              <div class="date_pirce">
                <div class="date">
                  {{ item.orderTime | dateFormat }}
                </div>
                <div class="pirce">¥{{ item.total }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
// 引入辅助函数
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed:{
    ...mapState("order", ["orders"]),
  },
  methods: {
    ...mapActions("order", ["findOrders"]),
    // 跳转到详情页
    toDetail(item) {
      this.$router.push({ path: "/manager/orderDetail", query: { item } });
    },
  },
  created(){
    this.findOrders();
  }
};
</script>

<style scoped>
.order {
  margin-top: 1em;
  padding: 0 2em;
}
.order .order_item {
  width: 93%;
  height: 87px;
  margin: 0 0 20px 0;
  box-shadow: 0 0 6px 0 #ccc;
  display: flex;
  padding: 1em 1em;
}
.order .order_details:last-child {
  margin-bottom: 40px;
}
.order .order_item .flex_item1 {
  width: 80px;
  height: 80px;
  background-color: #9002bf;
  border-radius: 50%;
}
.order .order_item .flex_item1 img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.order .order_item .flex_item2 {
  margin-left: 1em;
  flex: 2;
  height: 80px;
}
.order .order_item .flex_item2 .status {
  float: right;
  font-size: 11px;
  color: #f8825d;
}
.order .order_item .flex_item2 .address {
  font-size: 12px;
  margin-top: 1em;
  color: #666;
}
.date_pirce {
  margin-top: 0.5em;
  font-size: 12px;
}
.date {
  float: left;
}
.pirce {
  float: right;
  text-align: right;
}
</style>